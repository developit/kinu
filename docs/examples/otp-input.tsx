import {OTPInput} from 'kinu';
import {useState} from 'preact/hooks';

export function Demo() {
  const [code, setCode] = useState('');
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <OTPInput
        maxLength={6}
        pattern="\d{6}"
        style={{'--k-otp-len': 6} as any}
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

export const code = `<OTPInput maxLength={6} style={{'--k-otp-len': 6}} />`;

export default {Demo, code};
