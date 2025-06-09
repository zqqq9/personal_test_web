import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './i18n';
import './index.css';

// 调试信息
console.log("main.tsx 开始执行");

// Handle SPA routes in production
if (import.meta.env.PROD) {
  // Check if we need to handle path issues for Netlify
  const { pathname } = window.location;
  console.log("Current pathname:", pathname);
  
  // If we're on a non-root path, make sure assets can load
  if (pathname !== '/' && !document.querySelector('base')) {
    console.log("Adding base tag for path compatibility");
    const base = document.createElement('base');
    base.href = '/';
    document.head.prepend(base);
  }
}

// 全局错误处理
window.onerror = function(message, source, lineno, colno, error) {
  console.error('全局错误:', { message, source, lineno, colno, error });
  return false;
};

// 确保在Netlify环境下正确加载
try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('找不到root元素!');
  } else {
    console.log('找到root元素，尝试渲染应用');
    
    try {
      const root = ReactDOM.createRoot(rootElement);
      
      // 尝试渲染应用
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
      
      console.log('React应用渲染完成');
    } catch (error: unknown) {
      const renderError = error as Error;
      console.error('React渲染错误:', renderError);
      
      // 显示备用UI
      rootElement.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background: linear-gradient(to bottom right, #1a202c, #000000); color: white; text-align: center; padding: 20px;">
          <h1>React渲染错误</h1>
          <p>${renderError.message || '未知错误'}</p>
          <button onclick="window.location.reload()">刷新页面</button>
        </div>
      `;
    }
  }
} catch (error) {
  console.error('初始化错误:', error);
} 