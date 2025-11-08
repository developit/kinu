const t=`# Toast

The toast system lives in \`pui/lib/toast\`. It consists of two exports:

- \`ToastContainer\` — a component you render once near the root to host toast elements.
- \`toast.show(content, options)\` — a helper that dispatches a global event to display a toast.

\`\`\`tsx
import {ToastContainer, toast} from 'pui';

export function App() {
  return (
    <>
      <ToastContainer />
      <button onClick={() => toast.show('Settings saved')}>Save</button>
    </>
  );
}
\`\`\`

\`toast.show\` accepts an optional options object:

\`\`\`ts
toast.show('File uploaded', {
  title: 'Success',
  icon: '✅',
  action: <button onClick={undo}>Undo</button>,
  duration: 4000
});
\`\`\`

The container keeps at most three toasts visible at a time, staggers entrance animations, and removes items automatically after
the configured duration. Because the system runs entirely through DOM events, you can call \`toast.show\` from anywhere in your
application without prop drilling.

### Styling

Toast markup uses \`[p="toast" *]\` attributes. Override them in your app to change layout or colors:

\`\`\`css
[p="toast"] {
  background: hsl(var(--p-background));
  border: 1px solid hsl(var(--p-border));
}

[p="toast"][data-closing] {
  opacity: 0;
  transform: translateY(8px);
}
\`\`\`

Animations rely on the \`data-mounted\` and \`data-closing\` attributes, so keep those selectors intact when customising.
`;export{t as default};
//# sourceMappingURL=toast-DGP6FT-7.js.map
