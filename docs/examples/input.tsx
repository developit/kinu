import {Input} from 'pui';
import {useState} from 'preact/hooks';

export function Demo() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <Input
        placeholder="Enter your email"
        type="email"
        value={email}
        onInput={(e: Event) => setEmail((e.target as HTMLInputElement).value)}
      />
      <Input
        placeholder="Your name"
        value={name}
        onInput={(e: Event) => setName((e.target as HTMLInputElement).value)}
      />
      <Input placeholder="Small input" size={'sm' as any} />
      <Input placeholder="Large input" size={'lg' as any} />
      <Input placeholder="Disabled input" disabled />
    </div>
  );
}

export const code = `<Input placeholder="Enter your email" />`;

export default {Demo, code};
