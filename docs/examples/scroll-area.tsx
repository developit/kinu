import {ScrollArea} from 'kinu';

export function Demo() {
  return (
    <ScrollArea
      style={{
        height: '100px',
        border: '1px solid hsl(var(--p-border))',
        padding: '0.5rem',
      }}
    >
      <p>Scrollable content</p>
      <p>Line 2</p>
      <p>Line 3</p>
      <p>Line 4</p>
      <p>Line 5</p>
      <p>Line 6</p>
    </ScrollArea>
  );
}

export const code = `<ScrollArea style={{height:100}}>...</ScrollArea>`;

export default {Demo, code};
