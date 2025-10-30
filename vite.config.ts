import {defineConfig} from 'vite';
import {resolve} from 'node:path';
import dts from 'vite-plugin-dts';
import pkg from './package.json';

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: './tsconfig.build.json',
      rollupTypes: false,
      exclude: ['src/__tests__/**', '**/*.test.ts', '**/*.test.tsx', 'demo/**'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ui-toolkit',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external(id, importer) {
        const pfx = id.match(/^(@?[^/]+)?[^/]+/g)?.[0];
        return (
          pfx &&
          (pfx in pkg.peerDependencies ||
            ('dependencies' in pkg && pfx in pkg.dependencies))
        );
      },
    },
  },
});
