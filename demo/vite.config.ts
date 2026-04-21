import {defineConfig, defaultClientConditions} from 'vite';
import preact from '@preact/preset-vite';
import {resolve} from 'node:path';

export default defineConfig({
  plugins: [
    preact({
      prerender: {
        enabled: true,
        renderTarget: '#app',
        previewMiddlewareEnabled: true,
      },
    }),
  ],
  // Use the repository name for asset paths when deployed to GitHub Pages
  //base: '/kinu/',
  build: {
    modulePreload: false,
    cssCodeSplit: false,
    sourcemap: true,
  },
  resolve: {
    alias: {
      kinu: resolve(__dirname, '..'),
      'kinu-docs': resolve(__dirname, '../docs'),
    },
    conditions: ['source', ...defaultClientConditions],
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
});
