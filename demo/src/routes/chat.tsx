import {Avatar, Button, Card, Input, ScrollArea} from 'pui';
import {useState} from 'preact/hooks';

type Message = {id: number; author: string; text: string};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {id: 1, author: 'Alice', text: 'Hey there!'},
    {id: 2, author: 'Bob', text: 'Welcome to the PUI chat demo.'},
  ]);
  const [input, setInput] = useState('');

  function send() {
    const text = input.trim();
    if (!text) return;
    setMessages([...messages, {id: messages.length + 1, author: 'You', text}]);
    setInput('');
  }

  return (
    <div class="chat-app">
      <Card class="chat-window">
        <ScrollArea class="chat-messages">
          <ul>
            {messages.map((m) => (
              <li key={m.id} class="chat-message">
                <Avatar class="chat-avatar" fallback={m.author[0]} />
                <div class="chat-content">
                  <span class="chat-author">{m.author}</span>
                  <p>{m.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
        <form
          class="chat-form"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <Input
            value={input}
            onInput={(e) => setInput((e.currentTarget as HTMLInputElement).value)}
            placeholder="Type a message"
          />
          <Button type="submit">Send</Button>
        </form>
      </Card>
    </div>
  );
}
