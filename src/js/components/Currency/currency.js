import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class Currency extends Component {
  constructor(props) {
    super(props);

    this.changeCurrency = this.changeCurrency.bind(this);

    let isShow = false;

    if(this.props.myState.budget.length > 0) {
      isShow = true
    }

    this.state = {
      isShow: isShow,
    }
  }

  // Save current currency
  changeCurrency(e) {
    var budget = this.props.myState;
    budget.currency = e.target.value;

    localStorage.setItem('budget', JSON.stringify(budget));
    this.props.onChangeCurrency(e.target.value);
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
    }
  })
)(Currency);
