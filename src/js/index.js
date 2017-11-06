import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App/app';

var initialState = {
  deposit: false,
  currency: '',
  budget: [],
  budgetChart:[]
}

// Save initial state to storage
if(!localStorage.getItem('budget')) {
  localStorage.setItem('budget', JSON.stringify(initialState));
} else {
  initialState = JSON.parse(localStorage.getItem('budget'));
}

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
    case 'ADD_TO_BUDGET':
      var budget = {
        ...state,
        budget: [...state.budget, action.budgetItem],
        budgetChart: formatBudget([...state.budget, action.budgetItem])
      };

      localStorage.setItem('budget', [JSON.stringify(budget)]);

      return budget;
    case 'UPDATE_BUDGET':
      var budget = {
        ...state,
        budget: action.budget,
        budgetChart: formatBudget(action.budget)
      };

      localStorage.setItem('budget', [JSON.stringify(budget)]);

      return budget
    default:
      return state;
      break;
  }
}

// format Budget list for chart
function formatBudget(budget) {
  var quarter = [
    {
      name: 'сегодня'
    },
    {
      name: ''
    },
    {
      name: ''
    },
    {
      name: 'через год'
    },
  ]

  quarter.map((item, index) => {
    budget.map((row, key) => {
      item[row.currency] = row.defaultCurrencySum
    })
  });

  return quarter;
}

const store = createStore(budget, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
