import { Answer, PersonalityScore, PersonalityResult, PersonalityDimension, Question, SupportedLanguage } from '../types/personality';
import { questions, freeQuestions } from '../data/questions';
import i18n, { getCurrentLanguage } from '../i18n';

// Helper function to extract language-specific content
function extractLanguageContent<T>(content: T | { [key in SupportedLanguage]: T }, language: SupportedLanguage = 'en'): T {
  if (typeof content === 'object' && content !== null && language in (content as object)) {
    return (content as { [key in SupportedLanguage]: T })[language];
  }
  return content as T;
}

// Helper function to get the category from a question
function getQuestionCategory(question: Question): PersonalityDimension {
  if (question.category) {
    return question.category as PersonalityDimension;
  }
  // Fallback to factor if category is not available
  return question.factor as PersonalityDimension;
}

// 获取本地化文本
function getLocalizedText(key: string, defaultText: string): string {
  return i18n.t(key, defaultText);
}

export const calculateResults = (answers: Answer[], testType: 'free' | 'premium' = 'premium'): PersonalityResult => {
  const currentQuestions = testType === 'free' ? freeQuestions : questions;
  
  const scores: PersonalityScore = {
    extraversion: 0,
    agreeableness: 0,
    conscientiousness: 0,
    neuroticism: 0,
    openness: 0,
    resilience: 0,
    creativity: 0,
    ambition: 0,
    empathy: 0,
    risk_tolerance: 0
  };

  // Calculate raw scores for each dimension
  const dimensionCounts: Record<PersonalityDimension, number> = {
    extraversion: 0,
    agreeableness: 0,
    conscientiousness: 0,
    neuroticism: 0,
    openness: 0,
    resilience: 0,
    creativity: 0,
    ambition: 0,
    empathy: 0,
    risk_tolerance: 0
  };

  answers.forEach(answer => {
    const question = currentQuestions.find(q => q.id === answer.questionId);
    if (!question) return;

    let adjustedValue = answer.value;
    
    // Reverse scoring for reversed questions
    if (question.reverse) {
      adjustedValue = 8 - answer.value; // Convert 1-7 scale to 7-1
    } else if (question.direction === -1) {
      // Legacy support for questions using direction instead of reverse
      adjustedValue = 8 - answer.value;
    }

    const category = getQuestionCategory(question);
    scores[category] += adjustedValue;
    dimensionCounts[category]++;
  });

  // Convert to percentages (0-100)
  Object.keys(scores).forEach(dimension => {
    const dim = dimension as PersonalityDimension;
    if (dimensionCounts[dim] > 0) {
      const average = scores[dim] / dimensionCounts[dim];
      scores[dim] = Math.round(((average - 1) / 6) * 100); // Convert 1-7 scale to 0-100
    } else {
      // Default to 50% if no questions were answered for this dimension
      scores[dim] = 50;
    }
  });

  // Create timestamp
  const timestamp = new Date().toISOString();
  
  // For premium test, calculate additional derived traits
  const derivedTraits: Pick<PersonalityResult, 'resilience' | 'creativity' | 'ambition' | 'empathy' | 'risk_tolerance'> = {};
  
  if (testType === 'premium') {
    // 恢复力 = (情绪稳定性 * 0.6) + (尽责性 * 0.4)
    derivedTraits.resilience = Math.round((scores.neuroticism * 0.6) + (scores.conscientiousness * 0.4));
    
    // 创造力 = (开放性 * 0.7) + (外向性 * 0.3)
    derivedTraits.creativity = Math.round((scores.openness * 0.7) + (scores.extraversion * 0.3));
    
    // 野心 = (尽责性 * 0.5) + (外向性 * 0.3) + (开放性 * 0.2)
    derivedTraits.ambition = Math.round((scores.conscientiousness * 0.5) + (scores.extraversion * 0.3) + (scores.openness * 0.2));
    
    // 同理心 = (宜人性 * 0.7) + (开放性 * 0.3)
    derivedTraits.empathy = Math.round((scores.agreeableness * 0.7) + (scores.openness * 0.3));
    
    // 风险承受力 = (开放性 * 0.4) + (外向性 * 0.3) + (情绪稳定性 * 0.3)
    derivedTraits.risk_tolerance = Math.round((scores.openness * 0.4) + (scores.extraversion * 0.3) + (scores.neuroticism * 0.3));
    
    // 确保所有派生特质都有有效值（如果计算结果为NaN，则使用默认值50）
    if (isNaN(derivedTraits.resilience)) derivedTraits.resilience = 50;
    if (isNaN(derivedTraits.creativity)) derivedTraits.creativity = 50;
    if (isNaN(derivedTraits.ambition)) derivedTraits.ambition = 50;
    if (isNaN(derivedTraits.empathy)) derivedTraits.empathy = 50;
    if (isNaN(derivedTraits.risk_tolerance)) derivedTraits.risk_tolerance = 50;
  }
  
  // Determine personality type and get descriptions if premium
  let primaryType = undefined;
  let description = undefined;
  let strengths = undefined;
  let growthAreas = undefined;
  let careerSuggestions = undefined;
  
  if (Object.values(scores).some(score => !isNaN(score))) {
    primaryType = determinePrimaryType(scores);
    description = getTypeDescription(scores, primaryType, testType);
    strengths = getStrengths(scores, testType);
    
    if (testType === 'premium') {
      growthAreas = getGrowthAreas(scores, testType);
      careerSuggestions = getCareerSuggestions(scores, testType);
    }
  }

  // Return the results
  return {
    openness: scores.openness,
    conscientiousness: scores.conscientiousness,
    extraversion: scores.extraversion,
    agreeableness: scores.agreeableness,
    neuroticism: scores.neuroticism,
    ...derivedTraits,
    scores: scores,
    timestamp: timestamp,
    primaryType,
    description,
    strengths,
    growthAreas,
    careerSuggestions
  };
};

