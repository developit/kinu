import {Button, Card} from 'pui';

export default function Home() {
  return (
    <div class="home">
      <Card style={{maxWidth: '32rem', textAlign: 'center'}}>
        <h1>pui</h1>
        <p>Performance‑first UI components for Preact.</p>
        <a href="/components">
          <Button>View Components</Button>
        </a>
      </Card>
    </div>
  );
}
