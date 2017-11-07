import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);

    this.state = {
      budget: this.defaultBudget(),
      isSuccess: false,
    }

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

    this.shortCurrencies = {
      'ruble': 'RUB',
      'dollar': 'USD',
      'euro': 'EUR',
      'yen': 'JPY'
    }

    // Make options
    this.optionList = currencies.map((option, key) =>
      <option key={key} value={option.value}>
        {option.text}
      </option>
    );
  }
  save(e) {
    e.preventDefault();

    var self = this;
    var budget = JSON.parse(localStorage.getItem('budget'));
    var isEmptySelect = false;

    // Set currency if have not currency
    if(!budget.currency) {
      isEmptySelect = true;
      budget.currency = this.state.budget.currency;
    }

   this.getExchange()
    .then(data => {
      if(data) {
        var currentCurrencyCode = self.shortCurrencies[self.state.budget.currency];
        var base = data.base;
        var value = self.state.budget.sum;

        if(isEmptySelect) {
          var base = currentCurrencyCode;
        }

        // Get value fir default Cyrrency Sum
        self.state.budget.defaultCurrencySum = this.getDefaultCurrencySumValue(
          data.rates,
          base,
          currentCurrencyCode,
          value
        );
        // Make deposit and sum to number with 2 number after dot
        self.state.budget.deposit = parseFloat(Math.round(100 * self.state.budget.deposit) / 100);
        self.state.budget.sum = parseFloat(Math.round(100 * self.state.budget.sum) / 100);

        budget.budget.push(self.state.budget);

        // Update Redux store
        self.props.onSave(self.state.budget, budget, self.state.budget.currency, isEmptySelect);

        self.setState({ isSuccess: true});

        setTimeout(function() {
          $('#myModal').modal('hide');

          self.setState({
            budget: self.defaultBudget(),
            isSuccess: false
          });
        }.bind(self), 1000);
      }
    });
  }
  getDefaultCurrencySumValue(rates, base, currentCurrencyCode, value) {
    if(currentCurrencyCode !== base) {
      value = value / rates[currentCurrencyCode];
    }

    return Math.round(100 * value) / 100;
  }
  getExchange() {
    const url = 'https://api.fixer.io/latest';
    var baseCurrency = this.shortCurrencies[this.props.myState.currency];

    return axios.get(url, {
      params: {
        base: baseCurrency,
      }
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return false;
    });
  }

  // Get defaulb budget
  defaultBudget() {
    var defaultCurrency = 'ruble';
    var defaultBudget = {
      sum: '',
      defaultCurrencySum: '',
      deposit: '',
      currency: defaultCurrency,
    }

    return defaultBudget;
  }
  handleChange(e) {
    var value = e.target.value;
    var name = e.target.name;
    var state = this.state.budget;

    state[name] = value;
    this.setState({
      budget: state
    });
  }
  render() {
    return (
      <div>
        <div className="modal" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Добавить валюту</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={this.save}>
                <div className="modal-body">
                  <div>
                    <label>Валюта &nbsp;</label>
                      <select
                        name="currency"
                        value={this.state.budget.currency}
                        onChange={this.handleChange}
                        className="currency__select currency__select--lg">
                        {this.optionList}
                      </select>
                  </div>
                  <div>
                    <label>Сумма &nbsp;</label>
                    <input name="sum" required type="number" value={this.state.budget.sum} onChange={this.handleChange} />
                  </div>
                  <div>
                    <label>Ставка вкладов,(%) &nbsp;</label>
                    <input name="deposit" type="number" value={this.state.budget.deposit} onChange={this.handleChange} />
                  </div>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                    <button type="submit" className="btn btn-primary">Сохранить</button>
                </div>

                <div className={this.state.isSuccess ? 'col-12' : 'hidden'}>
                  <div className="alert alert-success" role="alert">
                    Валюта добавлена...
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    myState: state
  }),
  dispatch => ({
    onSave: (budgetItem, budget, status, isEmptySelect) => {
      dispatch({type: 'ADD_TO_BUDGET', budgetItem: budgetItem, budget: budget});

      // If first time
      if(isEmptySelect) {
        dispatch({type: 'CHANGE_CURRENCY', status: status});
      }
    }
  })
)(Modal);
