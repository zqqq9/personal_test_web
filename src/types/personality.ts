export interface Question {
  id: string;
  text: {
    en: string;
    zh: string;
    es: string;
    ja: string;
  } | string;
  options: {
    en: string[];
    zh: string[];
    es: string[];
    ja: string[];
  } | string[];
  factor: string;
  direction: number;
  category?: string;
  reverse?: boolean;
}

export interface Answer {
  questionId: string;
  value: number;
}

export type PersonalityDimension = 'openness' | 'conscientiousness' | 'extraversion' | 'agreeableness' | 'neuroticism' | 'resilience' | 'creativity' | 'ambition' | 'empathy' | 'risk_tolerance';

export interface PersonalityScore {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
  resilience: number;
  creativity: number;
  ambition: number;
  empathy: number;
  risk_tolerance: number;
}

export interface PersonalityResult {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
  resilience?: number;
  creativity?: number;
  ambition?: number;
  empathy?: number;
  risk_tolerance?: number;
  timestamp: string;
  scores?: PersonalityScore;
  primaryType?: string;
  description?: string;
  strengths?: string[];
  growthAreas?: string[];
  careerSuggestions?: string[];
}

// Supported languages
export type SupportedLanguage = 'en' | 'zh' | 'es' | 'ja';

// Localized trait names for each language
export interface LocalizedTraits {
  en: {
    openness: string;
    conscientiousness: string;
    extraversion: string;
    agreeableness: string;
    neuroticism: string;
    resilience: string;
    creativity: string;
    ambition: string;
    empathy: string;
    risk_tolerance: string;
  };
  zh: {
    openness: string;
    conscientiousness: string;
    extraversion: string;
    agreeableness: string;
    neuroticism: string;
    resilience: string;
    creativity: string;
    ambition: string;
    empathy: string;
    risk_tolerance: string;
  };
  es: {
    openness: string;
    conscientiousness: string;
    extraversion: string;
    agreeableness: string;
    neuroticism: string;
    resilience: string;
    creativity: string;
    ambition: string;
    empathy: string;
    risk_tolerance: string;
  };
  ja: {
    openness: string;
    conscientiousness: string;
    extraversion: string;
    agreeableness: string;
    neuroticism: string;
    resilience: string;
    creativity: string;
    ambition: string;
    empathy: string;
    risk_tolerance: string;
  };
} 