import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { SupportedLanguage } from '../types/personality';

// Import translations directly
import en from './locales/en.json';
import zh from './locales/zh.json';
import es from './locales/es.json';
import ja from './locales/ja.json';

// Initialize i18n
const initI18n = async () => {
  try {
    await i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources: {
          en: { translation: en },
          zh: { translation: zh },
          es: { translation: es },
          ja: { translation: ja }
        },
        fallbackLng: 'en',
        debug: process.env.NODE_ENV === 'development',
        interpolation: {
          escapeValue: false,
        },
        detection: {
          order: ['localStorage', 'navigator'],
          caches: ['localStorage'],
        },
        react: {
          useSuspense: false // This is important for SSR
        }
      });
    console.log('i18n initialized successfully');
  } catch (error) {
    console.error('Failed to initialize i18n:', error);
  }
};

// Initialize immediately
initI18n();

// Helper functions
export const getSupportedLanguages = (): Array<{code: SupportedLanguage, name: string, flag: string}> => [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }
];

export const getCurrentLanguage = (): SupportedLanguage => {
  const currentLang = i18n.language || 'en';
  
  if (!['en', 'zh', 'es', 'ja'].includes(currentLang)) {
    return 'en';
  }
  
  return currentLang as SupportedLanguage;
};

export default i18n; 