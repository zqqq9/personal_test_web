/**
 * 这个脚本在构建后运行，用于准备Netlify部署
 * 它会执行一些后处理步骤，确保网站在Netlify上正确部署
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

console.log('开始准备Netlify部署...');

// 确保_redirects文件存在
const redirectsContent = `
# SPA应用需要所有路由指向index.html
/*    /index.html   200

# 备用重定向，以防资源找不到
/assets/*  /index.html  404
`;

fs.writeFileSync(path.join(distDir, '_redirects'), redirectsContent.trim());
console.log('_redirects文件已更新');

// 更新_headers文件以允许跨域访问资源
const headersContent = `
# 所有路径的通用头信息
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer-when-downgrade

# 静态资源缓存设置
/assets/*
  Cache-Control: public, max-age=31536000, immutable
  Access-Control-Allow-Origin: *
`;

fs.writeFileSync(path.join(distDir, '_headers'), headersContent.trim());
console.log('_headers文件已更新');

// 创建特殊的404页面，它会尝试重定向到正确的SPA路由
const notFoundContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found</title>
  <script>
    // 尝试重定向到根路径
    window.location.href = "/";
  </script>
  <style>
    body {
      font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background: linear-gradient(to bottom right, #1a202c, #000000);
      color: white;
      text-align: center;
    }
    .container {
      max-width: 500px;
      padding: 2rem;
    }
    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    p {
      margin-bottom: 2rem;
    }
    button {
      background-color: #4a90e2;
      border: none;
      color: white;
      padding: 10px 20px;
      font-size: 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>页面未找到</h1>
    <p>我们正在尝试重定向到首页。如果没有自动跳转，请点击下面的按钮。</p>
    <button onclick="window.location.href='/'">返回首页</button>
  </div>
</body>
</html>
`;

fs.writeFileSync(path.join(distDir, '404.html'), notFoundContent.trim());
console.log('404.html文件已更新');

// 分析index.html文件中的资源引用，确保使用相对路径
try {
  const indexPath = path.join(distDir, 'index.html');
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // 检查并替换资源路径
  let updatedContent = indexContent
    // 替换绝对路径的资源引用为相对路径
    .replace(/src="\//g, 'src="./')
    .replace(/href="\//g, 'href="./')
    // 确保相对路径的链接正确（避免重复的./）
    .replace(/src="\.\/\.\/assets/g, 'src="./assets')
    .replace(/href="\.\/\.\/assets/g, 'href="./assets');
  
  // 只有在内容有变化时才写回文件
  if (updatedContent !== indexContent) {
    fs.writeFileSync(indexPath, updatedContent);
    console.log('index.html中的资源路径已更新为相对路径');
  } else {
    console.log('index.html中的资源路径已经是相对路径，无需更改');
  }
} catch (error) {
  console.error('处理index.html时出错:', error);
}

console.log('Netlify部署准备完成！'); 