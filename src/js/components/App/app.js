import React, { Component } from 'react';
import Deposit from '../Deposit/deposit';
import Currency from '../Currency/currency';
import Table from '../Table/table';
import Modal from '../Modal/modal';
import Chart from '../Chart/chart';

global.Tether = require('tether');
require('bootstrap');

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="container mt-40">
          <div className="row header">
            <div className="col-6">
              <Deposit />
            </div>
            <div className="col-6">
              <Currency />
            </div>
          </div>

          <div className="row">
            <div className="col-md-7 content-left">
              <Table />
            </div>

            <div className="col-md-5">
              <Chart />
            </div>
          </div>
        </div>

        <Modal />
      </div>
    )
  }
}

export default App;
