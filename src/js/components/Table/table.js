import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Table extends Component {
  constructor(props) {
    super(props);
  }
  showModal() {
    $('#myModal').modal()
  }
  render() {
    return (
      <div>
        {/*
        <table className="table table__widget">
          <thead>
            <tr>
              <th>Сбережения</th>
              <th>В моей валюте, &#8381;</th>
              <th>Ставки вкладов, %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <i className="fa fa-ruble table__icon table__icon--ruble"></i>
                <input className="table__input" value="2500000" type="text"/>
              </td>
              <td>250000</td>
              <td><input className="table__input" value="22" type="text"/></td>
            </tr>
            <tr>
              <td>
                <i className="fa fa-dollar table__icon table__icon--dollar"></i>
                <input className="table__input" value="2500000" type="text"/>
              </td>
              <td>250000</td>
              <td><input className="table__input" value="22" type="text"/></td>
            </tr>
            <tr>
              <td>
                <i className="fa fa-euro table__icon table__icon--euro"></i>
                <input className="table__input" value="2500000" type="text"/>
              </td>
              <td>250000</td>
              <td><input className="table__input" value="22" type="text"/></td>
            </tr>
            <tr>
              <td>
                <i className="fa fa-yen table__icon table__icon--yen"></i>
                <input className="table__input" value="2500000" type="text"/>
              </td>
              <td>250000</td>
              <td><input className="table__input" value="22" type="text"/></td>
            </tr>
          </tbody>
        </table>
      */}

        <button onClick={this.showModal}
                data-target="#modal"
                className="table__button btn btn-primary btn-sm">
          <i className="fa fa-plus"></i>
          &nbsp;Валюта
        </button>
      </div>
    )
  }
}

export default Table;