const determinePrimaryType = (scores: PersonalityScore): string => {
  const highScores = Object.entries(scores)
    .filter(([_, score]) => score >= 70)
    .sort(([, a], [, b]) => b - a);

  if (highScores.length === 0) {
    return "The Balanced Individual";
  }

  const [topDimension] = highScores[0];

  const typeMap: Record<string, string> = {
    extraversion: "The Social Energizer",
    agreeableness: "The Compassionate Helper", 
    conscientiousness: "The Organized Achiever",
    neuroticism: "The Emotionally Resilient",
    openness: "The Creative Explorer"
  };

  // Handle inverted neuroticism (high score = low neuroticism = high emotional stability)
  if (topDimension === 'neuroticism') {
    return "The Emotionally Resilient";
  }

  return typeMap[topDimension] || "The Unique Individual";
};

const getTypeDescription = (scores: PersonalityScore, primaryType: string, testType: 'free' | 'premium'): string => {
  // 根据当前语言和类型获取描述
  const i18nKey = `results.personalityTypes.${primaryType}`;
  const localizedType = getLocalizedText(i18nKey, primaryType);
  
  // 获取描述的i18n键
  const descriptionKey = `results.descriptions.${testType === 'premium' ? 'premium' : 'free'}.${primaryType}`;
  
  // 获取本地化的描述
  const localizedDescription = getLocalizedText(descriptionKey, "");
  
  // 如果有本地化描述，返回它
  if (localizedDescription) {
    return localizedDescription;
  }

  // 回退到默认英文描述
  const descriptions: Record<string, string> = {
    "The Social Energizer": testType === 'premium' 
      ? "You thrive in social situations and draw energy from interacting with others. You're naturally outgoing, confident in groups, and enjoy being at the center of social activities. Your enthusiasm and social skills make you a natural leader and connector of people."
      : "You're naturally outgoing and enjoy social interactions. You tend to be energetic in group settings and comfortable meeting new people.",
    
    "The Compassionate Helper": testType === 'premium'
      ? "You have a deep concern for others' well-being and naturally prioritize harmony in relationships. You're trustworthy, cooperative, and quick to help those in need. Your empathy and understanding make you an excellent friend, partner, and team member."
      : "You show genuine care for others and value cooperation. You tend to be trusting and helpful in your relationships.",
    
    "The Organized Achiever": testType === 'premium'
      ? "You approach life with discipline, organization, and a strong work ethic. You set high standards for yourself and consistently work toward your goals. Your reliability and attention to detail make you highly valued in both personal and professional settings."
      : "You're naturally organized and goal-oriented. You tend to be reliable and pay attention to details in your work.",
    
    "The Emotionally Resilient": testType === 'premium'
      ? "You maintain emotional stability even under pressure and bounce back quickly from challenges. Your calm demeanor and positive outlook help you navigate stress effectively and support others during difficult times."
      : "You tend to stay calm under pressure and handle stress well. You generally maintain a positive outlook.",
    
    "The Creative Explorer": testType === 'premium'
      ? "You have a natural curiosity about the world and enjoy exploring new ideas, experiences, and creative pursuits. Your open-mindedness and imagination drive you to seek out novelty and appreciate beauty in various forms."
      : "You're naturally curious and enjoy new experiences. You tend to be creative and open to different ideas.",
    
    "The Balanced Individual": testType === 'premium'
      ? "You demonstrate a well-rounded personality with balanced traits across different dimensions. This gives you flexibility to adapt to various situations and connect with people from different backgrounds and perspectives."
      : "You show a balanced personality across different traits, giving you flexibility in various situations."
  };

  return descriptions[primaryType] || (testType === 'premium' 
    ? "You have a unique combination of personality traits that make you adaptable and interesting. Your balanced approach to life allows you to succeed in various situations and connect with diverse groups of people."
    : "You have a unique personality combination that makes you adaptable in different situations.");
};

