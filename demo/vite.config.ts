import {defineConfig, defaultClientConditions} from 'vite';
import preact from '@preact/preset-vite';
import {resolve} from 'node:path';

export default defineConfig({
  plugins: [preact()],
  // Use the repository name for asset paths when deployed to GitHub Pages
  //base: '/pui/',
  build: {
    modulePreload: false,
    sourcemap: true,
  },
  resolve: {
    alias: {
      pui: resolve(__dirname, '..'),
      'pui-docs': resolve(__dirname, '../docs'),
      '@preact/signals': resolve(__dirname, 'node_modules/@preact/signals'),
      '@preact/signals-core': resolve(__dirname, 'node_modules/@preact/signals-core'),
    },
    conditions: ['source', ...defaultClientConditions],
  },
  optimizeDeps: {
    include: ['@preact/signals', '@preact/signals-core'],
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
});
