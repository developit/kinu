/** Focused size check: library cost and marginal cost in a real Preact app.
 * Run with --ref=<commit> to measure that revision without changing worktrees.
 */
import {build, transformWithEsbuild} from 'vite';
import {gzipSync} from 'node:zlib';
import {resolve, relative} from 'node:path';
import {execFileSync} from 'node:child_process';

const ref = process.argv.find(arg => arg.startsWith('--ref='))?.slice(6);
const file = name => JSON.stringify(resolve(name));
const platform = `import {createSimpleComponent} from ${file('src/lib/create-simple-component.tsx')};
import ${file('src/lib/forwardref.ts')};
import {installCommands} from ${file('src/lib/commands.ts')};
const Probe=createSimpleComponent('probe','div',{},()=>{installCommands()});`;

for (const app of [false, true, 'hooks', 'jsx']) {
  for (const scenario of ['factory', 'unused', 'stack']) {
    const stack = `import {ViewStack as ${scenario === 'unused' ? 'Unused' : 'ViewStack'}} from ${file('src/components/view-stack/index.tsx')};`;
    const jsx = app === 'jsx';
    const hooks = app === 'hooks' || jsx;
    const body = jsx
      ? `jsxs('main',{onClick:()=>setCount(count+1),children:[jsx(Probe,{}),${scenario === 'stack' ? `jsxs(ViewStack,{children:[jsx(ViewStack.View,{children:'Home'}),jsx(ViewStack.View,{children:()=>jsx('p',{children:'Detail'})})]})` : 'null'}]})`
      : `h('main',${hooks ? '{onClick:()=>setCount(count+1)}' : 'null'},h(Probe),${scenario === 'stack' ? `h(ViewStack,null,h(ViewStack.View,null,'Home'),h(ViewStack.View,null,()=>h('p',null,'Detail')))` : 'null'})`;
    const entry = app
      ? `import {h,render} from 'preact';${jsx ? `import {jsx,jsxs} from 'preact/jsx-runtime';` : ''}${platform}${scenario !== 'factory' ? stack : ''}
${hooks ? `import {useState,useEffect} from 'preact/hooks';function App(){const [count,setCount]=useState(0);useEffect(()=>{document.title=String(count)},[count]);return ${body}}render(${jsx ? 'jsx(App,{})' : 'h(App)'},document.body);` : `render(${body},document.body);`}`
      : scenario === 'stack' ? `${stack}export {ViewStack}`
        : `${scenario === 'unused' ? stack : ''}import {createSimpleComponent} from ${file('src/lib/create-simple-component.tsx')};export const ViewStack=createSimpleComponent('view-stack','div')`;
    const result = await build({
      configFile: false,
      logLevel: 'silent',
      plugins: [{name: 'size-entry', enforce: 'pre',
        resolveId: id => id === resolve('.view-stack-size-entry.ts') ? '\0entry' : null,
        load(id) {
          if (id === '\0entry') return entry;
          const path = relative(process.cwd(), id).replaceAll('\\', '/');
          if (ref && path.startsWith('src/')) {
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
      // Vite preserves whitespace/PURE comments in ES library output. Measure
      // the final consumer minification too, rather than calling that minified.
      const text = item.type === 'chunk'
        ? (await transformWithEsbuild(item.code, 'size.js', {minify: true, legalComments: 'none', target: 'es2019'})).code
        : item.source;
      sizes[item.fileName.endsWith('.css') ? 'css' : 'js'] = {
        min: Buffer.byteLength(text), gzip: gzipSync(text, {level: 9}).length,
        ...(item.type === 'chunk' ? {library_gzip: gzipSync(item.code, {level: 9}).length} : {}),
      };
    }
    console.log(JSON.stringify({app, scenario, ...sizes}));
  }
}
