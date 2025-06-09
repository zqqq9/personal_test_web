import fs from 'fs';
import path from 'path';

// Simple script to help debug Netlify builds
console.log('Starting Netlify build logging script...');

// Check if dist directory exists
const distPath = path.join(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  console.log('dist directory exists');
  
  // List files in dist directory
  const distFiles = fs.readdirSync(distPath);
  console.log('Files in dist directory:', distFiles);
  
  // Check for critical files
  const hasIndex = distFiles.includes('index.html');
  const hasRedirects = distFiles.includes('_redirects');
  const hasHeaders = distFiles.includes('_headers');
  
  console.log('index.html exists:', hasIndex);
  console.log('_redirects exists:', hasRedirects);
  console.log('_headers exists:', hasHeaders);
  
  // Check assets directory
  const assetsPath = path.join(distPath, 'assets');
  if (fs.existsSync(assetsPath)) {
    console.log('assets directory exists');
    const assetFiles = fs.readdirSync(assetsPath);
    console.log('Number of asset files:', assetFiles.length);
  } else {
    console.log('assets directory does not exist!');
  }
  
  // Write a build-info.json file to dist for debugging
  const buildInfo = {
    timestamp: new Date().toISOString(),
    distFiles,
    hasIndex,
    hasRedirects,
    hasHeaders,
    nodeVersion: process.version,
    platform: process.platform
  };
  
  fs.writeFileSync(
    path.join(distPath, 'build-info.json'),
    JSON.stringify(buildInfo, null, 2)
  );
  
  console.log('Build info written to build-info.json');
} else {
  console.log('dist directory does not exist!');
}

console.log('Netlify build logging script completed.'); 