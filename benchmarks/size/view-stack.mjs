/** Focused, reproducible ViewStack cost; no full library build required. */
import {build} from 'vite';
import {gzipSync} from 'node:zlib';
import {resolve} from 'node:path';

for (const bundled of [false, true]) {
  for (const scenario of ['factory', 'stack']) {
    const entry = scenario === 'stack'
      ? `export {ViewStack} from ${JSON.stringify(resolve('src/components/view-stack/index.tsx'))}`
      : `import {createSimpleComponent} from ${JSON.stringify(resolve('src/lib/create-simple-component.tsx'))};export const ViewStack=createSimpleComponent('view-stack','div')`;
    const result = await build({
      configFile: false,
      logLevel: 'silent',
      plugins: [{name: 'size-entry', resolveId: id => id === resolve('.view-stack-size-entry.ts') ? '\0entry' : null,
        load: id => id === '\0entry' ? entry : null}],
      build: {write: false, minify: 'esbuild', cssMinify: true, target: 'es2019',
        lib: {entry: resolve('.view-stack-size-entry.ts'), formats: ['es'], fileName: 'stack'},
        rollupOptions: {external: bundled ? [] : id => /^preact(?:\/|$)/.test(id)},
      },
    });
    const {output} = Array.isArray(result) ? result[0] : result;
    const sizes = {};
    for (const item of output) {
      const text = item.type === 'chunk' ? item.code : item.source;
      sizes[item.fileName.endsWith('.css') ? 'css' : 'js'] = {
        min: Buffer.byteLength(text), gzip: gzipSync(text, {level: 9}).length,
      };
    }
    console.log(JSON.stringify({bundled, scenario, ...sizes}));
  }
}
