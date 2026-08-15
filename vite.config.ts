import {defineConfig, transformWithEsbuild, type Plugin} from 'vite';
import {readdirSync, readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import pkg from './package.json';

const THEMES_DIR = resolve(__dirname, 'src/themes');

/**
 * Themes are standalone stylesheets — nothing in `src/index.ts` imports them,
 * so the library build never sees them and they'd be missing from `dist`.
 * Emit each `src/themes/*.css` as its own asset (minified, like index.css) so
 * consumers can `import "kinu/themes/claw.css"` alongside the base stylesheet.
 * Picking up the directory listing means a new theme ships by existing.
 */
function themes(): Plugin {
  return {
    name: 'kinu:themes',
    async generateBundle() {
      const files = readdirSync(THEMES_DIR).filter((f) => f.endsWith('.css'));
      for (const file of files) {
        const css = readFileSync(resolve(THEMES_DIR, file), 'utf8');
        const {code} = await transformWithEsbuild(css, file, {minify: true});
        this.emitFile({
          type: 'asset',
          fileName: `themes/${file}`,
          source: code,
        });
      }
    },
  };
}

export default defineConfig({
  plugins: [themes()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'kinu',
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
