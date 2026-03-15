import {Label, Textarea} from 'kinu';
import {useState} from 'preact/hooks';

export function Demo() {
  const [message, setMessage] = useState('');
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <Label htmlFor="message">Message</Label>
      <Textarea
        id="message"
        placeholder="Enter your message..."
        value={message}
        onInput={(e: Event) =>
          setMessage((e.target as HTMLTextAreaElement).value)
        }
      />
      <Textarea placeholder="Disabled textarea" disabled />
    </div>
  );
}

export const code = `<Textarea placeholder="Enter your message..." />`;

export default {Demo, code};
