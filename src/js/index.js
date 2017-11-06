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
      var budget = {
        ...state,
        deposit: action.status,
        budgetChart: formatBudget(action.budget, action.status)
      };

      localStorage.setItem('budget', JSON.stringify(budget));

      return budget;
    case 'CHANGE_CURRENCY':
      var budget = {
        ...state,
        currency: action.status
      };

      localStorage.setItem('budget', [JSON.stringify(budget)]);

      return budget;
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

var store = createStore(budget, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// format Budget list for chart
function formatBudget(budget, deposit = false) {
  var auarterCount = 4;
  var quarter = [
    { name: 'сегодня' },
    { name: '' },
    { name: '' },
    { name: 'через год' },
  ];

  quarter.map((item, index) => {
    budget.map((row, key) => {
      var value = 0;

      if(deposit && row.deposit) {
        switch(index + 1) {
          case 1:
            value = row.defaultCurrencySum;
            break;
          case 2:
            value = row.defaultCurrencySum + (row.deposit/2/100*row.defaultCurrencySum);
            break;
          case 3:
            value = row.defaultCurrencySum + (row.deposit/1.3333/100*row.defaultCurrencySum);
            break;
          case 4:
            value = row.defaultCurrencySum + (row.deposit/100*row.defaultCurrencySum);
            break;
        }
      } else {
        value = row.defaultCurrencySum;
      }

      if(item[row.currency]) {
        item[row.currency] += value;
      } else {
        item[row.currency] = value;
      }

      item[row.currency] = Math.round(item[row.currency] * 100) / 100;
    });
  });

  return quarter;
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
