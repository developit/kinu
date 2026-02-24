import {Sidebar, SidebarTrigger, ToastContainer} from 'pui';
import {Nav} from './nav';
import {componentGroups, overviewEntries} from './docs-data';
import {useEffect} from 'preact/hooks';
import {useLocation} from 'preact-iso';
import type {ComponentChildren} from 'preact';

export function DocsLayout({children}: {children?: ComponentChildren}) {
  const location = useLocation();

  // Handle sidebar responsiveness
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sidebar = document.getElementById(
      'demo-sidebar',
    ) as HTMLDialogElement | null;
    if (!sidebar) return;

    const mql = window.matchMedia('(max-width: 640px)');
    const syncSidebar = () => {
      if (mql.matches) {
        sidebar.setAttribute('hidden', '');
        if (sidebar.open) sidebar.close();
      } else {
        sidebar.removeAttribute('hidden');
        sidebar.setAttribute('open', '');
      }
    };

    syncSidebar();
    mql.addEventListener('change', syncSidebar);
    return () => mql.removeEventListener('change', syncSidebar);
  }, []);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(max-width: 640px)').matches) return;
    const sidebar = document.getElementById(
      'demo-sidebar',
    ) as HTMLDialogElement | null;
    if (!sidebar) return;
    sidebar.close();
    sidebar.setAttribute('hidden', '');
  }, [location.url]);

  // Get current component slug from route
  const currentSlug = location.url.split('/').pop() || '';

  return (
    <div class="demo-app">
      <Sidebar
        id="demo-sidebar"
        class="docs-sidebar"
        aria-label="Documentation navigation"
      >
        <header class="docs-sidebar-mobile-header">
          <button
            type="button"
            class="demo-sidebar-trigger"
            commandfor="demo-sidebar"
            command="close"
            aria-label="Close sidebar"
          >
            ☰
          </button>
        </header>
        <nav class="docs-sidebar-content" aria-label="Documentation sections">
          {overviewEntries.length > 0 && (
            <section class="docs-sidebar-section">
              <h2>Overview</h2>
              <ul class="docs-sidebar-list">
                {overviewEntries.map(({slug, title}) => (
                  <li>
                    <a
                      href={slug === 'overview' ? '/docs' : `/docs/${slug}`}
                      class={`docs-link${currentSlug === slug ? ' is-active' : ''}`}
                    >
                      <span class="docs-link-title">{title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {componentGroups.map((group) => (
            <section key={group.name} class="docs-sidebar-section">
              <h2>{group.name}</h2>
              <ul class="docs-sidebar-list">
                {group.entries.map((item) => (
                  <li>
                    <a
                      href={`/docs/${item.slug}`}
                      class={`docs-link${currentSlug === item.slug ? ' is-active' : ''}`}
                    >
                      <span class="docs-link-title">{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>
      </Sidebar>
      <main class="docs-content">
        <Nav
          left={
            <SidebarTrigger
              commandFor="demo-sidebar"
              class="demo-sidebar-trigger"
              children="☰"
            />
          }
        />
        <ToastContainer />
        {children}
      </main>
    </div>
  );
}
