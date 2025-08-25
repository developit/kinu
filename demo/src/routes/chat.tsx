import {
  Avatar,
  Button,
  Input,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from 'pui';
import {useState} from 'preact/hooks';

type Message = {
  id: number;
  author: 'Sofia Davis' | 'You';
  text: string;
  timestamp: Date;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      author: 'Sofia Davis',
      text: 'Hi, how can I help you today?',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    },
    {
      id: 2,
      author: 'You',
      text: 'Hey, I\'m having trouble with my account.',
      timestamp: new Date(Date.now() - 240000), // 4 minutes ago
    },
    {
      id: 3,
      author: 'Sofia Davis',
      text: 'What seems to be the problem?',
      timestamp: new Date(Date.now() - 180000), // 3 minutes ago
    },
    {
      id: 4,
      author: 'You',
      text: 'I can\'t log in.',
      timestamp: new Date(Date.now() - 120000), // 2 minutes ago
    },
  ]);
  const [input, setInput] = useState('');

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    
    const newMessage: Message = {
      id: Date.now(),
      author: 'You',
      text,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    setInput('');
    
    // Simulate Sofia's response after a short delay
    setTimeout(() => {
      const sofiaResponse: Message = {
        id: Date.now(),
        author: 'Sofia Davis',
        text: 'I understand. Let me help you with that. Can you tell me what error message you\'re seeing?',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, sofiaResponse]);
    }, 1000);
  }

  function handleKeyPress(e: any) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div class="chat-page">
      {/* Global Header */}
      <NavigationMenu class="demo-header home-nav">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/components">
              Components
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/linear">Linear Demo</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/chat">Chat Demo</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/player">Music Demo</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Chat Interface */}
      <div class="chat-container">
        <div class="chat-window">
          {/* Chat Header */}
          <div class="chat-header">
            <div class="chat-contact">
              <Avatar class="chat-avatar" fallback="SD" />
              <div class="contact-info">
                <h3 class="contact-name">Sofia Davis</h3>
                <p class="contact-email">m@example.com</p>
              </div>
            </div>
            <Button class="chat-attachment-btn" variant="outline" size="sm">
              <span class="attachment-icon">+</span>
            </Button>
          </div>

          {/* Chat Messages */}
          <div class="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                class={`chat-message ${message.author === 'You' ? 'outgoing' : 'incoming'}`}
              >
                <div class="message-bubble">
                  <p class="message-text">{message.text}</p>
                  <span class="message-time">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div class="chat-input-container">
            <Input
              class="chat-input"
              value={input}
              onInput={(e) => setInput((e.currentTarget as HTMLInputElement).value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
            />
            <Button
              class="chat-send-btn"
              onClick={sendMessage}
              disabled={!input.trim()}
              size="sm"
            >
              <span class="send-icon">↑</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
