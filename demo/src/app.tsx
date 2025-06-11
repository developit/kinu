import {
  Badge,
  Button,
  Card,
  Input,
  Dialog,
  Tooltip,
  Progress,
  Skeleton,
  Switch,
} from 'pui';
import {useState} from 'preact/hooks';

export function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [enabled, setEnabled] = useState(false);

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'system-ui, sans-serif',
        background: 'hsl(var(--p-background))',
        color: 'hsl(var(--p-foreground))',
        minHeight: '100vh',
      }}
    >
      <h1>UI Toolkit Demo</h1>

      {/* Badge Examples */}
      <Card style={{marginBottom: '2rem'}}>
        <h2>Badges</h2>
        <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </Card>

      {/* Progress Example */}
      <Card style={{marginBottom: '2rem'}}>
        <h2>Progress</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          <Progress value={25} max={100} />
          <Progress value={75} max={100} />
        </div>
      </Card>

      {/* Skeleton Example */}
      <Card style={{marginBottom: '2rem'}}>
        <h2>Skeleton</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          <Skeleton style={{height: '1.5rem'}} />
          <Skeleton style={{height: '1.5rem', width: '60%'}} />
        </div>
      </Card>

      {/* Button Examples */}
      <Card style={{marginBottom: '2rem'}}>
        <h2>Buttons</h2>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '1rem',
          }}
        >
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>

        <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">🚀</Button>
        </div>

        <div style={{display: 'flex', gap: '0.5rem', marginTop: '1rem'}}>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>
      </Card>

      {/* Input Examples */}
      <Card style={{marginBottom: '2rem'}}>
        <h2>Inputs</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <Input
            placeholder="Enter your email"
            type="email"
            value={email}
            onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
          />

          <Input
            placeholder="Your name"
            value={name}
            onInput={(e) => setName((e.target as HTMLInputElement).value)}
          />

          <Input placeholder="Small input" size="sm" />
          <Input placeholder="Large input" size="lg" />
          <Input placeholder="Disabled input" disabled />
        </div>
      </Card>

      {/* Switch Example */}
      <Card style={{marginBottom: '2rem'}}>
        <h2>Switch</h2>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <Switch
            checked={enabled}
            onInput={(e) =>
              setEnabled((e.target as HTMLInputElement).checked)
            }
          />
          <span>{enabled ? 'On' : 'Off'}</span>
        </div>
      </Card>

      {/* Tooltip Example */}
      <Card style={{marginBottom: '2rem'}}>
        <h2>Tooltip</h2>
        <p>Hover over the buttons to see tooltips.</p>
        <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
          <Tooltip title="Save">
            <Button size="icon">💾</Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button size="icon" variant="destructive">
              🗑
            </Button>
          </Tooltip>
        </div>
      </Card>

      {/* Dialog Example */}
      <Card>
        <h2>Dialog</h2>
        <p>Click the button below to open a modal dialog.</p>

        <Dialog>
          <Dialog.Trigger>
            <Button variant="outline">Open Dialog</Button>
          </Dialog.Trigger>

          <Dialog.Content>
            <h3 style={{margin: '0 0 1rem 0'}}>Confirm Action</h3>
            <p
              style={{
                margin: '0 0 1rem 0',
                color: 'hsl(var(--p-muted-foreground))',
              }}
            >
              This is a native HTML5 dialog element with minimal styling and
              behavior.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'flex-end',
              }}
            >
              <Dialog.Close>
                <Button variant="outline">Cancel</Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button>Confirm</Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog>
      </Card>

      {/* Form Example */}
      <Card style={{marginTop: '2rem'}}>
        <h2>Form Integration</h2>
        <p>
          Current values: {email && `Email: ${email}`} {name && `Name: ${name}`}
        </p>
        <Button
          onClick={() => {
            console.log('Form data:', {email, name});
            alert(`Email: ${email}\nName: ${name}`);
          }}
        >
          Submit Form
        </Button>
      </Card>
    </div>
  );
}
