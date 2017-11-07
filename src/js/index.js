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
        budgetChart: formatBudget([...state.budget, action.budgetItem], state.deposit)
      };

      localStorage.setItem('budget', [JSON.stringify(budget)]);

      return budget;
    case 'UPDATE_BUDGET':
      var budget = {
        ...state,
        budget: action.budget,
        budgetChart: formatBudget(action.budget, state.deposit)
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
function formatBudget(budget, deposit) {
  var auarterCount = 4;
  var quarter = [
    { name: 'сегодня' },
    { name: '' },
    { name: '' },
    { name: 'через год' },
  ];

  if(budget.length > 0) {
    quarter.map((item, index) => {
      budget.map((row, key) => {
        var value = 0;

        if(deposit && row.deposit) {
          switch(index + 1) {
            case 1:
              value = 0;
              break;
            case 2:
              value = (row.deposit/2/100*row.defaultCurrencySum);
              break;
            case 3:
              value = (row.deposit/1.3333/100*row.defaultCurrencySum);
              break;
            case 4:
              value = (row.deposit/100*row.defaultCurrencySum);
              break;
          }

          if(item[row.currency + '_deposit']) {
            item[row.currency + '_deposit'] += value;
          } else {
            item[row.currency + '_deposit'] = value;
          }

          item[row.currency + '_deposit'] = Math.round(item[row.currency + '_deposit'] * 100) / 100;
        }

        item[row.currency] = row.defaultCurrencySum;
      });
    });

    return quarter;
  }

  return [];
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
