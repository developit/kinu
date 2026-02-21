import {Button, Spinner} from 'pui';

const variants = [
  'turn',
  'concentric',
  'concentric2',
  'ripple',
  'light',
  'ghost',
  'radar',
  'bubble',
  'fold',
  'thinking',
] as const;

export function Demo() {
  return (
    <div style={{display: 'grid', gap: '1rem'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap'}}>
        <Spinner aria-label="Loading" />
        <Spinner size="sm" aria-label="Loading small" />
        <Spinner size="lg" aria-label="Loading large" />
        <Button loading>
          <Spinner size="sm" aria-hidden="true" />
          Saving
        </Button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(7rem, 1fr))',
          gap: '0.75rem',
        }}
      >
        {variants.map((variant) => (
          <div
            key={variant}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem 0.5rem',
              border: '1px solid hsl(var(--p-border))',
              borderRadius: 'var(--p-radius)',
            }}
          >
            <Spinner variant={variant} aria-label={`${variant} loading`} />
            <code style={{fontSize: '0.75rem'}}>{variant}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

export const code = `<Spinner variant="turn" aria-label="Loading" />`;

export default {Demo, code};
