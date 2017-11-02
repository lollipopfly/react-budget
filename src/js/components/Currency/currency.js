import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Currency extends Component {
  constructor(props) {
    super(props);

    let defaultTmpValue;
    let currencies = [
      {
        text: '₽',
        value: 'ruble'
      },
      {
        text: '$',
        value: 'dollar'
      },
      {
        text: '€',
        value: 'euro'
      },
      {
        text: '¥',
        value: 'yen'
      },
    ];

    if(!(defaultTmpValue = localStorage.getItem('currentCurrency'))) {
      defaultTmpValue = 'ruble';
    }

    this.state = {
      defaultValue: defaultTmpValue
    };

    // Generate options
    this.optionList = currencies.map((option, key) =>
      <option key={key} value={option.value}>
        {option.text}
      </option>
    );

    this.changeCurrency = this.changeCurrency.bind(this);
  }

  // Save current currency
  changeCurrency(e) {
    localStorage.setItem('currentCurrency', e.target.value);
  }
  render() {
    return (
      <div className="text-right">
        <label className="currency__select__label form-check-label">Моя валюта</label>

        <select
          className="currency__select"
          onChange={this.changeCurrency}
          defaultValue={this.state.defaultValue}>
          {this.optionList}
        </select>

      </div>
    )
  }
}

export default Currency;
