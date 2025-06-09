import { useState } from 'react';
import { Brain, ArrowLeft, CheckCircle, Star, Zap, Target, Users, Award, Crown, Sparkles, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SupportedLanguage } from '../types/personality';

interface PricingPageProps {
  onStartTest: (type: 'free' | 'premium') => void;
  onBackToHome: () => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onStartTest, onBackToHome }) => {
  const { t, i18n } = useTranslation();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const handleLanguageChange = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
    setShowLanguageMenu(false);
  };

  const languages = [
    { code: 'en' as SupportedLanguage, name: 'English', flag: '🇺🇸' },
    { code: 'zh' as SupportedLanguage, name: '中文', flag: '🇨🇳' }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={onBackToHome}
            className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{t('common.back')}</span>
          </button>
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">PersonaLens</span>
          </div>
          
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

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full mb-6">
            <Crown className="h-10 w-10 text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('pricing.title')}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Free Plan */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">{t('pricing.freePlan.title')}</h3>
              <div className="text-4xl font-bold text-green-400 mb-2">{t('pricing.freePrice')}</div>
              <p className="text-gray-400">{t('pricing.forever')}</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">{t('pricing.freePlan.features.basic')}</div>
                  <div className="text-gray-400 text-sm">{t('pricing.freePlan.description')}</div>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">{t('pricing.freePlan.features.time')}</div>
                  <div className="text-gray-400 text-sm">{t('test.freeDescription')}</div>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">{t('pricing.freePlan.features.instant')}</div>
                  <div className="text-gray-400 text-sm">{t('results.freeDescription')}</div>
                </div>
              </li>
            </ul>

            <button 
              onClick={() => onStartTest('free')}
              className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg transition-colors duration-200 border border-white/20"
            >
              {t('pricing.freePlan.cta')}
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-8 border-2 border-purple-400/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center py-2 text-sm font-bold">
              {t('pricing.recommended')}
            </div>
            
            <div className="text-center mb-8 mt-6">
              <h3 className="text-2xl font-bold text-white mb-2">{t('pricing.premiumPlan.title')}</h3>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-2xl text-gray-400 line-through">{t('pricing.originalPrice')}</span>
                <div className="text-4xl font-bold text-purple-400">{t('pricing.premiumPrice')}</div>
              </div>
              <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                {t('pricing.limitedTimeOffer')}
              </div>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">{t('pricing.premiumPlan.features.detailed')}</div>
                  <div className="text-gray-400 text-sm">{t('pricing.premiumPlan.description')}</div>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">{t('pricing.premiumPlan.features.career')}</div>
                  <div className="text-gray-400 text-sm">{t('pricing.premiumPlan.features.comprehensive')}</div>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">{t('pricing.premiumPlan.features.growth')}</div>
                  <div className="text-gray-400 text-sm">{t('test.premiumDescription')}</div>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">{t('pricing.premiumPlan.features.relationships')}</div>
                  <div className="text-gray-400 text-sm">{t('results.premiumDescription')}</div>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">{t('pricing.premiumPlan.features.pdf')}</div>
                  <div className="text-gray-400 text-sm">{t('results.downloadPDF')}</div>
                </div>
              </li>
            </ul>

            <button
              onClick={() => onStartTest('premium')}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-lg transition-all duration-200 transform hover:scale-105 font-semibold text-lg shadow-xl"
            >
              {t('pricing.premiumPlan.cta')}
            </button>
            
            <div className="text-center mt-4 text-gray-400 text-sm">
              {t('pricing.guarantee')}
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">{t('pricing.whyPremium')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{t('pricing.valueProps.detailed.title')}</h3>
              <p className="text-gray-400">
                {t('pricing.valueProps.detailed.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{t('pricing.valueProps.career.title')}</h3>
              <p className="text-gray-400">
                {t('pricing.valueProps.career.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-teal-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{t('pricing.valueProps.insights.title')}</h3>
              <p className="text-gray-400">
                {t('pricing.valueProps.insights.description')}
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">{t('pricing.testimonials.title')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">
                {t('pricing.testimonials.first.quote')}
              </p>
              <div className="text-white font-semibold">{t('pricing.testimonials.first.name')}</div>
              <div className="text-gray-400 text-sm">{t('pricing.testimonials.first.title')}</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">
                {t('pricing.testimonials.second.quote')}
              </p>
              <div className="text-white font-semibold">{t('pricing.testimonials.second.name')}</div>
              <div className="text-gray-400 text-sm">{t('pricing.testimonials.second.title')}</div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-8">{t('pricing.faq.title')}</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold mb-2">{t('pricing.faq.accuracy.question')}</h3>
              <p className="text-gray-400">{t('pricing.faq.accuracy.answer')}</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">{t('pricing.faq.upgrade.question')}</h3>
              <p className="text-gray-400">{t('pricing.faq.upgrade.answer')}</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">{t('pricing.faq.security.question')}</h3>
              <p className="text-gray-400">{t('pricing.faq.security.answer')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;