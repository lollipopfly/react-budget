import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class Deposit extends Component {
  constructor(props) {
    super(props);

    this.changeDeposit = this.changeDeposit.bind(this);
  }
  changeDeposit(e) {
    this.props.onChangeDeposit(e.target.checked);
  }
  render() {
    return (
      <div>
        <h2 className="deposit__title">Прогноз сбережений</h2>

        <label htmlFor="deposit__input" className="form-check-label">
          <input type="checkbox"
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
    deposit: state
  }),
  dispatch => ({
    onChangeDeposit: (status) => {
      dispatch({type: 'CHANGE_DEPOSIT', status: status})
    }
  })
)(Deposit);
