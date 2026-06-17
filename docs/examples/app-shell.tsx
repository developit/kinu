import {AppShell} from 'kinu';

export function Demo() {
  return (
    <div
      style={{
        height: '18rem',
        border: '1px solid hsl(var(--k-border))',
        borderRadius: 'var(--k-radius)',
        overflow: 'hidden',
      }}
    >
      <AppShell style={{minHeight: '100%'}}>
        <AppShell.Header
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.75rem 1rem',
            borderBottom: '1px solid hsl(var(--k-border))',
            background: 'hsl(var(--k-card))',
            fontWeight: 600,
          }}
        >
          Acme
        </AppShell.Header>
        <AppShell.Sidebar
          style={{
            padding: '0.75rem 1rem',
            borderRight: '1px solid hsl(var(--k-border))',
            background: 'hsl(var(--k-sidebar))',
            minWidth: '9rem',
            fontSize: '0.875rem',
            color: 'hsl(var(--k-muted-foreground))',
            lineHeight: 2,
          }}
        >
          Dashboard
          <br />
          Projects
          <br />
          Settings
        </AppShell.Sidebar>
        <AppShell.Main style={{padding: '1rem', overflow: 'auto'}}>
          <h3 style={{marginTop: 0}}>Main content</h3>
          <p style={{color: 'hsl(var(--k-muted-foreground))'}}>
            Header spans the top, the sidebar fills the left, and the footer
            sits under main. Narrow the viewport to see it collapse to a single
            column.
          </p>
        </AppShell.Main>
        <AppShell.Footer
          style={{
            padding: '0.5rem 1rem',
            borderTop: '1px solid hsl(var(--k-border))',
            background: 'hsl(var(--k-card))',
            fontSize: '0.75rem',
            color: 'hsl(var(--k-muted-foreground))',
          }}
        >
          © 2026 Acme
        </AppShell.Footer>
      </AppShell>
    </div>
  );
}

export const code = `<AppShell>
  <AppShell.Header>Acme</AppShell.Header>
  <AppShell.Sidebar>{/* nav */}</AppShell.Sidebar>
  <AppShell.Main>{/* content */}</AppShell.Main>
  <AppShell.Footer>© 2026 Acme</AppShell.Footer>
</AppShell>`;

export default {Demo, code};