const getStrengths = (scores: PersonalityScore, testType: 'free' | 'premium'): string[] => {
  const strengths: string[] = [];

  // 实时获取当前语言
  const isChineseLanguage = getCurrentLanguage() === 'zh';
  
  // 简化多语言处理，只支持中文和英文两种语言
  const strengthTexts = {
    extraversion: {
      base: isChineseLanguage ? "自然的领导能力和社交自信" : "Natural leadership abilities and social confidence",
      premium1: isChineseLanguage ? "出色的沟通和社交能力" : "Excellent communication and networking skills",
      premium2: isChineseLanguage ? "激励和调动他人积极性的能力" : "Ability to energize and motivate others"
    },
    agreeableness: {
      base: isChineseLanguage ? "强烈的共情能力和建立信任的能力" : "Strong empathy and ability to build trust",
      premium1: isChineseLanguage ? "有效的冲突解决和团队合作" : "Effective conflict resolution and teamwork",
      premium2: isChineseLanguage ? "乐于帮助和支持他人的自然倾向" : "Natural inclination to help and support others"
    },
    conscientiousness: {
      base: isChineseLanguage ? "出色的组织和时间管理能力" : "Exceptional organization and time management",
      premium1: isChineseLanguage ? "高度可靠性和对细节的关注" : "High reliability and attention to detail",
      premium2: isChineseLanguage ? "强大的目标设定和实现能力" : "Strong goal-setting and achievement abilities"
    },
    neuroticism: {
      base: isChineseLanguage ? "情绪韧性和压力管理能力" : "Emotional resilience and stress management",
      premium1: isChineseLanguage ? "在压力下保持冷静的能力" : "Ability to stay calm under pressure",
      premium2: isChineseLanguage ? "积极的态度和乐观精神" : "Positive outlook and optimism"
    },
    openness: {
      base: isChineseLanguage ? "创造性思维和创新能力" : "Creative thinking and innovation",
      premium1: isChineseLanguage ? "适应变化和新体验的能力" : "Adaptability to change and new experiences",
      premium2: isChineseLanguage ? "求知欲和学习敏捷性" : "Intellectual curiosity and learning agility"
    },
    balanced: {
      base: isChineseLanguage ? "对生活情境的平衡视角" : "Balanced perspective on life situations",
      premium1: isChineseLanguage ? "看到问题多个方面的能力" : "Ability to see multiple sides of issues",
      premium2: isChineseLanguage ? "在不同环境中的灵活性" : "Flexibility in different environments"
    }
  };

  if (scores.extraversion >= 60) {
    strengths.push(strengthTexts.extraversion.base);
    if (testType === 'premium') {
      strengths.push(strengthTexts.extraversion.premium1);
      strengths.push(strengthTexts.extraversion.premium2);
    }
  }

  if (scores.agreeableness >= 60) {
    strengths.push(strengthTexts.agreeableness.base);
    if (testType === 'premium') {
      strengths.push(strengthTexts.agreeableness.premium1);
      strengths.push(strengthTexts.agreeableness.premium2);
    }
  }

  if (scores.conscientiousness >= 60) {
    strengths.push(strengthTexts.conscientiousness.base);
    if (testType === 'premium') {
      strengths.push(strengthTexts.conscientiousness.premium1);
      strengths.push(strengthTexts.conscientiousness.premium2);
    }
  }

  if (scores.neuroticism <= 40) { // Low neuroticism = high emotional stability
    strengths.push(strengthTexts.neuroticism.base);
    if (testType === 'premium') {
      strengths.push(strengthTexts.neuroticism.premium1);
      strengths.push(strengthTexts.neuroticism.premium2);
    }
  }

  if (scores.openness >= 60) {
    strengths.push(strengthTexts.openness.base);
    if (testType === 'premium') {
      strengths.push(strengthTexts.openness.premium1);
      strengths.push(strengthTexts.openness.premium2);
    }
  }

  // Ensure at least some strengths are included
  if (strengths.length === 0) {
    strengths.push(strengthTexts.balanced.base);
    if (testType === 'premium') {
      strengths.push(strengthTexts.balanced.premium1);
      strengths.push(strengthTexts.balanced.premium2);
    }
  }

  return strengths;
};

