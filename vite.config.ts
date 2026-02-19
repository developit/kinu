import {defineConfig} from 'vite';
import {resolve} from 'node:path';
import pkg from './package.json';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'pui',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external(id, importer) {
        const pfx = id.match(/^(@?[^/]+)?[^/]+/g)?.[0];
        if (!pfx) return false;
        return (
          (pfx in pkg.peerDependencies ||
            ('dependencies' in pkg && pfx in pkg.dependencies))
        );
      },
    },
  },
});
