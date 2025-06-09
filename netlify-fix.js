import fs from 'fs';
import path from 'path';

console.log('运行 Netlify 部署后修复脚本...');

// 确保 dist 目录存在
const distPath = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distPath)) {
  console.error('错误: dist 目录不存在。请先运行构建命令。');
  process.exit(1);
}

// 创建或更新 _headers 文件
const headersContent = `/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer-when-downgrade

/*.js
  Content-Type: application/javascript; charset=utf-8

/assets/*.js
  Content-Type: application/javascript; charset=utf-8

/*.mjs
  Content-Type: application/javascript; charset=utf-8

/assets/*.mjs
  Content-Type: application/javascript; charset=utf-8

/*.js.map
  Content-Type: application/json; charset=utf-8

/assets/*.js.map
  Content-Type: application/json; charset=utf-8

/*.css
  Content-Type: text/css; charset=utf-8

/assets/*.css
  Content-Type: text/css; charset=utf-8
`;

fs.writeFileSync(path.join(distPath, '_headers'), headersContent);
console.log('已在 dist 目录中创建或更新 _headers 文件');

// 创建或更新 netlify.toml 文件
const netlifyConfig = `# SPA configuration
[build]
  publish = "dist"

# SPA redirect rule - critical for routing to work properly
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = true

# Headers for caching and security
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "no-referrer-when-downgrade"

# JavaScript module MIME types - 非常重要
[[headers]]
  for = "/*.js"
  [headers.values]
    Content-Type = "application/javascript; charset=utf-8"

[[headers]]
  for = "/assets/*.js"
  [headers.values]
    Content-Type = "application/javascript; charset=utf-8"

[[headers]]
  for = "/*.mjs"
  [headers.values]
    Content-Type = "application/javascript; charset=utf-8"

[[headers]]
  for = "/assets/*.mjs"
  [headers.values]
    Content-Type = "application/javascript; charset=utf-8"

[[headers]]
  for = "/*.js.map"
  [headers.values]
    Content-Type = "application/json; charset=utf-8"

[[headers]]
  for = "/assets/*.js.map"
  [headers.values]
    Content-Type = "application/json; charset=utf-8"
`;

fs.writeFileSync(path.join(distPath, 'netlify.toml'), netlifyConfig);
console.log('已在 dist 目录中创建或更新 netlify.toml 文件');

// 确保 _redirects 文件存在
const redirectsPath = path.join(distPath, '_redirects');
if (!fs.existsSync(redirectsPath) || fs.readFileSync(redirectsPath, 'utf8').trim() === '') {
  fs.writeFileSync(redirectsPath, '/* /index.html 200');
  console.log('已在 dist 目录中创建 _redirects 文件');
}

console.log('Netlify 修复脚本完成!'); 