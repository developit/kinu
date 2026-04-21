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
          <Route path="/docs/:slug?" component={Docs} />
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
  window.visualViewport?.addEventListener('resize', setViewportVars);
  hydrate(<App />, document.getElementById('app')!);
}
