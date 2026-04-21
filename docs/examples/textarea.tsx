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
      <Textarea autosize placeholder="Grows as you type..." />
      <Textarea placeholder="Disabled textarea" disabled />
    </div>
  );
}

export const code = `<Textarea placeholder="Enter your message..." />
<Textarea autosize placeholder="Grows as you type..." />`;

export default {Demo, code};
