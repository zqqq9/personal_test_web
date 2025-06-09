import * as React from 'react';
import { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PricingPage from './components/PricingPage';
import TestInterface from './components/TestInterface';
import ResultsPage from './components/ResultsPage';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import NotFound from './components/NotFound';
import Meta from './components/Meta';
import './i18n';
import i18n from './i18n';

// 博客文章组件包装器
const BlogPostWrapper: React.FC = () => {
  const { postId } = useParams<{ postId?: string }>();
  const navigate = useNavigate();
  
  return (
    <BlogPost id={postId || ''} onBackToBlog={() => navigate('/blog')} />
  );
};

// 主应用组件
const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const [testType, setTestType] = useState<'free' | 'premium'>('free');
  const [results, setResults] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  // 监听语言变化，强制组件重新渲染
  useEffect(() => {
    const handleLanguageChange = () => {
      // 强制组件重新渲染
      setRefreshKey(prev => prev + 1);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const handleStartTest = (type: 'free' | 'premium') => {
    setTestType(type);
    navigate('/test');
  };

  const handleTestComplete = (testResults: any) => {
    setResults(testResults);
    navigate('/results');
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white" key={refreshKey}>
      <Meta 
        title="PersonaLens - Discover Your True Self" 
        description="Unlock deep insights into your personality with AI-powered assessment. Based on cutting-edge psychological research." 
      />
      
      <Routes>
        <Route 
          path="/" 
          element={
            <LandingPage 
              onStartTest={handleStartTest}
              onBlogClick={() => navigate('/blog')}
            />
          } 
        />
        <Route 
          path="/pricing" 
          element={
            <PricingPage 
              onStartTest={handleStartTest}
              onBackToHome={() => navigate('/')}
            />
          } 
        />
        <Route 
          path="/test" 
          element={
            <TestInterface 
              onTestComplete={handleTestComplete}
              testType={testType}
            />
          } 
        />
        <Route 
          path="/results" 
          element={
            results ? (
              <ResultsPage 
                results={results}
                testType={testType}
                onBackToHome={() => navigate('/')}
                onRetakeTest={() => navigate('/test')}
                onBackToPricing={() => navigate('/pricing')}
              />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/blog" 
          element={
            <Blog 
              onPostClick={(postId: string) => navigate(`/blog/${postId}`)}
            />
          } 
        />
        <Route 
          path="/blog/:postId" 
          element={<BlogPostWrapper />} 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

// 应用包装器
const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App; 