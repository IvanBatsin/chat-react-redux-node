import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { App } from './App';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/rootStore';

// import { socket } from './core/socket';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);