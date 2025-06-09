# Personality Testing Website

A beautiful and interactive personality testing website built with React, Vite, and TypeScript.

## Deployment Guide for Netlify

### Important Configuration for Netlify

1. **Base Directory**: Set the base directory to `project` in Netlify's deploy settings.
2. **Build Command**: `npm run build`
3. **Publish Directory**: `dist`

### Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

### Building for Production

```
npm run build
```

### Troubleshooting Netlify Deployment

If your site isn't loading properly on Netlify, check the following:

1. **Redirects File**: Make sure `_redirects` is correctly copied to the `dist` folder with the content:
   ```
   /* /index.html 200
   ```

2. **Netlify.toml**: Ensure your netlify.toml has the correct configuration:
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
     force = true
   ```

3. **Path References**: Ensure all asset paths in your code use absolute paths (starting with `/`) rather than relative paths (`./`).

4. **Build Settings in Netlify UI**: 
   - Navigate to Site settings > Build & deploy > Continuous deployment
   - Verify that the publish directory is set to `dist`
   - Check that the base directory is set to `project`

5. **Clear Cache and Redeploy**: 
   - In Netlify Dashboard, go to Deploys
   - Click "Trigger deploy" dropdown
   - Select "Clear cache and deploy site"

## Features

- Interactive personality tests
- Beautiful UI with modern design
- Responsive layout for all devices
- PDF report generation

## Technology Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- HTML2Canvas & jsPDF for PDF generation 