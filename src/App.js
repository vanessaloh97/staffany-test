import React, { Component } from 'react';
import * as moment from 'moment';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalDuration: 1,
      basicDuration: 1,
      overtimeDuration: 0,
      limit: 1,
      basicRate: 1,
      overtimeRate: 1,
      basicPay: 1,
      overtimePay: 0,
      totalPay: 1,
      start: moment().format('LLL'),
      end: moment().add(8, 'hour').format('LLL'),
      startDisplay: 'hello',
      endDisplay: 'hello',
      errors: {
        totalDuration: ' ',
        limit: ' ',
        basicRate: ' ',
        overtimeRate: ' ',
      }
    }
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleRateChange = this.handleRateChange.bind(this);
    this.handleErrorCheck = this.handleErrorCheck.bind(this);
    // this.handleTimeChange = this.handleTimeChange.bind(this);
    this.calculatePay = this.calculatePay.bind(this);
  }

  //handle pay rate related changes
  handleRateChange(event) {
    const { name, value } = event.target;
    this.handleErrorCheck(name, value);
    this.setState({ [name]: value }, this.calculatePay);
  }

  //handle duration related changes
  handleDurationChange(event) {
    const { name, value } = event.target;
    var overtime = 0;
    var basic = 0;
    this.handleErrorCheck(name, value);

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

    this.setState({
      [name]: value,
      basicDuration: basic,
      overtimeDuration: overtime,
    }, this.calculatePay);
  }

  handleErrorCheck(name, value) {
    let errors = this.state.errors;
    switch (name) {
      case 'totalDuration':
        errors.totalDuration =
          (isNaN(value) || value === '')
            ? 'Invalid Number'
            : [value < 1 ? 'Number must be more than zero!' : ''];
        break;
      case 'limit':
        errors.limit =
          (isNaN(value) || value === '')
            ? 'Invalid Number'
            : [value < 1 ? 'Number must be more than zero!' : ''];
        break;
      case 'basicRate':
        errors.basicRate =
          (isNaN(value) || value === '')
            ? 'Invalid Number'
            : [value < 1 ? 'Number must be more than zero!' : ''];
        break;
      case 'overtimeRate':
        errors.overtimeRate =
          (isNaN(value) || value === '')
            ? 'Invalid Number'
            : [value < 1 ? 'Number must be more than zero!' : ''];
        break;
      default:
        break;
    }
  }

  calculatePay() {
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
    // const invalidTime = <span className="invalid">Invalid Time</span>;
    const {
      totalDuration,
      basicDuration,
      overtimeDuration,
      limit,
      basicRate,
      overtimeRate,
      basicPay,
      overtimePay,
      totalPay,
      startDisplay,
      endDisplay,
      errors
    } = this.state;

    return (
      <div>
        <div className="App-header">
          <h1>Pay Calculation Form</h1>
        </div>
        <form>
          {/* <p>Enter start and end time in the following format: 0000</p>
          <label>
            Start Time
            <input type="text" name="startDisplay" value={startDisplay} onChange={this.handleDurationChange} className="input" />
          </label>
          <div>{(isNaN(startDisplay) || startDisplay === '') ? invalidTime : [startDisplay > 0 ? startDisplay : zero]}</div>
          <label>
            End Time
            <input type="text" name="endDisplay" value={endDisplay} onChange={this.handleDurationChange} className="input" />
          </label>
          <div>{(isNaN(endDisplay) || endDisplay === '') ? invalidTime : [endDisplay > 0 ? endDisplay : zero]}</div> */}
          <label>
            Shift Duration
            <input type="text" name="totalDuration" value={totalDuration} onChange={this.handleDurationChange} />
          </label>
          <div>{errors.totalDuration.length > 0 && <span className='invalid'>{errors.totalDuration}</span>}</div>
          <label>
            Overtime Hour Limit
            <input type="text" name="limit" value={limit} onChange={this.handleDurationChange} />
          </label>
          <div>{errors.limit.length > 0 && <span className='invalid'>{errors.limit}</span>}</div>
          <label>
            Basic Pay Rate
            <input type="text" name="basicRate" value={basicRate} onChange={this.handleRateChange} />
          </label>
          <div>{errors.basicRate.length > 0 && <span className='invalid'>{errors.basicRate}</span>}</div>
          <label>
            Overtime Pay Rate
            <input type="text" name="overtimeRate" value={overtimeRate} onChange={this.handleRateChange} />
          </label>
          <div>{errors.overtimeRate.length > 0 && <span className='invalid'>{errors.overtimeRate}</span>}</div>
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