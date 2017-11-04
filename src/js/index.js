import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App/app';

var initialDeposit = false;
function budget(state = initialDeposit, action) {
  if(action.type === 'CHANGE_DEPOSIT') {
    return action.status;
  }

  return state;
}

const store = createStore(budget, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
