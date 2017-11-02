import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Deposit extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2 className="deposit__title">Прогноз сбережений</h2>

        <label htmlFor="deposit__input" className="form-check-label">
          <input id="deposit__input" className="form-check-input" type="checkbox" /> С вкладами
        </label>
      </div>
    )
  }
}

export default Deposit;


