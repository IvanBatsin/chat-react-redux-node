import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { Home, AuthPage} from './pages';
import { Provider } from 'react-redux';
import { store } from './store/rootStore';

import { socket } from './core/socket';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <div className="wrapper">
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path={['/auth/signin', '/auth/signup']} component={AuthPage}/>
            <Redirect to="/"/>
          </Switch>
        </div>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);