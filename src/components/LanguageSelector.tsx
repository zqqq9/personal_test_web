import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { SupportedLanguage } from '../types/personality';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setShowMenu(false);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative">
      <button 
        className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/10"
        onClick={() => setShowMenu(!showMenu)}
      >
        <Globe className="h-5 w-5" />
        <span>{currentLanguage.flag}</span>
      </button>
      
      {showMenu && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-md rounded-lg shadow-lg py-2 z-50">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full px-4 py-2 text-left hover:bg-white/10 transition-colors duration-200 flex items-center space-x-2 ${
                  i18n.language === language.code ? 'text-purple-400' : 'text-white'
                }`}
              >
                <span>{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector; 