import {Code} from 'kinu';

const snippet = `import {Button} from 'kinu';

export default () => <Button>Click me</Button>;`;

export function Demo() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <Code language="tsx">
        {snippet}
        <Code.Copy />
      </Code>
      <p>
        Install with <Code inline>npm i kinu</Code> and import what you need.
      </p>
    </div>
  );
}

export const code = `<Code language="tsx">
  {snippet}
  <Code.Copy />
</Code>

Install with <Code inline>npm i kinu</Code>.`;

export default {Demo, code};
