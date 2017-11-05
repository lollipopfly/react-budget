import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import axios from 'axios';

class Table extends Component {
  constructor(props) {
    super(props);
    this.changeCurrency = this.changeCurrency.bind(this);

    const cookieName = 'is_cached';
    const shortCurrencies = {
      'ruble': 'RUB',
      'dollar': 'USD',
      'euro': 'EUR',
      'yen': 'JPY'
    }

    const url = 'https://api.fixer.io/latest';
    var date = new Date();
    var time = date.getTime();
    time += 3600 * 1000;
    date.setTime(time);

    // Get exchange
    if(this.props.myState.budget.length > 0 && !this.isCached(cookieName)) {
      this.getExchange(url, date, cookieName, shortCurrencies);
    }
  }
  getExchange(url, date, cookieName, shortCurrencies) {
    // Make uniqe currencies
    var self = this;
    var currenciesList = this.getUniqueCurrencies(shortCurrencies);
    var currenciesString = currenciesList.join();
    var baseCurrency = shortCurrencies[this.props.myState.currency];

    // Get exchange rates by main currency
    axios.get(url, {
      params: {
        base: baseCurrency,
      }
    })
    .then(function (response) {
      self.saveCache(cookieName, true, date, '/');
      self.updateBudget(response.data, shortCurrencies);
    })
    .catch(function (error) {
      console.log(error);
    });

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
  isCached(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));

    return JSON.parse(matches ? decodeURIComponent(matches[1]) : false)
  }
  saveCache(name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toUTCString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
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

    // Update redux state and localstorage
    localStorage.setItem('budget', JSON.stringify(budget));
    this.props.onUpdateBudget(budget.budget);
  }
  changeCurrency(e) {
    console.log(e.target.value);
  }
  showModal() {
    $('#myModal').modal()
  }
  render() {
    return (
      <div>
        <table className="table table__widget">
          <thead>
            <tr>
              <th>Сбережения</th>
              <th>
                В моей валюте
                <span className={this.props.myState.currency ? '' : 'hidden'}>
                  ,&nbsp; <i className={'fa fa-' + this.props.myState.currency}></i>
                </span>
              </th>
              <th>Ставки вкладов, %</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.myState.budget.map((item, index) =>
                <tr key={index}>
                  <td>
                    <i className={'fa fa-' + item.currency + ' table__icon table__icon--' + item.currency}></i>
                    {item.sum}
                  </td>
                  <td>{item.defaultCurrencySum}</td>
                  <td><input
                    type="number"
                    className="table__input"
                    value={item.deposit}
                    disabled={this.props.myState.deposit}
                    onChange={this.changeCurrency}
                    /></td>
                </tr>
              )
            }
          </tbody>
        </table>

        <button onClick={this.showModal}
                data-target="#modal"
                className="table__button btn btn-primary btn-sm">
          <i className="fa fa-plus"></i>
          &nbsp;Валюта
        </button>
      </div>
    )
  }
}

export default connect(
  state => ({
    myState: state
  }),
  dispatch => ({
    onUpdateBudget: (budget) => {
      dispatch({type: 'UPDATE_BUDGET', budget: budget})
    }
  })
)(Table);
