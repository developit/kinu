import {Sidebar} from 'kinu';

export function Demo() {
  return (
    <div
      style={{
        position: 'relative',
        contain: 'strict',
        height: '400px',
        border: '1px solid hsl(var(--p-border))',
        borderRadius: '0.5rem',
        overflow: 'hidden',
      }}
    >
      <Sidebar style={{position: 'relative', width: '16rem', height: '100%'}}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.5rem',
            borderBottom: '1px solid hsl(var(--p-border))',
            marginBottom: '0.5rem',
          }}
        >
          <div
            style={{
              width: '2rem',
              height: '2rem',
              backgroundColor: 'hsl(var(--p-foreground))',
              borderRadius: '0.375rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'hsl(var(--p-background))',
              fontWeight: '600',
            }}
          >
            P
          </div>
          <div>
            <div style={{fontWeight: '600', fontSize: '0.875rem'}}>
              Project UI
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                color: 'hsl(var(--p-muted-foreground))',
              }}
            >
              Component Library
            </div>
          </div>
        </div>

        <h3>Navigation</h3>
        <nav>
          <a href="/dashboard" aria-current="page">
            🏠 Dashboard
          </a>
          <a href="/analytics">📊 Analytics</a>
          <a href="/team">👥 Team</a>
          <a href="/settings">⚙️ Settings</a>
        </nav>

        <h3>Resources</h3>
        <nav>
          <a href="/documentation">📖 Documentation</a>
          <a href="/design-system">🎨 Design System</a>
          <a href="/tools">🔧 Tools</a>
        </nav>

        <div
          style={{
            marginTop: 'auto',
            padding: '1rem 0',
            borderTop: '1px solid hsl(var(--p-border))',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '50%',
                backgroundColor: 'hsl(var(--p-muted))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
              }}
            >
              JD
            </div>
            <div style={{flex: 1}}>
              <div style={{fontSize: '0.875rem', fontWeight: '500'}}>
                John Doe
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'hsl(var(--p-muted-foreground))',
                }}
              >
                john@example.com
              </div>
            </div>
          </div>
        </div>
      </Sidebar>

      <div
        style={{
          marginLeft: '16rem',
          padding: '1rem',
          height: '100%',
          boxSizing: 'border-box',
          backgroundColor: 'hsl(var(--p-muted) / 0.1)',
        }}
      >
        <div
          style={{
            fontSize: '0.875rem',
            color: 'hsl(var(--p-muted-foreground))',
            marginBottom: '0.5rem',
          }}
        >
          Components › Sidebar
        </div>
        <div
          style={{
            color: 'hsl(var(--p-muted-foreground))',
            fontSize: '0.875rem',
          }}
        >
          A clean, organized sidebar component with improved styling and
          navigation.
        </div>
      </div>
    </div>
  );
}

export const code = `<Sidebar>
  <h3>Navigation</h3>
  <nav>
    <a href="#" aria-current="page">🏠 Dashboard</a>
    <a href="#">📊 Analytics</a>
    <a href="#">👥 Team</a>
    <a href="#">⚙️ Settings</a>
  </nav>

  <h3>Resources</h3>
  <nav>
    <a href="#">📖 Documentation</a>
    <a href="#">🎨 Design System</a>
    <a href="#">🔧 Tools</a>
  </nav>
</Sidebar>`;

export default {Demo, code};
