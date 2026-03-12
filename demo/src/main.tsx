import './style.css';
import './iconify.d.ts';
import {
  LocationProvider,
  Router,
  Route,
  lazy,
  ErrorBoundary,
  hydrate,
  prerender as ssr,
} from 'preact-iso';
import 'iconify-icon';

const Home = lazy(() => import('./routes/home.tsx'));
const GettingStarted = lazy(() => import('./routes/getting-started.tsx'));
// const ComponentsIndex = lazy(() => import('./routes/components-index.tsx'));
const Docs = lazy(() => import('./routes/docs.tsx'));
const Linear = lazy(() => import('./routes/linear.tsx'));
const Chat = lazy(() => import('./routes/chat.tsx'));
const Player = lazy(() => import('./routes/player.tsx'));
const Dashboard = lazy(() => import('./routes/dashboard.tsx'));


const DEMO_THEME_STORAGE_KEY = 'pui-demo-theme';

function resolveDemoTheme(): 'mobile-native' | 'default' {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('theme');

  const fromQuery =
    requested === 'native-mobile' || requested === 'mobile-native'
      ? 'mobile-native'
      : requested === 'default'
        ? 'default'
        : null;

  if (fromQuery) {
    try {
      localStorage.setItem(DEMO_THEME_STORAGE_KEY, fromQuery);
    } catch {}
    return fromQuery;
  }

  try {
    return localStorage.getItem(DEMO_THEME_STORAGE_KEY) === 'mobile-native'
      ? 'mobile-native'
      : 'default';
  } catch {
    return 'default';
  }
}

function applyDemoTheme() {
  const theme = resolveDemoTheme();
  if (theme === 'mobile-native') {
    document.documentElement.dataset.theme = 'mobile-native';
    return;
  }
  delete document.documentElement.dataset.theme;
}

function setViewportVars() {
  const vv = window.visualViewport;
  const vh = vv ? vv.height : window.innerHeight;
  document.documentElement.style.setProperty('--vh', vh + 'px');
  const offset = window.innerHeight - vh;
  document.documentElement.style.setProperty('--vh-offset', offset + 'px');
}

function loadStart() {
  document.body.classList.add('loading');
}

function loadEnd() {
  document.body.classList.remove('loading');
}

export function App({url}: {url?: string}) {
  return (
    <LocationProvider url={url}>
      <ErrorBoundary>
        <Router onLoadStart={loadStart} onLoadEnd={loadEnd}>
          <Route path="/" component={Home} />
          <Route path="/getting-started" component={GettingStarted} />
          <Route path="/docs/:slug?" component={Docs} remount />
          <Route path="/linear" component={Linear} />
          <Route path="/chat" component={Chat} />
          <Route path="/player" component={Player} />
          <Route path="/dashboard" component={Dashboard} />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
}

export async function prerender(data: {url: string}) {
  const result = await ssr(<App url={data.url} />);
  const links = new Set(
    [...result.links].filter((link) => !/\.[a-z0-9]+(?:$|[?#])/i.test(link)),
  );

  return {
    ...result,
    links,
  };
}

if (typeof window !== 'undefined') {
  setViewportVars();
  applyDemoTheme();
  window.visualViewport?.addEventListener('resize', setViewportVars);
  hydrate(<App />, document.getElementById('app')!);
}
