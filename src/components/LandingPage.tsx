import { Brain, Sparkles, Target, Users, ArrowRight, Star, CheckCircle, Zap, Shield, Award, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

interface LandingPageProps {
  onStartTest: (testType: 'free' | 'premium') => void;
  onBlogClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartTest, onBlogClick }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Brain className="h-8 w-8 text-purple-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold text-white">PersonaLens</span>
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-xs px-2 py-1 rounded-full text-white font-semibold">AI-Powered</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onStartTest('free')}
              className="text-white hover:text-purple-300 transition-colors duration-200"
            >
              {t('common.freeTest')}
            </button>
            <button
              onClick={() => onStartTest('premium')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105"
            >
              {t('common.premiumTest')}
            </button>
            <button
              onClick={onBlogClick}
              className="text-white hover:text-purple-300 transition-colors duration-200"
            >
              {t('common.blog')}
            </button>
            <LanguageSelector />
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="text-center max-w-6xl mx-auto">
          <div className="mb-12">
            {/* Floating Elements */}
            <div className="relative">
              <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute top-20 right-20 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
              <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-teal-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                {t('landing.title')}
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent block animate-gradient">
                  {t('landing.subtitle')}
                </span>
              </h1>
            </div>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('landing.description')}
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
              <div className="flex items-center space-x-2 text-yellow-400">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-white font-semibold">4.9/5</span>
                <span className="text-gray-400">50k+ {t('landing.stats.users')}</span>
              </div>
              <div className="flex items-center space-x-2 text-green-400">
                <Shield className="h-5 w-5" />
                <span className="text-white font-semibold">100% {t('landing.private')}</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-400">
                <Award className="h-5 w-5" />
                <span className="text-white font-semibold">{t('landing.scienceBased')}</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button
              onClick={() => onStartTest('free')}
              className="group bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 border border-white/20 hover:border-white/40"
            >
              <div className="flex items-center justify-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span>{t('landing.startFreeTest')}</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-sm text-gray-300 mt-1">{t('landing.freeTestDescription')}</div>
            </button>
            
            <button
              onClick={() => onStartTest('premium')}
              className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative flex items-center justify-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span>{t('landing.premiumAnalysis')}</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-sm text-purple-100 mt-1">{t('landing.premiumDescription')}</div>
            </button>
          </div>

          {/* Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
            {/* Free Test Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">{t('common.freeTest')}</h3>
                <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                  $0
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  {t('pricing.freePlan.features.basic')}
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  {t('pricing.freePlan.features.report')}
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  {t('pricing.freePlan.features.time')}
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  {t('pricing.freePlan.features.instant')}
                </li>
              </ul>
              <button
                onClick={() => onStartTest('free')}
                className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg transition-colors duration-200 border border-white/20"
              >
                {t('landing.startFreeTest')}
              </button>
            </div>

            {/* Premium Test Card */}
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-8 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-400 to-blue-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                {t('pricing.recommended')}
              </div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">{t('common.premiumTest')}</h3>
                <div className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-semibold">
                  $9.99
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                  {t('pricing.premiumPlan.features.detailed')}
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                  {t('pricing.premiumPlan.features.career')}
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                  {t('pricing.premiumPlan.features.comprehensive')}
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                  {t('pricing.premiumPlan.features.growth')}
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                  {t('pricing.premiumPlan.features.relationships')}
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                  {t('pricing.premiumPlan.features.pdf')}
                </li>
              </ul>
              <button
                onClick={() => onStartTest('premium')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                {t('pricing.premiumPlan.cta')}
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 group">
              <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{t('landing.features.ai.title')}</h3>
              <p className="text-gray-400">
                {t('landing.features.ai.description')}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 group">
              <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Target className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{t('landing.features.accurate.title')}</h3>
              <p className="text-gray-400">
                {t('landing.features.accurate.description')}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 group">
              <div className="bg-teal-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-8 w-8 text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{t('landing.features.growth.title')}</h3>
              <p className="text-gray-400">
                {t('landing.features.growth.description')}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-3xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform">50k+</div>
              <div className="text-gray-400 text-sm">{t('landing.stats.users')}</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform">98%</div>
              <div className="text-gray-400 text-sm">{t('landing.stats.accuracy')}</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-teal-400 mb-2 group-hover:scale-110 transition-transform">15min</div>
              <div className="text-gray-400 text-sm">{t('landing.stats.time')}</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform">24/7</div>
              <div className="text-gray-400 text-sm">{t('landing.stats.availability')}</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/5 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 PersonaLens. {t('landing.footer')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;