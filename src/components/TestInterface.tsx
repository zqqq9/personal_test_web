import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Brain, Star, Globe } from 'lucide-react';
import { Question, Answer, PersonalityResult, SupportedLanguage } from '../types/personality';
import { questions, freeQuestions } from '../data/questions';
import { calculateResults } from '../utils/scoring';
import { useTranslation } from 'react-i18next';

interface TestInterfaceProps {
  onTestComplete: (results: PersonalityResult) => void;
  testType: 'free' | 'premium';
}

const TestInterface: React.FC<TestInterfaceProps> = ({ onTestComplete, testType }) => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const currentQuestions = testType === 'free' ? freeQuestions : questions;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const progress = ((currentQuestion + 1) / currentQuestions.length) * 100;

  useEffect(() => {
    // Check if there's an existing answer for this question
    const existingAnswer = answers.find(a => a.questionId === currentQuestions[currentQuestion].id);
    setSelectedAnswer(existingAnswer ? existingAnswer.value : null);
  }, [currentQuestion, answers, currentQuestions]);

  useEffect(() => {
    // Set initial language from i18n
    const currentLang = i18n.language;
    if (currentLang === 'zh' || currentLang === 'es' || currentLang === 'ja') {
      setLanguage(currentLang as SupportedLanguage);
    } else {
      setLanguage('en');
    }
  }, [i18n.language]);

  const handleAnswer = (value: number) => {
    setSelectedAnswer(value);
    
    const newAnswer: Answer = {
      questionId: currentQuestions[currentQuestion].id,
      value
    };

    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== currentQuestions[currentQuestion].id);
      return [...filtered, newAnswer];
    });
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Test complete
      const results = calculateResults(answers, testType);
      onTestComplete(results);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    setShowLanguageMenu(false);
  };

  // Get the localized question text
  const getQuestionText = (question: Question): string => {
    if (typeof question.text === 'string') {
      return question.text;
    } else if (question.text && typeof question.text === 'object') {
      return question.text[language] || question.text.en;
    }
    return '';
  };

  // Get the localized options
  const getQuestionOptions = (question: Question): string[] => {
    if (Array.isArray(question.options)) {
      return question.options;
    } else if (question.options && typeof question.options === 'object') {
      return question.options[language] || question.options.en;
    }
    return [];
  };

  const languages = [
    { code: 'en' as SupportedLanguage, name: 'English', flag: '🇺🇸' },
    { code: 'zh' as SupportedLanguage, name: '中文', flag: '🇨🇳' }
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="relative">
              <Brain className="h-8 w-8 text-purple-400" />
              {testType === 'premium' && (
                <Star className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 fill-current" />
              )}
            </div>
            <span className="text-2xl font-bold text-white">PersonaLens</span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              testType === 'premium' 
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                : 'bg-green-500/20 text-green-400'
            }`}>
              {testType === 'premium' ? t('results.premium') : t('results.free')}
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-white">
            {t('test.title')}
          </h1>
          <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
            {testType === 'premium' ? t('test.premiumDescription') : t('test.freeDescription')}
          </p>
        </div>

        {/* Language Selector */}
        <div className="absolute top-4 right-4">
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
                        lang.code === language ? 'text-white' : 'text-gray-300'
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

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              {t('test.question')} {currentQuestion + 1} {t('test.of')} {currentQuestions.length}
            </span>
            <span className="text-sm text-gray-400">{Math.round(progress)}% {t('test.complete')}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                testType === 'premium' 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                  : 'bg-gradient-to-r from-green-500 to-teal-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className={`backdrop-blur-md rounded-2xl p-8 mb-8 ${
          testType === 'premium' 
            ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30'
            : 'bg-white/10 border border-white/20'
        }`}>
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-white leading-relaxed flex-1">
              {getQuestionText(currentQuestions[currentQuestion])}
            </h2>
            {testType === 'premium' && (
              <div className="ml-4 bg-purple-500/20 p-2 rounded-lg">
                <Star className="h-6 w-6 text-yellow-400 fill-current" />
              </div>
            )}
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {getQuestionOptions(currentQuestions[currentQuestion]).map((option, index) => {
              const value = index + 1;
              const isSelected = selectedAnswer === value;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(value)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-center justify-between group ${
                    isSelected 
                      ? testType === 'premium'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white scale-105 shadow-lg'
                        : 'bg-green-600 text-white scale-105 shadow-lg'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white'
                  }`}
                >
                  <span className="font-medium">{option}</span>
                  {isSelected && <CheckCircle className="h-5 w-5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-200 ${
              currentQuestion === 0
                ? 'text-gray-500 cursor-not-allowed'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{t('test.previous')}</span>
          </button>

          <div className="text-center">
            <div className="text-gray-400 text-sm mb-1">
              {testType === 'premium' ? t('common.premiumTest') : t('common.freeTest')}
            </div>
            <div className="text-xs text-gray-500">
              {testType === 'premium' ? '40 ' + t('test.questions') : '15 ' + t('test.questions')}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-200 ${
              selectedAnswer === null
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : currentQuestion === currentQuestions.length - 1
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span>{currentQuestion === currentQuestions.length - 1 ? t('test.submit') : t('test.next')}</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestInterface;