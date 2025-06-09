import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, User, Tag, ArrowLeft, Globe } from 'lucide-react';
import Meta from './Meta';
import { SupportedLanguage } from '../types/personality';

interface BlogPostProps {
  id: string;
  onBackToBlog: () => void;
}

const blogPostContent = {
  '1': {
    title: {
      en: 'Understanding the Big Five Personality Traits',
      zh: '理解五大人格特质',
      es: 'Entendiendo los Cinco Grandes Rasgos de Personalidad',
      ja: 'ビッグファイブ性格特性を理解する'
    },
    content: {
      en: `
        <h2>Introduction to the Big Five Model</h2>
        <p>The Big Five personality traits, also known as the Five Factor Model (FFM), is the most scientifically validated framework for understanding human personality. This model identifies five core dimensions that shape our behavior, emotions, and thinking patterns.</p>
        
        <h2>The Five Dimensions</h2>
        <h3>1. Openness to Experience</h3>
        <p>This trait reflects a person's curiosity, creativity, and preference for novelty and variety. High scorers tend to be imaginative, artistic, and intellectually curious. They often enjoy abstract thinking and are willing to try new experiences.</p>
        
        <h3>2. Conscientiousness</h3>
        <p>This dimension relates to how organized, responsible, and goal-directed a person is. Those high in conscientiousness tend to be efficient, well-organized, and mindful of details. They prefer planned behavior over spontaneous actions.</p>
        
        <h3>3. Extraversion</h3>
        <p>Extraversion captures a person's tendency to seek stimulation from the outside world, particularly in social situations. Extraverts are typically outgoing, energetic, and draw energy from social interactions.</p>
        
        <h3>4. Agreeableness</h3>
        <p>This trait reflects how well people get along with others. Those high in agreeableness tend to be cooperative, compassionate, and considerate. They generally value harmony and tend to be trustworthy and helpful.</p>
        
        <h3>5. Neuroticism</h3>
        <p>Also known as emotional stability, this dimension relates to how people handle stress and emotional experiences. Lower scores indicate better emotional stability and resilience to stress.</p>
        
        <h2>Why Understanding Your Personality Matters</h2>
        <p>Understanding your personality profile can provide valuable insights into your behavior patterns, relationships, and career choices. It can help you:</p>
        <ul>
          <li>Make better career decisions aligned with your natural tendencies</li>
          <li>Improve your relationships by understanding your interaction style</li>
          <li>Develop more effective stress management strategies</li>
          <li>Set personal development goals that work with your personality</li>
        </ul>
      `,
      zh: `
        <h2>五大人格模型简介</h2>
        <p>五大人格特质，也称为五因素模型（FFM），是目前最具科学验证的人格理解框架。该模型确定了五个塑造我们行为、情感和思维模式的核心维度。</p>
        
        <h2>五个维度</h2>
        <h3>1. 开放性</h3>
        <p>这个特质反映了一个人的好奇心、创造力以及对新事物和多样性的偏好。高分者往往富有想象力、具有艺术气息和求知欲。他们经常享受抽象思维，愿意尝试新体验。</p>
        
        <h3>2. 尽责性</h3>
        <p>这个维度与一个人的组织能力、责任心和目标导向性有关。尽责性高的人往往效率高、组织良好、注重细节。他们更喜欢有计划的行为而不是自发的行动。</p>
        
        <h3>3. 外向性</h3>
        <p>外向性反映了一个人从外部世界寻求刺激的倾向，特别是在社交场合。外向者通常开朗、精力充沛，从社交互动中获得能量。</p>
        
        <h3>4. 宜人性</h3>
        <p>这个特质反映了人们与他人相处的能力。宜人性高的人往往富有合作精神、富有同情心和体贴他人。他们通常重视和谐，倾向于值得信赖和乐于助人。</p>
        
        <h3>5. 神经质</h3>
        <p>也称为情绪稳定性，这个维度与人们如何处理压力和情绪体验有关。较低的分数表明更好的情绪稳定性和抗压能力。</p>
        
        <h2>为什么了解你的性格很重要</h2>
        <p>了解你的性格特征可以为你的行为模式、人际关系和职业选择提供宝贵的见解。它可以帮助你：</p>
        <ul>
          <li>做出更符合你天性的职业决策</li>
          <li>通过了解你的互动方式改善人际关系</li>
          <li>发展更有效的压力管理策略</li>
          <li>制定与你的性格相符的个人发展目标</li>
        </ul>
      `,
      es: `
        <h2>Introducción al Modelo de los Cinco Grandes</h2>
        <p>Los Cinco Grandes rasgos de personalidad, también conocidos como el Modelo de los Cinco Factores (FFM), es el marco más científicamente validado para comprender la personalidad humana. Este modelo identifica cinco dimensiones centrales que moldean nuestro comportamiento, emociones y patrones de pensamiento.</p>
        
        <h2>Las Cinco Dimensiones</h2>
        <h3>1. Apertura a la Experiencia</h3>
        <p>Este rasgo refleja la curiosidad, creatividad y preferencia por la novedad y variedad de una persona. Las personas con puntuaciones altas tienden a ser imaginativas, artísticas e intelectualmente curiosas. A menudo disfrutan del pensamiento abstracto y están dispuestas a probar nuevas experiencias.</p>
        
        <h3>2. Responsabilidad</h3>
        <p>Esta dimensión se relaciona con qué tan organizada, responsable y orientada a objetivos es una persona. Aquellos con alta responsabilidad tienden a ser eficientes, bien organizados y atentos a los detalles. Prefieren el comportamiento planificado sobre las acciones espontáneas.</p>
        
        <h3>3. Extraversión</h3>
        <p>La extraversión captura la tendencia de una persona a buscar estimulación del mundo exterior, particularmente en situaciones sociales. Los extrovertidos son típicamente sociables, enérgicos y obtienen energía de las interacciones sociales.</p>
        
        <h3>4. Amabilidad</h3>
        <p>Este rasgo refleja qué tan bien se llevan las personas con otros. Aquellos con alta amabilidad tienden a ser cooperativos, compasivos y considerados. Generalmente valoran la armonía y tienden a ser confiables y serviciales.</p>
        
        <h3>5. Neuroticismo</h3>
        <p>También conocido como estabilidad emocional, esta dimensión se relaciona con cómo las personas manejan el estrés y las experiencias emocionales. Puntuaciones más bajas indican mejor estabilidad emocional y resiliencia al estrés.</p>
        
        <h2>Por Qué Es Importante Entender Tu Personalidad</h2>
        <p>Entender tu perfil de personalidad puede proporcionar valiosas perspectivas sobre tus patrones de comportamiento, relaciones y elecciones de carrera. Puede ayudarte a:</p>
        <ul>
          <li>Tomar mejores decisiones profesionales alineadas con tus tendencias naturales</li>
          <li>Mejorar tus relaciones entendiendo tu estilo de interacción</li>
          <li>Desarrollar estrategias más efectivas para manejar el estrés</li>
          <li>Establecer metas de desarrollo personal que funcionen con tu personalidad</li>
        </ul>
      `,
      ja: `
        <h2>ビッグファイブモデルの紹介</h2>
        <p>ビッグファイブ性格特性（五因子モデル：FFM）は、人間の性格を理解するための最も科学的に検証された枠組みです。このモデルは、私たちの行動、感情、思考パターンを形作る5つの中核的な次元を特定しています。</p>
        
        <h2>5つの次元</h2>
        <h3>1. 開放性</h3>
        <p>この特性は、好奇心、創造性、新しいことや多様性への好みを反映します。高得点者は想像力豊かで、芸術的で知的好奇心が強い傾向があります。抽象的な思考を楽しみ、新しい経験に積極的です。</p>
        
        <h3>2. 誠実性</h3>
        <p>この次元は、人がどれだけ組織的で、責任感があり、目標志向であるかに関連します。誠実性の高い人は効率的で、よく整理され、細部に注意を払う傾向があります。自発的な行動よりも計画的な行動を好みます。</p>
        
        <h3>3. 外向性</h3>
        <p>外向性は、特に社会的状況において、外部世界から刺激を求める傾向を捉えています。外向的な人は通常、社交的でエネルギッシュで、社会的な交流からエネルギーを得ます。</p>
        
        <h3>4. 協調性</h3>
        <p>この特性は、人々が他者とどれだけうまく付き合えるかを反映します。協調性の高い人は協力的で、思いやりがあり、配慮深い傾向があります。一般的に調和を重視し、信頼できて助けになる傾向があります。</p>
        
        <h3>5. 神経症的傾向</h3>
        <p>情緒的安定性としても知られ、この次元は人々がストレスと感情的な経験をどのように扱うかに関連します。低いスコアはより良い感情的安定性とストレスへの耐性を示します。</p>
        
        <h2>なぜ性格を理解することが重要なのか</h2>
        <p>性格プロファイルを理解することで、行動パターン、人間関係、キャリア選択について貴重な洞察が得られます。以下のような点で役立ちます：</p>
        <ul>
          <li>自然な傾向に合ったより良いキャリア決定を行う</li>
          <li>交流スタイルを理解することで人間関係を改善する</li>
          <li>より効果的なストレス管理戦略を開発する</li>
          <li>性格に合った個人開発目標を設定する</li>
        </ul>
      `
    },
    author: 'Dr. Sarah Chen',
    date: '2024-03-15',
    readTime: '8 min',
    tags: ['Personality', 'Psychology', 'Big Five', 'Research']
  }
};

