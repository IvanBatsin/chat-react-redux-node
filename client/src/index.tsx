import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { App } from './App';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/rootStore';
import { BrowserRouter as Router } from 'react-router-dom';

// import { socket } from './core/socket';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App/>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);