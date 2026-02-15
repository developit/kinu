import {Button, Spinner} from 'pui';

export function Demo() {
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap'}}>
      <Spinner aria-label="Loading" />
      <Spinner size={'sm' as any} aria-label="Loading small" />
      <Spinner size={'lg' as any} aria-label="Loading large" />
      <Button loading>
        <Spinner size={'sm' as any} aria-hidden="true" />
        Saving
      </Button>
    </div>
  );
}

export const code = `<Spinner aria-label="Loading" />`;

export default {Demo, code};
