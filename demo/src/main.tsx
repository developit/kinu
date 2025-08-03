import './style.css';
import {render} from 'preact';
import {Router, Route, lazy} from 'preact-iso';
import Home from './home.tsx';

const Components = lazy(() => import('./app.tsx'));

render(
  <Router>
    <Route path="/" component={Home} />
    <Route path="/components" component={Components} />
  </Router>,
  document.getElementById('app')!,
);
