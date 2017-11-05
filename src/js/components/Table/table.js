import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class Table extends Component {
  constructor(props) {
    super(props);
    this.changeCurrency = this.changeCurrency.bind(this);

    this.budgetList = false;

    // Make rows
    // if(this.props.myState.budget) {
      // this.budgetList = this.props.myState.budget.map((item, key) =>
      //   <tr key={key}>
      //     <td>
      //       <i className={'fa fa-' + item.currency + 'table__icon table__icon--ruble'}></i>
      //       {item.sum}
      //     </td>
      //     <td>250000</td>
      //     <td>{item.deposit}</td>
      //   </tr>
      // );
    // }
  }
  changeCurrency(e) {
    console.log(e.target.value);
  }
  showModal() {
    $('#myModal').modal()
  }
  render() {
    return (
      <div>
        <table className="table table__widget">
          <thead>
            <tr>
              <th>Сбережения</th>
              <th>
                В моей валюте
                <span className={this.props.myState.currency ? '' : 'hidden'}>
                  ,&nbsp; <i className={'fa fa-' + this.props.myState.currency}></i>
                </span>
              </th>
              <th>Ставки вкладов, %</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.myState.budget.map((item, index) =>
                <tr key={index}>
                  <td>
                    <i className={'fa fa-' + item.currency + ' table__icon table__icon--' + item.currency}></i>
                    {item.sum}
                  </td>
                  <td>250000</td>

                  <td><input
                    type="number"
                    className="table__input"
                    value={item.deposit}
                    disabled={this.props.myState.deposit}
                    onChange={this.changeCurrency}
                    /></td>
                </tr>
              )
            }
          </tbody>
        </table>

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

export default connect(
  state => ({
    myState: state
  }),
  dispatch => ({})
)(Table);
