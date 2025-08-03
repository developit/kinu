import './style.css';
import {render} from 'preact';
import {LocationProvider, Router, Route, lazy, ErrorBoundary} from 'preact-iso';

const Home = lazy(() => import('./routes/home.tsx'));
const Components = lazy(() => import('./app.tsx'));

render(
  <LocationProvider>
    <ErrorBoundary>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/components" component={Components} />
      </Router>
    </ErrorBoundary>
  </LocationProvider>,
  document.getElementById('app')!
);
