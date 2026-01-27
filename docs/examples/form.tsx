import {Button, toast} from 'pui';
import {useState} from 'preact/hooks';

function logText(e: MouseEvent | string) {
  const text =
    e instanceof Event ? (e.currentTarget as HTMLElement).textContent! : e;
  const title = e instanceof Event ? 'Selected item:' : 'Value:';
  toast.show(text, {title});
}

export function Demo() {
  const [email, _setEmail] = useState('');
  const [name, _setName] = useState('');
  return (
    <div>
      <p>
        Current values: {email && `Email: ${email}`} {name && `Name: ${name}`}
      </p>
      <Button
        onClick={() => {
          console.log('Form data:', {email, name});
          logText(`Email: ${email}\nName: ${name}`);
        }}
      >
        Submit Form
      </Button>
    </div>
  );
}

export const code = `<Button onClick={submit}>Submit Form</Button>`;

export default {Demo, code};
