/** Focused size check: library cost and marginal cost in a real Preact app.
 * Run with --ref=<commit> to measure that revision without changing worktrees.
 */
import {build} from 'vite';
import {gzipSync} from 'node:zlib';
import {resolve, relative} from 'node:path';
import {execFileSync} from 'node:child_process';

const ref = process.argv.find(arg => arg.startsWith('--ref='))?.slice(6);
const file = name => JSON.stringify(resolve(name));
const platform = `import {createSimpleComponent} from ${file('src/lib/create-simple-component.tsx')};
import ${file('src/lib/forwardref.ts')};
import {installCommands} from ${file('src/lib/commands.ts')};
const Probe=createSimpleComponent('probe','div',{},()=>{installCommands()});`;

for (const app of [false, true]) {
  for (const scenario of ['factory', 'stack']) {
    const stack = `import {ViewStack} from ${file('src/components/view-stack/index.tsx')};`;
    const entry = app
      ? `import {h,render} from 'preact';${platform}${scenario === 'stack' ? stack : ''}
render(h('main',null,h(Probe),${scenario === 'stack' ? `h(ViewStack,null,h(ViewStack.View,null,'Home'),h(ViewStack.View,null,()=>h('p',null,'Detail')))` : 'null'}),document.body);`
      : scenario === 'stack' ? `${stack}export {ViewStack}`
        : `import {createSimpleComponent} from ${file('src/lib/create-simple-component.tsx')};export const ViewStack=createSimpleComponent('view-stack','div')`;
    const result = await build({
      configFile: false,
      logLevel: 'silent',
      plugins: [{name: 'size-entry', enforce: 'pre',
        resolveId: id => id === resolve('.view-stack-size-entry.ts') ? '\0entry' : null,
        load(id) {
          if (id === '\0entry') return entry;
          const path = relative(process.cwd(), id).replaceAll('\\', '/');
          if (ref && ['src/components/view-stack/index.tsx', 'src/lib/create-simple-component.tsx'].includes(path)) {
            return execFileSync('git', ['show', `${ref}:${path}`], {encoding: 'utf8'});
          }
        },
      }],
      build: {write: false, minify: 'esbuild', cssMinify: true, target: 'es2019',
        lib: {entry: resolve('.view-stack-size-entry.ts'), formats: ['es'], fileName: 'stack'},
        rollupOptions: {external: app ? [] : id => /^preact(?:\/|$)/.test(id)},
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
    console.log(JSON.stringify({app, scenario, ...sizes}));
  }
}