const getGrowthAreas = (scores: PersonalityScore, testType: 'free' | 'premium'): string[] => {
  if (testType === 'free') {
    return [getCurrentLanguage() === 'zh' ? 
      "高级版提供详细的成长建议" : 
      "Detailed growth recommendations available in premium version"];
  }

  const growthAreas: string[] = [];
  
  // 实时获取当前语言
  const isChineseLanguage = getCurrentLanguage() === 'zh';
  
  const growthTexts = {
    extraversion: {
      area1: isChineseLanguage ? "在社交场合和公共演讲中培养自在感" : "Developing comfort in social situations and public speaking",
      area2: isChineseLanguage ? "在团队领导角色中建立信心" : "Building confidence in group leadership roles"
    },
    agreeableness: {
      area1: isChineseLanguage ? "建立更强的协作关系" : "Building stronger collaborative relationships",
      area2: isChineseLanguage ? "培养同理心和理解他人观点的能力" : "Developing empathy and understanding of others' perspectives"
    },
    conscientiousness: {
      area1: isChineseLanguage ? "提高组织能力和履行承诺的能力" : "Improving organization and follow-through on commitments",
      area2: isChineseLanguage ? "培养更好的时间管理和规划技能" : "Developing better time management and planning skills"
    },
    neuroticism: {
      area1: isChineseLanguage ? "发展压力管理和情绪调节技巧" : "Developing stress management and emotional regulation techniques",
      area2: isChineseLanguage ? "建立恢复力和应对策略" : "Building resilience and coping strategies"
    },
    openness: {
      area1: isChineseLanguage ? "拥抱新体验和创造性思维" : "Embracing new experiences and creative thinking",
      area2: isChineseLanguage ? "培养求知欲和学习心态" : "Developing intellectual curiosity and learning mindset"
    },
    balanced: {
      area1: isChineseLanguage ? "继续发展自我意识" : "Continuing to develop self-awareness",
      area2: isChineseLanguage ? "探索舒适区外的新技能" : "Exploring new skills outside your comfort zone"
    }
  };

  if (scores.extraversion <= 40) {
    growthAreas.push(growthTexts.extraversion.area1);
    growthAreas.push(growthTexts.extraversion.area2);
  }

  if (scores.agreeableness <= 40) {
    growthAreas.push(growthTexts.agreeableness.area1);
    growthAreas.push(growthTexts.agreeableness.area2);
  }

  if (scores.conscientiousness <= 40) {
    growthAreas.push(growthTexts.conscientiousness.area1);
    growthAreas.push(growthTexts.conscientiousness.area2);
  }

  if (scores.neuroticism >= 60) { // High neuroticism = low emotional stability
    growthAreas.push(growthTexts.neuroticism.area1);
    growthAreas.push(growthTexts.neuroticism.area2);
  }

  if (scores.openness <= 40) {
    growthAreas.push(growthTexts.openness.area1);
    growthAreas.push(growthTexts.openness.area2);
  }

  // Ensure at least some growth areas are included
  if (growthAreas.length === 0) {
    growthAreas.push(growthTexts.balanced.area1);
    growthAreas.push(growthTexts.balanced.area2);
  }

  return growthAreas;
};

