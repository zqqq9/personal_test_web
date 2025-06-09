import fs from 'fs';
import path from 'path';

// Simple script to copy all important SPA files to dist
console.log('Starting Netlify push script...');

const distPath = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distPath)) {
  console.error('Error: dist directory does not exist!');
  process.exit(1);
}

// Important files for Netlify SPA routing
const filesToCopy = [
  { source: '_redirects', destination: 'dist/_redirects' },
  { source: '_headers', destination: 'dist/_headers' },
  { source: 'public/_redirects', destination: 'dist/_redirects' },
  { source: 'public/_headers', destination: 'dist/_headers' },
  { source: 'public/404.html', destination: 'dist/404.html' },
];

// Ensure each important file exists in dist
for (const file of filesToCopy) {
  try {
    if (fs.existsSync(file.source)) {
      const content = fs.readFileSync(file.source, 'utf8');
      fs.writeFileSync(file.destination, content);
      console.log(`Copied ${file.source} to ${file.destination}`);
    } else {
      console.log(`File ${file.source} not found, skipping...`);
    }
  } catch (error) {
    console.error(`Error copying ${file.source}:`, error);
  }
}

console.log('Ensuring _redirects file exists in dist folder');
// Write the _redirects file directly to dist with standard format
const redirectsPath = path.join(distPath, '_redirects');
const redirectsContent = '/* /index.html 200';

try {
  fs.writeFileSync(redirectsPath, redirectsContent);
  console.log('Created/updated _redirects file with content:', redirectsContent);
} catch (error) {
  console.error('Error creating _redirects file:', error);
}

// 也创建 netlify.toml 文件
const netlifyTomlPath = path.join(distPath, 'netlify.toml');
const netlifyTomlContent = `# SPA configuration
[build]
  publish = "dist"
  command = "npm run build:netlify"

# SPA redirect rule
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`;

try {
  fs.writeFileSync(netlifyTomlPath, netlifyTomlContent);
  console.log('Created netlify.toml file in dist folder');
} catch (error) {
  console.error('Error creating netlify.toml file:', error);
}

// Create a verification file to check deployment
const verificationPath = path.join(distPath, 'netlify-verification.json');
const verificationContent = JSON.stringify({
  timestamp: new Date().toISOString(),
  redirectsContent,
  redirectsPath,
  netlifyTomlPath
}, null, 2);

try {
  fs.writeFileSync(verificationPath, verificationContent);
  console.log('Created verification file at', verificationPath);
} catch (error) {
  console.error('Error creating verification file:', error);
}

console.log('Netlify push script completed successfully.'); 