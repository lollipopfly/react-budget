import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class NewComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      budget: this.defaultBudget(),
      isSuccess: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);

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

    // Generate options
    this.optionList = currencies.map((option, key) =>
      <option key={key} value={option.value}>
        {option.text}
      </option>
    );
  }
  save(e) {
    e.preventDefault();
    var budget = localStorage.getItem('budget');

    if(budget) {
      budget = JSON.parse(budget);
      budget.push(this.state.budget);
    } else {
      budget = [];
      budget.push(this.state.budget);
    }

    localStorage.setItem('budget', [JSON.stringify(budget)]);
    this.setState({ isSuccess: true});

    setTimeout(function() {
      $('#myModal').modal('hide');

      this.setState({
        budget: this.defaultBudget(),
        isSuccess: false
      });
    }.bind(this), 1000);
  }

  // Get defaulb budget
  defaultBudget() {
    var defaultCurrency = 'ruble';
    var defaultBudget = {
      sum: '',
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
        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                    <input name="sum" required type="text" value={this.state.budget.sum} onChange={this.handleChange} />
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

export default NewComponent;