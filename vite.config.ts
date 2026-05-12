import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// DEPLOY_TARGET=pages のときだけ GitHub Pages 用の base path に切り替える
// Electron build (npm run electron:build:mac) / dev は従来通り './'
const isPages = process.env.DEPLOY_TARGET === 'pages';

export default defineConfig({
  plugins: [react()],
  base: isPages ? '/yo-say-caffe/' : './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
