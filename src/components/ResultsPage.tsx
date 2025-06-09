import { useEffect, useState } from 'react';
import { Brain, TrendingUp, Target, Briefcase, RotateCcw, Home, Star, Download, ArrowLeft, Crown, Globe, CheckCircle, AlertTriangle, Shield, Lightbulb, Trophy, Heart, Activity, Loader2 } from 'lucide-react';
import { PersonalityResult, SupportedLanguage, PersonalityScore, PersonalityDimension } from '../types/personality';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { localizedTraits } from '../i18n/localizedTraits';
import { getTraitLevel } from '../utils/personalityHelpers';

// 添加思源宋体作为中文字体
import notoSansSCNormalBase64 from '../assets/NotoSansSC-Regular-normal';

interface ResultsPageProps {
  results: PersonalityResult;
  testType: 'free' | 'premium';
  onBackToHome: () => void;
  onRetakeTest: () => void;
  onBackToPricing: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ 
  results, 
  testType, 
  onBackToHome, 
  onRetakeTest, 
  onBackToPricing 
}) => {
  const { t, i18n } = useTranslation();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  // 检查是否有任何维度显示为NaN
  const hasNaNValues = results && results.scores ? 
    Object.values(results.scores).some(score => isNaN(Number(score))) : false;
  
  const handleLanguageChange = (lang: SupportedLanguage) => {
    // i18n.changeLanguage(lang).then(() => {
    //   // 强制刷新组件以更新所有文本
    //   setShowLanguageMenu(false);
      
    //   // 在语言切换后强制重新计算所有文本
    //   if (results && results.strengths) {
    //     // 触发状态更新以强制重新渲染
    //     setDownloading(false);
        
    //     // 这是一个小技巧，用于强制组件完全重新渲染
    //     const tempResults = {...results};
    //     setTimeout(() => {
    //       // 使用短暂的setTimeout确保React完成更新队列
    //     }, 10);
    //   }
    // });
  };

  const languages = [
    { code: 'en' as SupportedLanguage, name: 'English', flag: '🇺🇸' },
    { code: 'zh' as SupportedLanguage, name: '中文', flag: '🇨🇳' }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const dimensionLabels = {
    en: {
      extraversion: 'Extraversion',
      agreeableness: 'Agreeableness',
      conscientiousness: 'Conscientiousness',
      neuroticism: 'Emotional Stability',
      openness: 'Openness to Experience',
      resilience: 'Resilience',
      creativity: 'Creativity',
      ambition: 'Ambition',
      empathy: 'Empathy',
      risk_tolerance: 'Risk Tolerance'
    },
    zh: {
      extraversion: '外向性',
      agreeableness: '宜人性',
      conscientiousness: '尽责性',
      neuroticism: '情绪稳定性',
      openness: '开放性',
      resilience: '复原力',
      creativity: '创造力',
      ambition: '雄心壮志',
      empathy: '同理心',
      risk_tolerance: '风险容忍度'
    },
    es: {
      extraversion: 'Extraversión',
      agreeableness: 'Amabilidad',
      conscientiousness: 'Responsabilidad',
      neuroticism: 'Estabilidad Emocional',
      openness: 'Apertura a la Experiencia',
      resilience: 'Resiliencia',
      creativity: 'Creatividad',
      ambition: 'Ambición',
      empathy: 'Empatía',
      risk_tolerance: 'Tolerancia al Riesgo'
    },
    ja: {
      extraversion: '外向性',
      agreeableness: '協調性',
      conscientiousness: '誠実性',
      neuroticism: '感情安定性',
      openness: '開放性',
      resilience: '復原力',
      creativity: '創造力',
      ambition: '雄心壮志',
      empathy: '同理心',
      risk_tolerance: '風險容忍度'
    }
  };

  const dimensionDescriptions = {
    en: {
      extraversion: 'Your tendency to seek stimulation from the outside world',
      agreeableness: 'How cooperative and trusting you are with others',
      conscientiousness: 'Your level of organization and self-discipline',
      neuroticism: 'Your emotional resilience and stability',
      openness: 'Your willingness to try new experiences and ideas',
      resilience: 'Your ability to recover from adversity',
      creativity: 'Your ability to generate new ideas and solutions',
      ambition: 'Your drive for success and achievement',
      empathy: 'Your ability to understand and share the feelings of others',
      risk_tolerance: 'Your willingness to take calculated risks'
    },
    zh: {
      extraversion: '你从外部世界寻求刺激的倾向',
      agreeableness: '你与他人合作与信任的程度',
      conscientiousness: '你的组织性和自律水平',
      neuroticism: '你的情绪恢复力和稳定性',
      openness: '你尝试新体验和想法的意愿',
      resilience: '你从挫折中恢复的能力',
      creativity: '你生成新想法和解决方案的能力',
      ambition: '你追求成功和成就的驱动力',
      empathy: '你理解并分享他人感受的能力',
      risk_tolerance: '你愿意承担风险的能力'
    },
    es: {
      extraversion: 'Tu tendencia a buscar estímulo del mundo exterior',
      agreeableness: 'Cuán cooperativo y confiado eres con otros',
      conscientiousness: 'Tu nivel de organización y autodisciplina',
      neuroticism: 'Tu resiliencia emocional y estabilidad',
      openness: 'Tu disposición a probar nuevas experiencias e ideas',
      resilience: 'Tu capacidad de recuperarte de adversidades',
      creativity: 'Tu capacidad de generar nuevas ideas y soluciones',
      ambition: 'Tu deseo de éxito y logro',
      empathy: 'Tu capacidad de entender y compartir los sentimientos de otros',
      risk_tolerance: 'Tu disposición a asumir riesgos'
    },
    ja: {
      extraversion: '外部世界から刺激を求める傾向',
      agreeableness: '他者との協力と信頼の程度',
      conscientiousness: '組織性と自己規律のレベル',
      neuroticism: '感情的な回復力と安定性',
      openness: '新しい経験やアイデアを試す意欲',
      resilience: '感情的な回復力と安定性',
      creativity: '新しいアイデアや解決策を生み出す能力',
      ambition: '成功と成就への欲求',
      empathy: '他者の感情を理解し共有する能力',
      risk_tolerance: 'リスクを取る意欲'
    }
  };

  const getLocalizedDimensionLabel = (dimension: string) => {
    const lang = i18n.language as SupportedLanguage;
    return dimensionLabels[lang]?.[dimension as keyof typeof dimensionLabels.en] || 
           dimensionLabels.en[dimension as keyof typeof dimensionLabels.en];
  };

  const getLocalizedDimensionDescription = (dimension: string) => {
    const lang = i18n.language as SupportedLanguage;
    return dimensionDescriptions[lang]?.[dimension as keyof typeof dimensionDescriptions.en] || 
           dimensionDescriptions.en[dimension as keyof typeof dimensionDescriptions.en];
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-purple-400';
    if (score >= 20) return 'text-orange-400';
    return 'text-red-400';
  };

  const getBarColor = (score: number) => {
    if (score >= 80) return 'bg-gradient-to-r from-emerald-500 to-teal-500';
    if (score >= 60) return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    if (score >= 40) return 'bg-gradient-to-r from-purple-500 to-blue-500';
    if (score >= 20) return 'bg-gradient-to-r from-orange-500 to-yellow-500';
    return 'bg-gradient-to-r from-red-500 to-pink-500';
  };

  const getLocalizedTraitName = (trait: string) => {
    const lang = i18n.language as SupportedLanguage;
    return localizedTraits[lang]?.[trait as keyof typeof localizedTraits.en] || 
           localizedTraits.en[trait as keyof typeof localizedTraits.en];
  };

  const getAdvancedTraitIcon = (trait: string) => {
    switch(trait) {
      case 'resilience': return <Shield className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />;
      case 'creativity': return <Lightbulb className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />;
      case 'ambition': return <Trophy className="h-5 w-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />;
      case 'empathy': return <Heart className="h-5 w-5 text-pink-400 mr-3 mt-0.5 flex-shrink-0" />;
      case 'risk_tolerance': return <Activity className="h-5 w-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />;
      default: return <Target className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />;
    }
  };

  const getAdvancedTraitDescription = (trait: string) => {
    // Get trait score
    if (!results || typeof results[trait as keyof PersonalityResult] !== 'number') {
      return '';
    }
    
    const score = results[trait as keyof PersonalityResult] as number;
    let level = 'moderate';
    
    // Determine level based on score
    if (score < 20) level = 'veryLow';
    else if (score < 40) level = 'low';
    else if (score < 60) level = 'moderate';
    else if (score < 80) level = 'high';
    else level = 'veryHigh';
    
    // Return the appropriate localized description for the trait and level
    return t(`traits.${trait}.levels.${level}`);
  };

  const generatePDF = async () => {
    if (!results || !results.scores) return;
    
    setDownloading(true);
    
    try {
      // Create a new PDF document
      const doc = new jsPDF();
      
      const lang = i18n.language as SupportedLanguage;
      
      // Add title
      doc.setFontSize(24);
      doc.setTextColor(80, 80, 80);
      doc.text(t('results.title'), 105, 20, { align: 'center' });
      
      // Add timestamp
      const date = new Date(results.timestamp);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(t('results.generatedOn') + ': ' + date.toLocaleString(lang), 105, 28, { align: 'center' });
      
      // Add logo
      doc.setFontSize(16);
      doc.setTextColor(80, 40, 180);
      doc.text('PersonaLens', 105, 40, { align: 'center' });
      
      // Add personality type
      doc.setFontSize(18);
      doc.setTextColor(60, 60, 60);
      doc.text(t('results.personalityType') + ': ' + (results.primaryType || ''), 20, 55);
      
      // Add description
      doc.setFontSize(12);
      doc.setTextColor(80, 80, 80);
      const splitDescription = doc.splitTextToSize(results.description || '', 170);
      doc.text(splitDescription, 20, 65);
      
      // Add personality dimensions
      doc.setFontSize(16);
      doc.setTextColor(60, 60, 60);
      doc.text(t('results.personalityDimensions'), 20, 90);
      
      // Create table for dimensions
      const dimensionsTableData = Object.entries(results.scores || {}).map(([dimension, score]) => {
        const numericScore = Number(score);
        return [getLocalizedDimensionLabel(dimension), `${!isNaN(numericScore) ? numericScore : 'N/A'}%`];
      });
      
      // Add table for dimensions
      autoTable(doc, {
        startY: 95,
        head: [[t('results.dimension'), t('results.score')]],
        body: dimensionsTableData,
        theme: 'grid',
        headStyles: {
          fillColor: [100, 70, 180],
          textColor: [255, 255, 255]
        },
        alternateRowStyles: {
          fillColor: [240, 240, 250]
        },
        // 设置中文字体
        styles: lang === 'zh' ? { font: 'NotoSansSC' } : undefined
      });
      
      let finalY = (doc as any).lastAutoTable.finalY;
      
      // Add advanced traits
      if (testType === 'premium') {
        const advancedTraits = ['resilience', 'creativity', 'ambition', 'empathy', 'risk_tolerance'];
        const hasAdvancedTraits = advancedTraits.some(trait => results[trait as keyof PersonalityResult] !== undefined);
        
        if (hasAdvancedTraits) {
          doc.setFontSize(16);
          doc.setTextColor(60, 60, 60);
          doc.text(t('results.advancedTraits'), 20, finalY + 20);
          
          // Create table for advanced traits
          const advancedTraitsData = advancedTraits
            .filter(trait => results[trait as keyof PersonalityResult] !== undefined)
            .map(trait => {
              const value = results[trait as keyof PersonalityResult] as number;
              const level = getTraitLevel(value !== undefined && !isNaN(value) ? value : 50);
              const description = t(`traits.${trait}.levels.${level}`);
              return [
                getLocalizedTraitName(trait), 
                `${value !== undefined && !isNaN(value) ? value : 'N/A'}%`,
                t(`traits.${trait}.title`),
                description
              ];
            });
          
          // Add table for advanced traits
          autoTable(doc, {
            startY: finalY + 25,
            head: [[
              t('results.advancedTrait'), 
              t('results.score'),
              t('results.dimension'),
              t('results.analysis')
            ]],
            body: advancedTraitsData,
            theme: 'grid',
            headStyles: {
              fillColor: [156, 39, 176],
              textColor: [255, 255, 255]
            },
            alternateRowStyles: {
              fillColor: [245, 235, 255]
            },
            columnStyles: {
              3: { cellWidth: 'auto' }
            },
            // 设置中文字体
            styles: lang === 'zh' ? { font: 'NotoSansSC' } : undefined
          });
          
          finalY = (doc as any).lastAutoTable.finalY;
        }
      }
      
      // Add strengths
      doc.setFontSize(16);
      doc.setTextColor(60, 60, 60);
      doc.text(t('results.yourStrengths'), 20, finalY + 20);
      
      // Create table for strengths
      const strengthsTableData = (results.strengths || []).map((strength: any) => [strength]);
      
      // Add table for strengths
      autoTable(doc, {
        startY: finalY + 25,
        head: [[t('results.strength')]],
        body: strengthsTableData,
        theme: 'grid',
        headStyles: {
          fillColor: [46, 204, 113],
          textColor: [255, 255, 255]
        },
        alternateRowStyles: {
          fillColor: [240, 250, 240]
        },
        // 设置中文字体
        styles: lang === 'zh' ? { font: 'NotoSansSC' } : undefined
      });
      
      finalY = (doc as any).lastAutoTable.finalY;
      
      // Add growth areas if premium
      if (testType === 'premium' && results.growthAreas) {
        doc.setFontSize(16);
        doc.setTextColor(60, 60, 60);
        doc.text(t('results.growthAreas'), 20, finalY + 20);
        
        // Create table for growth areas
        const growthAreasTableData = results.growthAreas.map((area: any) => [area]);
        
        // Add table for growth areas
        autoTable(doc, {
          startY: finalY + 25,
          head: [[t('results.growthArea')]],
          body: growthAreasTableData,
          theme: 'grid',
          headStyles: {
            fillColor: [230, 126, 34],
            textColor: [255, 255, 255]
          },
          alternateRowStyles: {
            fillColor: [255, 240, 230]
          },
          // 设置中文字体
          styles: lang === 'zh' ? { font: 'NotoSansSC' } : undefined
        });
        
        finalY = (doc as any).lastAutoTable.finalY;
      }
      
      // Add career suggestions if premium
      if (testType === 'premium' && results.careerSuggestions) {
        doc.setFontSize(16);
        doc.setTextColor(60, 60, 60);
        doc.text(t('results.careerSuggestions'), 20, finalY + 20);
        
        // Create table for career suggestions
        const careerSuggestionsTableData = results.careerSuggestions.map((career: any) => [career]);
        
        // Add table for career suggestions
        autoTable(doc, {
          startY: finalY + 25,
          head: [[t('results.careerOption')]],
          body: careerSuggestionsTableData,
          theme: 'grid',
          headStyles: {
            fillColor: [41, 128, 185],
            textColor: [255, 255, 255]
          },
          alternateRowStyles: {
            fillColor: [230, 240, 255]
          },
          // 设置中文字体
          styles: lang === 'zh' ? { font: 'NotoSansSC' } : undefined
        });
      }
      
      // Add page numbering
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text(t('results.confidentialReport'), 105, doc.internal.pageSize.height - 10, { align: 'center' });
        doc.text(
          String(i) + ' / ' + String(pageCount),
          doc.internal.pageSize.width - 20,
          doc.internal.pageSize.height - 10
        );
      }
      
      // Save the PDF
      doc.save(`PersonaLens_${date.toLocaleDateString(lang)}.pdf`);
      
      return true;
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      setIsError(true);
      throw error;
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (downloading) return;
    setIsError(false);
    
    try {
      generatePDF().then(() => {
        setDownloading(false);
      }).catch(error => {
        console.error('Error generating PDF:', error);
        setIsError(true);
        setDownloading(false);
      });
    } catch (error) {
      console.error('Error starting PDF generation:', error);
      setIsError(true);
      setDownloading(false);
    }
  };

  // 获取本地化的性格类型名称
  const getLocalizedPersonalityType = (type: string | undefined): string => {
    if (!type) return t('results.personalityType');
    
    // 使用t函数获取翻译，如果没有翻译则返回原始类型名
    return t(`results.personalityTypes.${type}`, type);
  };
  // 用于获取本地化的优势、成长领域和职业建议
  const getLocalizedStrengths = (strengths: string[] | undefined): string[] => {
    if (!strengths) return [];
    
    // 这里可以根据需要添加更详细的翻译逻辑
    // 目前简单返回原始数据，后续可增强为从i18n文件中获取
    return strengths;
  };
  
  const getLocalizedGrowthAreas = (areas: string[] | undefined): string[] => {
    if (!areas) return [];
    return areas;
  };
  
  const getLocalizedCareerSuggestions = (careers: string[] | undefined): string[] => {
    if (!careers) return [];
    return careers;
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBackToHome}
            className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{t('common.backToHome')}</span>
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

        {/* Title */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
              testType === 'premium' 
                ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20'
                : 'bg-green-500/20'
            }`}>
              <Brain className={`h-10 w-10 ${
                testType === 'premium' ? 'text-purple-400' : 'text-green-400'
              }`} />
              {testType === 'premium' && (
                <Crown className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {t('results.title')}
            </h1>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              testType === 'premium' 
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                : 'bg-green-500/20 text-green-400'
            }`}>
              {testType === 'premium' ? t('results.premium') : t('results.free')}
            </span>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {testType === 'premium' 
              ? t('results.premiumDescription')
              : t('results.freeDescription')
            }
          </p>
        </div>
        
        {/* 错误提示信息 */}
        {hasNaNValues && (
          <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{t('results.error.nan')}</h3>
                <p className="text-gray-300">{t('results.error.nanDescription')}</p>
                <button
                  onClick={onRetakeTest}
                  className="mt-4 flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500/30 hover:bg-red-500/50 text-white transition-colors duration-200"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>{t('results.retakeTest')}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={onRetakeTest}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
          >
            <RotateCcw className="h-5 w-5" />
            <span>{t('results.retakeTest')}</span>
          </button>
          
          {testType === 'premium' && (
            <div className="mt-8 w-full">
              <button
                className={`w-full py-3 px-4 rounded-lg flex items-center justify-center text-white font-medium transition-all ${
                  downloading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                }`}
                onClick={handleDownloadPDF}
                disabled={downloading}
              >
                {downloading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('results.generatingPdf')}
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    {t('results.downloadPdf')}
                  </>
                )}
              </button>
              {isError && (
                <p className="text-red-500 text-sm mt-2 text-center">{t('results.pdfError')}</p>
              )}
            </div>
          )}
          
          {testType === 'free' && (
            <button
              onClick={onBackToPricing}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-200 transform hover:scale-105"
            >
              <Star className="h-5 w-5" />
              <span>{t('results.upgradeCta')}</span>
            </button>
          )}
        </div>

        {/* Upgrade Banner for Free Users */}
        {testType === 'free' && (
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-md rounded-2xl p-6 mb-8 border border-purple-400/30">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-500/20 p-3 rounded-full">
                  <Star className="h-6 w-6 text-yellow-400 fill-current" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{t('results.upgradeTitle')}</h3>
                  <p className="text-gray-300">{t('results.upgradeDescription')}</p>
                </div>
              </div>
              <button
                onClick={onBackToPricing}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105"
              >
                {t('results.upgradeCta')}
              </button>
            </div>
          </div>
        )}

        {/* Primary Type */}
        <div className={`backdrop-blur-md rounded-2xl p-8 mb-8 ${
          testType === 'premium' 
            ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30'
            : 'bg-white/10 border border-white/20'
        }`}>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Target className={`h-6 w-6 mr-2 ${
              testType === 'premium' ? 'text-purple-400' : 'text-green-400'
            }`} />
            {t('results.personalityType')}
          </h2>
          <div className="text-3xl font-bold text-white mb-4">
            {getLocalizedPersonalityType(results.primaryType)}
          </div>
          <p className="text-gray-300">
            {results.description || t('results.basicOverview')}
          </p>
        </div>

        {/* Personality Dimensions */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-blue-400" />
            {t('results.personalityDimensions')}
          </h2>
          
          <div className="space-y-6">
            {Object.entries(results.scores || {}).map(([dimension, score]) => {
              // 确保dimension是有效的PersonalityDimension
              const validDimension = dimension as PersonalityDimension;
              return (
                <div key={dimension} className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <div className="text-white font-medium">{getLocalizedDimensionLabel(validDimension)}</div>
                      <div className="text-gray-400 text-sm">{getLocalizedDimensionDescription(validDimension)}</div>
                    </div>
                    <div className={`text-xl font-bold ${isNaN(Number(score)) ? 'text-red-400' : getScoreColor(Number(score))}`}>
                      {isNaN(Number(score)) ? 'NaN%' : `${score}%`}
                    </div>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${isNaN(Number(score)) ? 'bg-red-500' : getBarColor(Number(score))} transition-all duration-1000`}
                      style={{ width: isNaN(Number(score)) ? '100%' : `${Number(score)}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between mt-1 text-xs text-gray-400">
                    <span>{t('results.low')}</span>
                    <span>{t('results.high')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Advanced Traits */}
        <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-8 mb-8 border border-purple-400/30">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Crown className="h-6 w-6 mr-2 text-yellow-400" />
              {t('results.advancedTraits')}
            </h2>
            {testType === 'premium' && (
              <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-xs text-white font-semibold">
                {t('results.premium')}
              </span>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {['resilience', 'creativity', 'ambition', 'empathy', 'risk_tolerance'].map(trait => {
              // 检查特性值是否存在，如果不存在或是NaN，使用基础维度计算默认值
              let value = results[trait as keyof PersonalityResult] as number | undefined;
              
              // 如果值不存在或是NaN，使用基础维度计算默认值
              if (value === undefined || isNaN(value)) {
                // 基于基础维度生成合理的默认值
                if (trait === 'resilience') {
                  value = Math.round((Number(results.neuroticism) || 50) * 0.6 + (Number(results.conscientiousness) || 50) * 0.4);
                } else if (trait === 'creativity') {
                  value = Math.round((Number(results.openness) || 50) * 0.7 + (Number(results.extraversion) || 50) * 0.3);
                } else if (trait === 'ambition') {
                  value = Math.round((Number(results.conscientiousness) || 50) * 0.5 + (Number(results.extraversion) || 50) * 0.3 + (Number(results.openness) || 50) * 0.2);
                } else if (trait === 'empathy') {
                  value = Math.round((Number(results.agreeableness) || 50) * 0.7 + (Number(results.openness) || 50) * 0.3);
                } else if (trait === 'risk_tolerance') {
                  value = Math.round((Number(results.openness) || 50) * 0.4 + (Number(results.extraversion) || 50) * 0.3 + (Number(results.neuroticism) || 50) * 0.3);
                } else if (trait === 'neuroticism') {
                  value = 50; // 默认中间值
                }
              }
              return (
                <div key={trait} className="bg-white/10 p-5 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      {getAdvancedTraitIcon(trait)}
                      <div className="text-white font-medium">{getLocalizedTraitName(trait)}</div>
                    </div>
                    <div className={`text-xl font-bold ${getScoreColor(value || 0)}`}>
                      {`${value}%`}
                    </div>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden mb-2">
                    <div 
                      className={`h-full ${getBarColor(value || 0)} transition-all duration-1000`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <p className="text-gray-300 text-sm mt-3">
                    {getAdvancedTraitDescription(trait)}
                  </p>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-start">
              <Lightbulb className="h-5 w-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
              <p className="text-gray-300 text-sm">{t('results.advancedTraitsDescription')}</p>
            </div>
          </div>
          
          {testType !== 'premium' && (
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg border border-purple-400/30 text-center">
              <p className="text-white mb-4">{t('results.upgradeForFullAccess')}</p>
              <button
                onClick={onBackToPricing}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                {t('results.upgradeCta')}
              </button>
            </div>
          )}
        </div>

        {/* Strengths */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Star className="h-6 w-6 mr-2 text-yellow-400" />
            {t('results.yourStrengths')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {getLocalizedStrengths(results.strengths)?.slice(0, testType === 'premium' ? undefined : 3).map((strength, index) => (
              <div 
                key={index}
                className="bg-white/5 p-4 rounded-lg border border-white/10"
              >
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">{strength}</span>
                </div>
              </div>
            ))}
          </div>
          
          {testType === 'free' && (
            <div className="mt-4 text-center">
              <div className="text-gray-400 italic">
                {t('results.moreStrengths')}
              </div>
            </div>
          )}
        </div>

        {/* Growth Areas - Premium Only or Teaser */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-orange-400" />
            {t('results.growthAreas')}
          </h2>
          
          {testType === 'premium' ? (
            <div className="grid md:grid-cols-2 gap-4">
              {getLocalizedGrowthAreas(results.growthAreas)?.map((area, index) => (
                <div 
                  key={index}
                  className="bg-white/5 p-4 rounded-lg border border-white/10"
                >
                  <div className="flex items-start">
                    <TrendingUp className="h-5 w-5 text-orange-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-200">{area}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8">
              <div className="text-gray-300 mb-4">
                {t('results.upgradeToSeeGrowthAreas')}
              </div>
              <button
                onClick={onBackToPricing}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                {t('results.upgradeCta')}
              </button>
            </div>
          )}
        </div>

        {/* Career Suggestions - Premium Only */}
        {testType === 'premium' && results.careerSuggestions && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Briefcase className="h-6 w-6 mr-2 text-blue-400" />
              {t('results.careerSuggestions')}
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {getLocalizedCareerSuggestions(results.careerSuggestions).map((career, index) => (
                <div 
                  key={index}
                  className="bg-white/5 p-4 rounded-lg border border-white/10 text-center"
                >
                  <span className="text-gray-200">{career}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;