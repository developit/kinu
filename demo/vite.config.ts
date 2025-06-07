import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [preact()],
  // Use the repository name for asset paths when deployed to GitHub Pages
  base: '/pui/',
  resolve: {
    alias: {
      '@pui': resolve(__dirname, '../src'),
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
})
