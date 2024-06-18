import './app.css';

import { BrowserRouter as Router } from 'react-router-dom';
import Userinfo from './pages/userinfo';

function App() {
  return (
    <div className="app">
      <Userinfo />
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <App />
    </Router>
  );
}
