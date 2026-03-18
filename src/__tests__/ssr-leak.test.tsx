import {describe, expect, it} from 'vitest';
import {useId} from 'preact/hooks';
import renderToString from 'preact-render-to-string';

function Comp() {
  const id = useId();
  return <div id={id}>test</div>;
}

describe('SSR useId counter', () => {
  it('does not leak between renderToString calls', () => {
    const html1 = renderToString(
      <div>
        <Comp />
        <Comp />
      </div>,
    );
    const ids1 = html1.match(/id="[^"]+"/g);

    const html2 = renderToString(
      <div>
        <Comp />
        <Comp />
      </div>,
    );
    const ids2 = html2.match(/id="[^"]+"/g);

    // Each renderToString call should start from P0-0
    expect(ids1).toEqual(['id="P0-0"', 'id="P0-1"']);
    expect(ids2).toEqual(['id="P0-0"', 'id="P0-1"']);
  });
});
