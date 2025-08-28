import './style.css';
import {render} from 'preact';
import {LocationProvider, Router, Route, lazy, ErrorBoundary} from 'preact-iso';

const Home = lazy(() => import('./routes/home.tsx'));
const GettingStarted = lazy(() => import('./routes/getting-started.tsx'));
const Components = lazy(() => import('./app.tsx'));
const Linear = lazy(() => import('./routes/linear.tsx'));
const Chat = lazy(() => import('./routes/chat.tsx'));
const Player = lazy(() => import('./routes/player.tsx'));

function setViewportVars() {
  const vv = window.visualViewport;
  const vh = vv ? vv.height : window.innerHeight;
  document.documentElement.style.setProperty('--vh', vh + 'px');
  const offset = window.innerHeight - vh;
  document.documentElement.style.setProperty('--vh-offset', offset + 'px');
}

setViewportVars();
window.visualViewport?.addEventListener('resize', setViewportVars);

render(
  <LocationProvider>
    <ErrorBoundary>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/getting-started" component={GettingStarted} />
        <Route path="/components" component={Components} />
        <Route path="/linear" component={Linear} />
        <Route path="/chat" component={Chat} />
        <Route path="/player" component={Player} />
      </Router>
    </ErrorBoundary>
  </LocationProvider>,
  document.getElementById('app')!
);
