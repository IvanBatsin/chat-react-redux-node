import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Home, AuthPage} from './pages';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div className="wrapper">
        <Switch>
          <Route exact path='/home' component={Home}></Route>
          <Route path={['/auth', '/auth/register']} component={AuthPage}></Route>
        </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);