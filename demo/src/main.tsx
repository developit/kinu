import './style.css';
import {render} from 'preact';
import {LocationProvider, Router, Route, lazy, ErrorBoundary} from 'preact-iso';

const Home = lazy(() => import('./routes/home.tsx'));
const Components = lazy(() => import('./app.tsx'));
const Linear = lazy(() => import('./routes/linear.tsx'));

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
