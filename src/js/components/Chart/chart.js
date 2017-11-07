import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.colors = [
      {'ruble' : '#2765cc'},
      {'ruble_deposit' : '#66a3e0'},
      {'dollar': '#299932'},
      {'dollar_deposit': '#66c285'},
      {'euro': '#f79904'},
      {'euro_deposit': '#fac266'},
      {'yen': '#ee2222'},
      {'yen_deposit': '#f3696a'},
    ];
  }
  render () {
    return (
      <ResponsiveContainer height='100%' width='100%'>
        <BarChart data={this.props.myState.budgetChart}
          className={this.props.myState.budgetChart.length > 0 ? '' : 'hidden'}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          {
            this.colors.map((item, index) => {
              return (
                <Bar key={index} dataKey={Object.keys(item)[0]} stackId="a" fill={item[Object.keys(item)[0]]} />
              );
            })
          }
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default connect(
  state => ({
    myState: state
  }),
)(Chart);
