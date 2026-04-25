import {ProgressRing, Toggle, ToggleGroup} from 'kinu';
import {useEffect, useState} from 'preact/hooks';

const variants = [null, 'primary', 'secondary', 'destructive'] as const;

export function Demo() {
  const [variant, setVariant] = useState<(typeof variants)[number]>(null);
  const [progress, setProgress] = useState(10);
  useEffect(() => {
    setTimeout(setProgress, 500, 50);
    setTimeout(setProgress, 1000, 90);
  }, []);

  return (
    <div style={{display: 'grid', gap: '1rem'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
        <ProgressRing value={progress} max={100} variant={variant} />
        <ProgressRing value={75} max={100} size="lg" variant={variant} />
        <ProgressRing size="sm" variant={variant} />
      </div>

      <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap'}}>
        <strong style={{fontSize: '0.8rem'}}>Variant:</strong>
        <ToggleGroup>
          {variants.map((v) => (
            <Toggle pressed={variant === v} onClick={() => setVariant(v)}>
              {v || 'default'}
            </Toggle>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
}

export const code = `<ProgressRing value={60} max={100} variant="primary" />`;

export default {Demo, code};
