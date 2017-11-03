import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Deposit from '../Deposit/deposit';
import Currency from '../Currency/currency';
import Table from '../Table/table';
import Modal from '../Modal/modal';

global.Tether = require('tether');
require('bootstrap');

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <br/>
        <br/>
        <br/>

        <div className="container">
          <div className="row header">
            <div className="col-6">
              <Deposit />
            </div>
            <div className="col-6">
              <Currency />
            </div>
          </div>

          <div className="row">
            <div className="col-7">
              <Table />
            </div>

            <div className="col-5">

            </div>
          </div>
        </div>

        <Modal />
      </div>
    )
  }
}

export default App;


