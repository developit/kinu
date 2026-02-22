import {Button, Spinner} from 'pui';
import {useState} from 'preact/hooks';

const types = [
  'default',
  'turn',
  'concentric',
  'ripple',
  'light',
  'radar',
  'bubble',
  'fold',
  'circle',
  'dots',
] as const;

const variants = ['primary', 'secondary', 'destructive'] as const;

export function Demo() {
  const [variant, setVariant] = useState<(typeof variants)[number]>('primary');

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

      <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap'}}>
        <strong style={{fontSize: '0.8rem'}}>Variant:</strong>
        {variants.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setVariant(v)}
            style={{
              fontSize: '0.75rem',
              padding: '0.25rem 0.5rem',
              borderRadius: '999px',
              border: '1px solid hsl(var(--p-border))',
              background: variant === v ? 'hsl(var(--p-accent))' : 'transparent',
            }}
          >
            {v}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(7rem, 1fr))',
          gap: '0.75rem',
        }}
      >
        {types.map((type) => (
          <div
            key={type}
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
            {type === 'default' ? (
              <Spinner variant={variant} aria-label="default loading" />
            ) : (
              <Spinner type={type} variant={variant} aria-label={`${type} loading`} />
            )}
            {type === 'default' ? (
              <span style={{fontSize: '0.75rem'}}>default</span>
            ) : (
              <code style={{fontSize: '0.75rem'}}>{type}</code>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export const code = `<Spinner type="turn" variant="primary" aria-label="Loading" />`;

export default {Demo, code};
