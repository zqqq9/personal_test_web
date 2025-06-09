import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    assetsDir: 'assets',
    sourcemap: true,
    minify: process.env.NODE_ENV === 'production',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        format: 'iife'
      }
    }
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
