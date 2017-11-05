import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class Currency extends Component {
  constructor(props) {
    super(props);

    this.changeCurrency = this.changeCurrency.bind(this);

    let isShow = false;
    let currencies = {
      'ruble': '₽',
      'dollar': '$',
      'euro': '€',
      'yen': '¥'
    };

    // TODO: 1.сделать live появление/показ после добавления строки в бюджет
    // 2. обновление selecta - если добавили строку с несущ в селекте currency

    if(this.props.myState.budget.length > 0) {
      isShow = true
    }

    this.state = {
      isShow: isShow,
    }

    // Make uniqe currencies
    var currenciesList = [];
    this.props.myState.budget.forEach( function( item ) {
      if(currenciesList.indexOf(item.currency) == -1) {
        currenciesList.push(item.currency);
      }
    });

    // Generate options tags
    this.optionList = currenciesList.map((item, key) =>
      <option key={key} value={item}>
        {currencies[item]}
      </option>
    );
  }

  // Save current currency
  changeCurrency(e) {
    // TODO: взять бюджет из redux
    var budget = JSON.parse(localStorage.getItem('budget'));
    budget.currency = e.target.value;

    localStorage.setItem('budget', JSON.stringify(budget));
    this.props.onChangeCurrency(e.target.value);
  }
  render() {
    return (
      <div className={this.state.isShow ? 'text-right' : 'hidden'}>
        <label className="currency__select__label form-check-label">Моя валюта</label>

        <select
          className="currency__select"
          onChange={this.changeCurrency}
          defaultValue={this.props.myState.currency}>
          {this.optionList}
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
      dispatch({type: 'CHANGE_CURRENCY', status: status})
    }
  })
)(Currency);
