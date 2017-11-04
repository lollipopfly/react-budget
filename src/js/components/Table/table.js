import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

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
            <tr>
              <td>
                <i className="fa fa-ruble table__icon table__icon--ruble"></i>
                {/*<input className="table__input" value="2500000" type="text"/>*/}
              </td>
              <td>250000</td>
              <td>
                {/*<input className="table__input" value="22" type="text"/> */}
              </td>
            </tr>
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
