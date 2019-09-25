import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalDuration: 0,
      basicDuration: 0,
      overtimeDuration: 0,
      limit: 0,
      basicRate: 0,
      overtimeRate: 0,
      basicPay: 0,
      overtimePay: 0,
      totalPay: 0,
    }
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleRateChange = this.handleRateChange.bind(this);
    this.calculatePay = this.calculatePay.bind(this);
  }

  //handle pay rate related changes
  handleRateChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value }, this.calculatePay);
  }

  //handle duration related changes
  handleDurationChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    var overtime = 0;
    var basic = 0;
    if (name === 'totalDuration') {
      if (Number(value) < this.state.limit) {
        basic = Number(value);
        overtime = 0;
      } else {
        basic = this.state.limit;
        overtime = Number(value) - this.state.limit;
      }
    } else { //limit is edited
      if (this.state.totalDuration < Number(value)) {
        basic = this.state.totalDuration;
        overtime = 0;
      } else {
        basic = Number(value);
        overtime = this.state.totalDuration - Number(value);
      }
    }
    console.log("basic " + basic + " overtime " + overtime);

    this.setState({
      [name]: value,
      basicDuration: basic,
      overtimeDuration: overtime,
    }, this.calculatePay);
  }

  calculatePay() {
    console.log("basic " + this.state.basicDuration + " overtime " + this.state.overtimeDuration + " total " + this.state.totalDuration);
    var basic = Number(this.state.basicDuration) * Number(this.state.basicRate);
    var overtime = Number(this.state.overtimeDuration) * Number(this.state.overtimeRate);
    var result = basic + overtime;
    this.setState({
      basicPay: basic,
      overtimePay: overtime,
      totalPay: result,
    });
  }

  render() {
    const invalidInput = <p className="invalid">Invalid Number</p>;
    const zero = <p className="invalid">Number must be more than zero</p>;
    const {
      totalDuration, basicDuration, overtimeDuration, limit, basicRate, overtimeRate, basicPay, overtimePay, totalPay
    } = this.state;

    return (
      <div className="body">
        <div className="App-header">
          <h2>Pay Calculation Form</h2>
        </div>
        <form className="form">
          <label>
            Shift Duration
            <input type="text" name="totalDuration" value={totalDuration} onChange={this.handleDurationChange} className="input" />
          </label>
          <div>{(isNaN(totalDuration) || totalDuration === '') ? invalidInput : [totalDuration > 0 ? totalDuration : zero]}</div>
          <label>
            Overtime Hour Limit
            <input type="text" name="limit" value={limit} onChange={this.handleDurationChange} className="input" />
          </label>
          <div>{(isNaN(limit) || limit === '') ? invalidInput : [limit > 0 ? limit : zero]}</div>
          <label>
            Basic Pay Rate
            <input type="text" name="basicRate" value={basicRate} onChange={this.handleRateChange} className="input" />
          </label>
          <div>{(isNaN(basicRate) || basicRate === '') ? invalidInput : [basicRate > 0 ? basicRate : zero]}</div>
          <label>
            Overtime Pay Rate
            <input type="text" name="overtimeRate" value={overtimeRate} onChange={this.handleRateChange} className="input" />
          </label>
          <div>{(isNaN(overtimeRate) || overtimeRate === '') ? invalidInput : [overtimeRate > 0 ? overtimeRate : zero]}</div>
        </form>

        <div className="texts">
          <p>Overtime Hours ({overtimeDuration}) = Shift Hours ({totalDuration}) - Overtime Limit ({limit})</p>
          <p>Basic Hours ({basicDuration}) = Shift Hours ({totalDuration}) - Overtime Hours ({overtimeDuration})</p>
          <p>Overtime Pay ({overtimePay}) = Overtime Hours ({overtimeDuration}) * Overtime Rate ({overtimeRate})</p>
          <p>Basic Pay ({basicPay}) = Basic Hours ({basicDuration}) * Basic Rate ({basicRate})</p>
          <p>Total Pay ({totalPay}) = Basic Pay ({basicPay}) + Overtime Pay ({overtimePay})</p>
        </div>
      </div>
    );
  }
}

export default App;
