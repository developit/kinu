import {OTPInput} from 'kinu';
import {useState} from 'preact/hooks';

export function Demo() {
  const [code, setCode] = useState('');
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '20rem'}}>
      <OTPInput
        maxLength={6}
        value={code}
        onInput={(e: Event) =>
          setCode((e.target as HTMLInputElement).value.replace(/\D/g, ''))
        }
        aria-label="Verification code"
      />
      <p style={{color: 'hsl(var(--k-muted-foreground))', margin: 0}}>
        Entered: <code>{code || '—'}</code>
      </p>
    </div>
  );
}

export const code = `<OTPInput maxLength={6} />`;

export default {Demo, code};
