import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Currency extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="text-right">
        <label className="currency__select__label form-check-label">Моя валюта</label>
        <select className="currency__select">
          <option value="">&#8381;</option>
          <option value="">&#65284;</option>
          <option value="">&#8364;</option>
          <option value="">&#165;</option>
        </select>
      </div>
    )
  }
}

export default Currency;


