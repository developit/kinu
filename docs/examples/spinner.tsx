import {Button, Spinner} from 'pui';

export function Demo() {
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap'}}>
      <Spinner aria-label="Loading" />
      <Spinner size={'sm' as any} aria-label="Loading small" />
      <Spinner size={'lg' as any} aria-label="Loading large" />
      <Button loading>
        <Spinner size={'sm' as any} aria-hidden="true" style={{marginInlineEnd: '0.5rem'}} />
        Saving
      </Button>
    </div>
  );
}

export const code = `<Spinner aria-label="Loading" />`;

export default {Demo, code};
