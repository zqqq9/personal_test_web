import { Question, SupportedLanguage } from '../types/personality';

// Helper function to extract language-specific content
function extractLanguageContent<T>(content: T | { [key in SupportedLanguage]: T }, language: SupportedLanguage = 'en'): T {
  if (typeof content === 'object' && content !== null && language in (content as object)) {
    return (content as { [key in SupportedLanguage]: T })[language];
  }
  return content as T;
}

// 基本测试问题 - 10个问题
export const basicQuestions: Question[] = [
  // Openness (开放性) 问题
  {
    id: 'q1',
    text: {
      en: 'I enjoy trying new experiences and activities.',
      zh: '我喜欢尝试新的体验和活动。',
      es: 'Disfruto probando nuevas experiencias y actividades.',
      ja: '新しい経験や活動を試すのが好きです。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'openness',
    direction: 1,
    category: 'openness'
  },
  {
    id: 'q2',
    text: {
      en: 'I prefer to stick to a routine rather than be spontaneous.',
      zh: '我更喜欢遵循常规而不是即兴发挥。',
      es: 'Prefiero seguir una rutina en lugar de ser espontáneo.',
      ja: '自発的であるよりも日課に従うことを好みます。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'openness',
    direction: -1
  },
  
  // Conscientiousness (尽责性) 问题
  {
    id: 'q3',
    text: {
      en: 'I keep my belongings neat and organized.',
      zh: '我保持我的物品整洁有序。',
      es: 'Mantengo mis pertenencias limpias y organizadas.',
      ja: '私の持ち物は整頓され、整理されています。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'conscientiousness',
    direction: 1
  },
  {
    id: 'q4',
    text: {
      en: 'I often leave tasks unfinished.',
      zh: '我经常留下未完成的任务。',
      es: 'A menudo dejo tareas sin terminar.',
      ja: '私はよくタスクを未完成のままにします。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'conscientiousness',
    direction: -1
  },
  
  // Extraversion (外向性) 问题
  {
    id: 'q5',
    text: {
      en: 'I enjoy being the center of attention.',
      zh: '我喜欢成为关注的焦点。',
      es: 'Disfruto siendo el centro de atención.',
      ja: '注目の的になるのが好きです。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'extraversion',
    direction: 1
  },
  {
    id: 'q6',
    text: {
      en: 'I prefer spending time alone rather than in large groups.',
      zh: '我更喜欢独处而不是在大群体中。',
      es: 'Prefiero pasar tiempo solo en lugar de en grupos grandes.',
      ja: '大勢のグループよりも一人で過ごすことを好みます。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'extraversion',
    direction: -1
  },
  
  // Agreeableness (宜人性) 问题
  {
    id: 'q7',
    text: {
      en: 'I put others\' needs before my own.',
      zh: '我把他人的需求放在自己的前面。',
      es: 'Pongo las necesidades de los demás antes que las mías.',
      ja: '自分のニーズよりも他人のニーズを優先します。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'agreeableness',
    direction: 1
  },
  {
    id: 'q8',
    text: {
      en: 'I can be argumentative or confrontational when disagreeing with others.',
      zh: '当与他人意见不合时，我可能会争论或对抗。',
      es: 'Puedo ser argumentativo o confrontativo cuando estoy en desacuerdo con otros.',
      ja: '他人と意見が合わないとき、議論的または対立的になることがあります。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'agreeableness',
    direction: -1
  },
  
  // Neuroticism (情绪稳定性) 问题
  {
    id: 'q9',
    text: {
      en: 'I remain calm under pressure.',
      zh: '在压力下我保持冷静。',
      es: 'Me mantengo tranquilo bajo presión.',
      ja: '私はプレッシャーの下でも冷静を保ちます。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'neuroticism',
    direction: -1
  },
  {
    id: 'q10',
    text: {
      en: 'I often worry about things that might go wrong.',
      zh: '我经常担心可能出错的事情。',
      es: 'A menudo me preocupo por las cosas que podrían salir mal.',
      ja: '私はよく物事がうまくいかないことを心配します。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'neuroticism',
    direction: 1
  }
];

// Export free test questions (same as basic questions but with full multilingual support)
export const freeQuestions = basicQuestions;

// 高级测试问题 - 50个问题 (包括基本10个问题)
export const questions = [
  // 包含基本测试的全部10个问题
  ...basicQuestions,
  
  // Openness (开放性) 额外问题
  {
    id: 'p1',
    text: {
      en: 'I am fascinated by art, music, or literature.',
      zh: '我对艺术、音乐或文学着迷。',
      es: 'Me fascina el arte, la música o la literatura.',
      ja: '芸術、音楽、文学に魅了されています。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'openness',
    direction: 1
  },
  {
    id: 'p2',
    text: {
      en: 'I enjoy philosophical discussions and abstract ideas.',
      zh: '我喜欢哲学讨论和抽象想法。',
      es: 'Disfruto de discusiones filosóficas e ideas abstractas.',
      ja: '哲学的な議論や抽象的なアイデアを楽しみます。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'openness',
    direction: 1
  },
  {
    id: 'p3',
    text: {
      en: 'I tend to avoid complex or intellectually challenging activities.',
      zh: '我倾向于避免复杂或智力挑战的活动。',
      es: 'Tiendo a evitar actividades complejas o intelectualmente desafiantes.',
      ja: '複雑または知的に挑戦的な活動を避ける傾向があります。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'openness',
    direction: -1
  },
  {
    id: 'p4',
    text: {
      en: 'I prefer familiarity and tradition over novelty and change.',
      zh: '相比新奇和变化，我更喜欢熟悉和传统。',
      es: 'Prefiero la familiaridad y la tradición sobre la novedad y el cambio.',
      ja: '新規性や変化よりも、馴染みのあるものや伝統を好みます。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'openness',
    direction: -1
  },
  
  // Conscientiousness (尽责性) 额外问题
  {
    id: 'p5',
    text: {
      en: 'I set high standards for myself and work hard to achieve them.',
      zh: '我为自己设定高标准，并努力实现它们。',
      es: 'Me fijo estándares altos y trabajo duro para alcanzarlos.',
      ja: '自分に高い基準を設定し、それを達成するために懸命に働きます。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'conscientiousness',
    direction: 1
  },
  {
    id: 'p6',
    text: {
      en: 'I make detailed plans for complex tasks and follow them carefully.',
      zh: '我为复杂任务制定详细计划，并认真执行。',
      es: 'Hago planes detallados para tareas complejas y los sigo cuidadosamente.',
      ja: '複雑なタスクには詳細な計画を立て、それを慎重に実行します。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'conscientiousness',
    direction: 1
  },
  {
    id: 'p7',
    text: {
      en: 'I tend to procrastinate on important tasks until the last minute.',
      zh: '我倾向于拖延重要任务直到最后一刻。',
      es: 'Tiendo a postergar las tareas importantes hasta el último minuto.',
      ja: '重要なタスクを最後の瞬間まで先延ばしにする傾向があります。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'conscientiousness',
    direction: -1
  },
  {
    id: 'p8',
    text: {
      en: 'My living and working spaces are usually disorganized.',
      zh: '我的生活和工作空间通常很混乱。',
      es: 'Mis espacios de vida y trabajo suelen estar desorganizados.',
      ja: '私の生活空間と作業空間は通常整理されていません。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'conscientiousness',
    direction: -1
  },
  
  // Extraversion (外向性) 额外问题
  {
    id: 'p9',
    text: {
      en: 'I find it easy to make new friends in social situations.',
      zh: '在社交场合，我觉得交新朋友很容易。',
      es: 'Me resulta fácil hacer nuevos amigos en situaciones sociales.',
      ja: '社交の場で新しい友達を作ることが簡単だと感じます。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'extraversion',
    direction: 1
  },
  {
    id: 'p10',
    text: {
      en: 'I prefer to lead rather than follow in group activities.',
      zh: '在群体活动中，我更喜欢领导而非跟随。',
      es: 'Prefiero liderar en lugar de seguir en actividades grupales.',
      ja: 'グループ活動では、従うよりもリードすることを好みます。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'extraversion',
    direction: 1
  },
  {
    id: 'p11',
    text: {
      en: 'I find it draining to engage in long periods of social interaction.',
      zh: '长时间的社交互动让我感到精力耗尽。',
      es: 'Me resulta agotador participar en largos períodos de interacción social.',
      ja: '長時間の社会的交流に従事することは疲れると感じます。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'extraversion',
    direction: -1
  },
  {
    id: 'p12',
    text: {
      en: 'I prefer quiet, solitary activities over noisy, social ones.',
      zh: '相比嘈杂的社交活动，我更喜欢安静的独处活动。',
      es: 'Prefiero actividades tranquilas y solitarias en lugar de ruidosas y sociales.',
      ja: '騒がしい社交的な活動よりも、静かで孤独な活動を好みます。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'extraversion',
    direction: -1
  },
  
  // Agreeableness (宜人性) 额外问题
  {
    id: 'p13',
    text: {
      en: 'I go out of my way to help others, even when inconvenient.',
      zh: '即使不方便，我也会尽力帮助他人。',
      es: 'Me esfuerzo por ayudar a otros, incluso cuando es inconveniente.',
      ja: '不便であっても、他人を助けるために努力します。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'agreeableness',
    direction: 1
  },
  {
    id: 'p14',
    text: {
      en: 'I try to see things from others\' perspectives before forming opinions.',
      zh: '在形成意见前，我尝试从他人的角度看问题。',
      es: 'Trato de ver las cosas desde la perspectiva de los demás antes de formar opiniones.',
      ja: '意見を形成する前に、他人の視点から物事を見るようにしています。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'agreeableness',
    direction: 1
  },
  {
    id: 'p15',
    text: {
      en: 'I tend to be critical of others\' weaknesses or mistakes.',
      zh: '我倾向于批评他人的弱点或错误。',
      es: 'Tiendo a ser crítico con las debilidades o errores de los demás.',
      ja: '他人の弱点やミスを批判する傾向があります。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'agreeableness',
    direction: -1
  },
  {
    id: 'p16',
    text: {
      en: 'In negotiations or conflicts, I focus more on winning than finding compromise.',
      zh: '在谈判或冲突中，我更关注获胜而非寻找妥协。',
      es: 'En negociaciones o conflictos, me centro más en ganar que en encontrar compromisos.',
      ja: '交渉や対立において、妥協策を見つけるよりも勝つことに重点を置いています。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'agreeableness',
    direction: -1
  },
  
  // Neuroticism (情绪稳定性) 额外问题
  {
    id: 'p17',
    text: {
      en: 'I recover quickly from setbacks and disappointments.',
      zh: '我能从挫折和失望中快速恢复。',
      es: 'Me recupero rápidamente de contratiempos y desilusiones.',
      ja: '挫折や失望から素早く回復します。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'neuroticism',
    direction: -1
  },
  {
    id: 'p18',
    text: {
      en: 'I rarely feel overwhelmed by negative emotions.',
      zh: '我很少被负面情绪压倒。',
      es: 'Raramente me siento abrumado por emociones negativas.',
      ja: 'めったに否定的な感情に圧倒されることはありません。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'neuroticism',
    direction: -1
  },
  {
    id: 'p19',
    text: {
      en: 'I tend to overthink decisions and regret choices I\'ve made.',
      zh: '我倾向于过度思考决定，并后悔已做出的选择。',
      es: 'Tiendo a pensar demasiado en las decisiones y lamentar las elecciones que he hecho.',
      ja: '決断を考えすぎて、自分がした選択を後悔する傾向があります。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'neuroticism',
    direction: 1
  },
  {
    id: 'p20',
    text: {
      en: 'I often feel anxious in unfamiliar social situations.',
      zh: '在不熟悉的社交场合，我经常感到焦虑。',
      es: 'A menudo me siento ansioso en situaciones sociales desconocidas.',
      ja: '見慣れない社交状況ではよく不安を感じます。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'neuroticism',
    direction: 1
  },
  
  // 额外的性格特质
  // Resilience (恢复力)
  {
    id: 'p21',
    text: {
      en: 'I can adapt well to unexpected changes in my life.',
      zh: '我能很好地适应生活中的意外变化。',
      es: 'Puedo adaptarme bien a cambios inesperados en mi vida.',
      ja: '人生における予期せぬ変化にうまく適応できます。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'resilience',
    direction: 1
  },
  {
    id: 'p22',
    text: {
      en: 'When faced with a problem, I quickly look for solutions rather than complaining.',
      zh: '面对问题时，我会迅速寻找解决方案而不是抱怨。',
      es: 'Cuando me enfrento a un problema, busco soluciones rápidamente en lugar de quejarme.',
      ja: '問題に直面したとき、不平を言うのではなく、すぐに解決策を探します。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'resilience',
    direction: 1
  },
  
  // Creativity (创造力)
  {
    id: 'p23',
    text: {
      en: 'I enjoy finding innovative solutions to complex problems.',
      zh: '我喜欢为复杂问题找到创新解决方案。',
      es: 'Disfruto encontrando soluciones innovadoras a problemas complejos.',
      ja: '複雑な問題に革新的な解決策を見つけるのを楽しんでいます。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'creativity',
    direction: 1
  },
  {
    id: 'p24',
    text: {
      en: 'I often think of multiple approaches to problems.',
      zh: '我经常想到多种解决问题的方法。',
      es: 'A menudo pienso en múltiples enfoques para los problemas.',
      ja: '問題に対して複数のアプローチを考えることがよくあります。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'creativity',
    direction: 1
  },
  
  // Ambition (野心)
  {
    id: 'p25',
    text: {
      en: 'I set challenging goals for myself and work persistently to achieve them.',
      zh: '我为自己设定具有挑战性的目标，并持续努力实现它们。',
      es: 'Me fijo metas desafiantes y trabajo persistentemente para lograrlas.',
      ja: '自分自身に挑戦的な目標を設定し、それを達成するために粘り強く取り組みます。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'ambition',
    direction: 1
  },
  {
    id: 'p26',
    text: {
      en: 'Career success and advancement are very important to me.',
      zh: '职业成功和晋升对我非常重要。',
      es: 'El éxito y el avance profesional son muy importantes para mí.',
      ja: 'キャリアの成功と昇進は私にとって非常に重要です。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'ambition',
    direction: 1
  },
  
  // Empathy (同理心)
  {
    id: 'p27',
    text: {
      en: 'I can easily sense how others are feeling.',
      zh: '我能轻易感知他人的感受。',
      es: 'Puedo sentir fácilmente cómo se sienten los demás.',
      ja: '他人の気持ちを簡単に感じ取ることができます。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'empathy',
    direction: 1
  },
  {
    id: 'p28',
    text: {
      en: 'I feel deeply moved when I see someone in distress or need.',
      zh: '当我看到有人处于困境或需要帮助时，我会深受触动。',
      es: 'Me siento profundamente conmovido cuando veo a alguien en apuros o necesidad.',
      ja: '苦しんでいる人や助けが必要な人を見ると、深く心を動かされます。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'empathy',
    direction: 1
  },
  
  // Risk Tolerance (风险承受力)
  {
    id: 'p29',
    text: {
      en: 'I enjoy taking risks and seeking thrilling experiences.',
      zh: '我喜欢冒险和寻求刺激体验。',
      es: 'Disfruto tomando riesgos y buscando experiencias emocionantes.',
      ja: 'リスクを取り、スリリングな体験を求めるのが好きです。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'risk_tolerance',
    direction: 1
  },
  {
    id: 'p30',
    text: {
      en: 'I prefer security and stability over uncertainty and change.',
      zh: '相比不确定性和变化，我更喜欢安全和稳定。',
      es: 'Prefiero la seguridad y estabilidad sobre la incertidumbre y el cambio.',
      ja: '不確実性や変化よりも、安全性と安定性を好みます。'
    },
    options: {
      en: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
      zh: ['强烈反对', '反对', '中立', '同意', '强烈同意'],
      es: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],
      ja: ['全く同意しない', '同意しない', '中立', '同意する', '強く同意する']
    },
    factor: 'risk_tolerance',
    direction: -1
  }
]; 