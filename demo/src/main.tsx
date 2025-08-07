import './style.css';
import {render} from 'preact';
import {LocationProvider, Router, Route, lazy, ErrorBoundary} from 'preact-iso';

const Home = lazy(() => import('./routes/home.tsx'));
const Components = lazy(() => import('./app.tsx'));
const Linear = lazy(() => import('./routes/linear.tsx'));

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
        <Route path="/components" component={Components} />
        <Route path="/linear" component={Linear} />
      </Router>
    </ErrorBoundary>
  </LocationProvider>,
  document.getElementById('app')!
);
