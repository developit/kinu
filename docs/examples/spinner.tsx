import {Button, Spinner, Toggle, ToggleGroup} from 'kinu';
import {useState} from 'preact/hooks';

const types = [
  'default',
  'circle',
  'light',
  'dots',
  'ripple',
  'radar',
  'turn',
  'concentric',
  'bubble',
  'fold',
] as const;

const variants = [null, 'primary', 'secondary', 'destructive'] as const;

export function Demo() {
  const [variant, setVariant] = useState<(typeof variants)[number]>(null);

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
        <ToggleGroup>
          {variants.map((v) => (
            <Toggle pressed={variant == v} onClick={() => setVariant(v)}>
              {v || 'default'}
            </Toggle>
          ))}
        </ToggleGroup>
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
              border: '1px solid hsl(var(--k-border))',
              borderRadius: 'var(--k-radius)',
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