const BlogPost: React.FC<BlogPostProps> = ({ id, onBackToBlog }) => {
  const { i18n, t } = useTranslation();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const post = blogPostContent[id as keyof typeof blogPostContent];

  if (!post) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl text-white">Post not found</h1>
        </div>
      </div>
    );
  }

  const currentTitle = post.title[i18n.language as keyof typeof post.title] || post.title.en;
  const currentContent = post.content[i18n.language as keyof typeof post.content] || post.content.en;

  // Extract first paragraph for meta description
  const description = currentContent
    .match(/<p>(.*?)<\/p>/)?.[1]
    ?.replace(/<[^>]*>/g, '')
    ?.slice(0, 160) || '';

  const languages = [
    { code: 'en' as SupportedLanguage, name: 'English', flag: '🇺🇸' },
    { code: 'zh' as SupportedLanguage, name: '中文', flag: '🇨🇳' }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];
  
  const handleLanguageChange = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
    setShowLanguageMenu(false);
  };

  return (
    <>
      <Meta
        title={`${currentTitle} | PersonaLens Blog`}
        description={description}
        keywords={[...post.tags, 'personality', 'psychology', 'personal development']}
        type="article"
        image={`/blog/${id}-og.jpg`}
      />
      
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBackToBlog}
              className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>{t('common.backToBlog')}</span>
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
              >
                <Globe className="h-5 w-5" />
                <span>{currentLang.flag}</span>
              </button>
              
              {showLanguageMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowLanguageMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white/10 backdrop-blur-lg shadow-lg z-50">
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-white/10 transition-colors duration-200 ${
                          lang.code === i18n.language ? 'text-white' : 'text-gray-300'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <article className="prose prose-invert prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-white mb-6">
              {currentTitle}
            </h1>

            <div className="flex items-center space-x-6 text-gray-400 mb-8">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white/10 text-white px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div
              className="text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: currentContent
              }}
            />
          </article>
        </div>
      </div>
    </>
  );
};

export default BlogPost; 