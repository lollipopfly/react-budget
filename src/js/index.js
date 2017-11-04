import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App/app';

var initialState = {
  deposit: false,
  currency: '',
  budget: []
}

// Save initial state to storage
if(!localStorage.getItem('budget')) {
  localStorage.setItem('budget', JSON.stringify(initialState));
} else {
  initialState = JSON.parse(localStorage.getItem('budget'));
}
console.log(initialState);

function budget(state = initialState, action) {
  switch(action.type) {
    case 'CHANGE_DEPOSIT':
      return {
        ...state,
        deposit: action.status
      };
    case 'CHANGE_CURRENCY':
      return {
        ...state,
        currency: action.status
      };
    default:
      return state;
      break;
  }
}

const store = createStore(budget, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
