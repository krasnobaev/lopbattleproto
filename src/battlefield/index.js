import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import 'rxjs';

import App from './components/App'
import { configureStore } from './ducks/store.js'
import './main.sass';

// ========================================
setTimeout(() => { // God told me TODO this
  ReactDOM.render(
    <Provider store={configureStore()}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
});
