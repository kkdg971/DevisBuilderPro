import { Router, Route } from 'wouter';
import Home from './pages/Home';

export default function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
    </Router>
  );
}
