import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Currency extends Component {
  constructor(props) {
    super(props);

    this.changeCurrency = this.changeCurrency.bind(this);
  }

  // Save current currency
  changeCurrency(e) {
    this.props.onChangeCurrency(e.target.value);

    // Update data from exchage api
    this.updateExchange(e.target.value);
  }
  updateExchange(newCurrency) {
    var self = this;
    const cookieName = 'is_cached';
    const url = 'https://api.fixer.io/latest';
    const shortCurrencies = {
      'ruble': 'RUB',
      'dollar': 'USD',
      'euro': 'EUR',
      'yen': 'JPY'
    }

    // Make uniqe currencies
    var currenciesList = this.getUniqueCurrencies(shortCurrencies);
    var currenciesString = currenciesList.join();
    var baseCurrency = shortCurrencies[newCurrency];

    // Get exchange rates by main currency
    axios.get(url, {
      params: {
        base: baseCurrency,
      }
    })
    .then(function (response) {
      self.saveCache(cookieName, true, self.getExpireDate(), '/');
      self.updateBudget(response.data, shortCurrencies);
    })
    .catch(function (error) {});
  }
  updateBudget(data, shortCurrencies) {
    var base = data.base;
    var budget = this.props.myState;

    budget.budget.map((item, index) => {
      var currentCurrencyCode = shortCurrencies[item.currency];
      var value = item.sum;

      if(currentCurrencyCode !== base) {
       value = item.sum / data.rates[currentCurrencyCode];
       value = Math.round(100 * value) / 100;
      }

      item.defaultCurrencySum = value;

      return item;
    });

    // Update
    this.props.onUpdateBudget(budget.budget);
  }
  getUniqueCurrencies(shortCurrencies) {
    var currencies = [];

    this.props.myState.budget.forEach( function( item ) {
      if(currencies.indexOf(shortCurrencies[item.currency]) == -1) {
        currencies.push(shortCurrencies[item.currency]);
      }
    });

    return currencies;
  }
  filterCurrenciesList() {
    let currencies = {
      'ruble': '₽',
      'dollar': '$',
      'euro': '€',
      'yen': '¥'
    };
    let currenciesList = [];

    // Make uniqe currencies
    this.props.myState.budget.forEach( function( item ) {
      if(currenciesList.indexOf(item.currency) == -1) {
        currenciesList.push(item.currency);
      }
    });

    //Generate options tags
    let optionList = currenciesList.map((item, key) =>
      <option key={key} value={item}>
        {currencies[item]}
      </option>
    );

    return optionList;
  }
  saveCache(name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toUTCString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
  }
  getExpireDate() {
    var date = new Date();
    var time = date.getTime();
    time += 3600 * 1000;
    date.setTime(time);

    return date;
  }
  render() {
    return (
      <div className={this.props.myState.currency ? 'text-right' : 'hidden'}>
        <label className="currency__select__label form-check-label">Моя валюта</label>

        <select
          className="currency__select"
          onChange={this.changeCurrency}
          defaultValue={this.props.myState.currency}>
          {this.filterCurrenciesList()}
        </select>
      </div>
    )
  }
}

export default connect(
  state => ({
    myState: state
  }),
  dispatch => ({
    onChangeCurrency: (status) => {
      dispatch({type: 'CHANGE_CURRENCY', status: status});
    },
    onUpdateBudget: (budget) => {
      dispatch({type: 'UPDATE_BUDGET', budget: budget});
    }
  })
)(Currency);
