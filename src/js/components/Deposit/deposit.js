import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class Deposit extends Component {
  constructor(props) {
    super(props);

    this.changeDeposit = this.changeDeposit.bind(this);

    var budget = JSON.parse(localStorage.getItem('budget'));
    var localStorageValue = budget.deposit;

    this.state = {
      budget: budget,
      defaultValue: localStorageValue
    };
  }
  changeDeposit(e) {
    var budget = JSON.parse(localStorage.getItem('budget'));

    this.setState({
      defaultValue: e.target.checked,
      budget: {
        ...this.state.budget,
        deposit: e.target.checked
      }
    },function () {
      localStorage.setItem('budget', JSON.stringify(this.state.budget));
    });

    this.props.onChangeDeposit(e.target.checked);
  }
  render() {
    return (
      <div>
        <h2 className="deposit__title">Прогноз сбережений</h2>

        <label htmlFor="deposit__input" className="form-check-label">
          <input type="checkbox"
                 name="deposit"
                 checked={this.state.defaultValue}
                 onChange={this.changeDeposit}
                 id="deposit__input"
                 className="form-check-input" /> С вкладами
        </label>
      </div>
    )
  }
}

export default connect(
  state => ({
    myState: state
  }),
  dispatch => ({
    onChangeDeposit: (status) => {
      dispatch({type: 'CHANGE_DEPOSIT', status: status})
    }
  })
)(Deposit);
