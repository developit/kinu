import {
  Button,
  Card,
  Input,
  Badge,
  Alert,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  Separator,
  Tabs,
  TabList,
  Tab,
  TabPanel,
} from 'pui';
import { useState } from 'preact/hooks';
import { CodeBlock } from '../code-block';

export default function GettingStarted() {
  const [activeTab, setActiveTab] = useState<'install' | 'setup' | 'usage'>('install');

  return (
    <div class="getting-started">
      <NavigationMenu class="home-nav">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/getting-started">Getting Started</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/components">Components</NavigationMenuLink>
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

      <main class="getting-started-content">
        <header class="getting-started-header">
          <h1>Getting Started with PUI</h1>
          <p class="lead">
            Learn how to set up and use PUI components in your project. 
            Build beautiful, accessible interfaces with minimal effort.
          </p>
        </header>

        <section class="quick-start">
          <TabList>
            <Tab 
              aria-selected={activeTab === 'install'} 
              onClick={() => setActiveTab('install')}
            >
              Installation
            </Tab>
            <Tab 
              aria-selected={activeTab === 'setup'} 
              onClick={() => setActiveTab('setup')}
            >
              Setup
            </Tab>
            <Tab 
              aria-selected={activeTab === 'usage'} 
              onClick={() => setActiveTab('usage')}
            >
              Basic Usage
            </Tab>
          </TabList>

          {activeTab === 'install' && (
            <TabPanel>
              <Card>
                <h3>Install PUI</h3>
                <p>Add PUI to your project using your preferred package manager:</p>
                
                <h4>npm</h4>
                <CodeBlock code="npm install pui" />
                
                <h4>pnpm</h4>
                <CodeBlock code="pnpm add pui" />
                
                <h4>yarn</h4>
                <CodeBlock code="yarn add pui" />

                <Alert>
                  <strong>Prerequisites:</strong> PUI requires Preact 10.5.0 or higher.
                </Alert>
              </Card>
            </TabPanel>
          )}

          {activeTab === 'setup' && (
            <TabPanel>
              <Card>
                <h3>Project Setup</h3>
                <p>After installation, import the base styles and start using components:</p>

                <h4>Import Base Styles</h4>
                <p>Add the base CSS file to your main entry point:</p>
                <CodeBlock code={`// In your main.tsx or index.tsx
import 'pui/base.css';`} />

                <h4>Import Components</h4>
                <p>Import individual components as needed:</p>
                <CodeBlock code={`import { Button, Card, Input } from 'pui';`} />

                <h4>TypeScript Support</h4>
                <p>PUI comes with built-in TypeScript definitions. No additional setup required!</p>

                <Alert variant="default">
                  <strong>CSS Variables:</strong> PUI uses CSS custom properties for theming. 
                  You can customize the design tokens by overriding these variables.
                </Alert>
              </Card>
            </TabPanel>
          )}

          {activeTab === 'usage' && (
            <TabPanel>
              <Card>
                <h3>Your First Component</h3>
                <p>Here's a simple example to get you started:</p>

                <CodeBlock code={`import { Button, Card, Input } from 'pui';
import { useState } from 'preact/hooks';

function MyApp() {
  const [name, setName] = useState('');

  return (
    <Card>
      <h2>Welcome to PUI</h2>
      <Input 
        placeholder="Enter your name"
        value={name}
        onInput={(e) => setName(e.target.value)}
      />
      <Button onClick={() => alert(\`Hello, \${name}!\`)}>
        Greet Me
      </Button>
    </Card>
  );
}`} />

                <div class="example-demo">
                  <h4>Live Example:</h4>
                  <DemoExample />
                </div>
              </Card>
            </TabPanel>
          )}
        </section>

        <Separator />

        <section class="features-overview">
          <h2>What's Included</h2>
          <p>PUI provides a comprehensive set of accessible components:</p>
          
          <div class="features-grid">
            <Card>
              <h3>Form Components</h3>
              <p>Input, Button, Checkbox, Radio, Select, Textarea, and more</p>
              <Badge variant="secondary">15+ Components</Badge>
            </Card>
            
            <Card>
              <h3>Layout & Navigation</h3>
              <p>Tabs, Accordion, Sidebar, NavigationMenu, Breadcrumb</p>
              <Badge variant="secondary">8+ Components</Badge>
            </Card>
            
            <Card>
              <h3>Feedback & Overlays</h3>
              <p>Toast, Dialog, AlertDialog, Popover, Tooltip</p>
              <Badge variant="secondary">12+ Components</Badge>
            </Card>
            
            <Card>
              <h3>Data Display</h3>
              <p>Table, Card, Avatar, Badge, Progress, Skeleton</p>
              <Badge variant="secondary">10+ Components</Badge>
            </Card>
          </div>
        </section>

        <Separator />

        <section class="design-principles">
          <h2>Design Principles</h2>
          <div class="principles-grid">
            <Card>
              <h3>🎯 Accessibility First</h3>
              <p>Built with semantic HTML and ARIA attributes. Screen reader friendly and keyboard navigable.</p>
            </Card>
            
            <Card>
              <h3>⚡ Performance Focused</h3>
              <p>Lightweight components with minimal runtime overhead. Tree-shakable for optimal bundle sizes.</p>
            </Card>
            
            <Card>
              <h3>🎨 Customizable</h3>
              <p>CSS custom properties allow easy theming. Override styles without fighting specificity.</p>
            </Card>
            
            <Card>
              <h3>🔧 Developer Experience</h3>
              <p>TypeScript support, clear documentation, and intuitive APIs make development smooth.</p>
            </Card>
          </div>
        </section>

        <Separator />

        <section class="next-steps">
          <h2>Next Steps</h2>
          <p>Now that you're set up, explore what PUI has to offer:</p>
          
          <div class="next-steps-actions">
            <Button href="/components" variant="default">
              Browse All Components →
            </Button>
            <Button href="/linear" variant="secondary">
              View Linear Demo →
            </Button>
            <Button href="/chat" variant="secondary">
              View Chat Demo →
            </Button>
          </div>

          <div class="resources">
            <h3>Helpful Resources</h3>
            <ul>
              <li><strong>Component Examples:</strong> See all components in action on the <a href="/components">Components page</a></li>
              <li><strong>Real-world Demos:</strong> Check out our <a href="/linear">Linear</a> and <a href="/chat">Chat</a> demos</li>
              <li><strong>Complete API Reference:</strong> View comprehensive component documentation in our <a href="/llms.txt">llms.txt reference</a> - perfect for LLMs and developers</li>
              <li><strong>GitHub Repository:</strong> Contribute and report issues on <a href="https://github.com/">GitHub</a></li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

function DemoExample() {
  const [name, setName] = useState('');

  return (
    <Card style={{ marginTop: '1rem', padding: '1rem' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Welcome to PUI</h3>
      <Input 
        placeholder="Enter your name"
        value={name}
        onInput={(e) => setName((e.target as HTMLInputElement).value)}
        style={{ marginBottom: '1rem' }}
      />
      <Button onClick={() => alert(`Hello, ${name}!`)}>
        Greet Me
      </Button>
    </Card>
  );
}