const getCareerSuggestions = (scores: PersonalityScore, testType: 'free' | 'premium'): string[] => {
  const suggestions: string[] = [];

  // 实时获取当前语言
  const isChineseLanguage = getCurrentLanguage() === 'zh';
  
  // 职业建议映射表
  const careerMap = {
    "Sales & Marketing": "销售与市场营销",
    "Public Relations": "公共关系",
    "Event Management": "活动管理",
    "Teaching": "教育",
    "Consulting": "咨询",
    "Leadership Roles": "领导岗位",
    "Counseling & Therapy": "咨询与治疗",
    "Social Work": "社会工作",
    "Human Resources": "人力资源",
    "Healthcare": "医疗保健",
    "Non-profit Work": "非营利工作",
    "Customer Service": "客户服务",
    "Project Management": "项目管理",
    "Accounting & Finance": "会计与金融",
    "Quality Assurance": "质量保证",
    "Operations": "运营",
    "Administration": "行政",
    "Research": "研究",
    "Emergency Services": "紧急服务",
    "Crisis Management": "危机管理",
    "High-Pressure Environments": "高压环境工作",
    "Decision-Making Roles": "决策岗位",
    "Creative Arts": "创意艺术",
    "Research & Development": "研发",
    "Innovation Consulting": "创新咨询",
    "Design": "设计",
    "Writing": "写作",
    "Technology": "技术",
    "Business": "商业",
    "Education": "教育",
    "Communications": "通信",
    "Strategy": "战略"
  };

  // 根据维度分数添加职业建议
  if (scores.extraversion >= 60) {
    const careers = isChineseLanguage ? 
      ["销售与市场营销", "公共关系", "活动管理"] : 
      ["Sales & Marketing", "Public Relations", "Event Management"];
    
    suggestions.push(...careers);
    
    if (testType === 'premium') {
      const premiumCareers = isChineseLanguage ? 
        ["教育", "咨询", "领导岗位"] : 
        ["Teaching", "Consulting", "Leadership Roles"];
      
      suggestions.push(...premiumCareers);
    }
  }

  if (scores.agreeableness >= 60) {
    const careers = isChineseLanguage ? 
      ["咨询与治疗", "社会工作", "人力资源"] : 
      ["Counseling & Therapy", "Social Work", "Human Resources"];
    
    suggestions.push(...careers);
    
    if (testType === 'premium') {
      const premiumCareers = isChineseLanguage ? 
        ["医疗保健", "非营利工作", "客户服务"] : 
        ["Healthcare", "Non-profit Work", "Customer Service"];
      
      suggestions.push(...premiumCareers);
    }
  }

  if (scores.conscientiousness >= 60) {
    const careers = isChineseLanguage ? 
      ["项目管理", "会计与金融", "质量保证"] : 
      ["Project Management", "Accounting & Finance", "Quality Assurance"];
    
    suggestions.push(...careers);
    
    if (testType === 'premium') {
      const premiumCareers = isChineseLanguage ? 
        ["运营", "行政", "研究"] : 
        ["Operations", "Administration", "Research"];
      
      suggestions.push(...premiumCareers);
    }
  }

  if (scores.neuroticism <= 40) {
    const careers = isChineseLanguage ? 
      ["紧急服务", "危机管理", "领导岗位"] : 
      ["Emergency Services", "Crisis Management", "Leadership Roles"];
    
    suggestions.push(...careers);
    
    if (testType === 'premium') {
      const premiumCareers = isChineseLanguage ? 
        ["高压环境工作", "决策岗位"] : 
        ["High-Pressure Environments", "Decision-Making Roles"];
      
      suggestions.push(...premiumCareers);
    }
  }

  if (scores.openness >= 60) {
    const careers = isChineseLanguage ? 
      ["创意艺术", "研发", "创新咨询"] : 
      ["Creative Arts", "Research & Development", "Innovation Consulting"];
    
    suggestions.push(...careers);
    
    if (testType === 'premium') {
      const premiumCareers = isChineseLanguage ? 
        ["设计", "写作", "技术"] : 
        ["Design", "Writing", "Technology"];
      
      suggestions.push(...premiumCareers);
    }
  }

  // Remove duplicates and ensure variety
  const uniqueSuggestions = [...new Set(suggestions)];
  
  // Add some general suggestions if needed
  if (uniqueSuggestions.length < (testType === 'premium' ? 6 : 3)) {
    const generalSuggestions = isChineseLanguage ? 
      ["商业", "教育", "技术", "通信", "战略"] : 
      ["Business", "Education", "Technology", "Communications", "Strategy"];
    
    generalSuggestions.forEach(suggestion => {
      if (!uniqueSuggestions.includes(suggestion) && uniqueSuggestions.length < (testType === 'premium' ? 9 : 6)) {
        uniqueSuggestions.push(suggestion);
      }
    });
  }

  return uniqueSuggestions.slice(0, testType === 'premium' ? 9 : 6);
};