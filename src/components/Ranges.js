import React from 'react';
import './Ranges.scss'

class Ranges extends React.Component {
  state = {
    startGapValue: '',
    endGapValue: '',
  }

  changeHandlerForInput(type, event) {
    if (parseInt(event.target.value, 10) !== this.state[type + 'Value']) {
      this.setState({ [type + 'Value']: event.target.value });
    }
  }
  async clickHandlerForButton(type) {
    const inputArray = [parseInt(this.state.startGapValue, 10), parseInt(this.state.endGapValue, 10)];

    switch (type) {
      case 'add': {
        await this.props.addRange(inputArray);
        break;
      }
      case 'remove': {
        await this.props.removeRange(inputArray);
        break;
      }
      default: {
        console.error('Undefined action');
      }
    }
    if (this.props.cleaningField) {
      this.setState({
        startGapValue: '',
        endGapValue: ''
      })
    }
  }
  render() {
    return (
      <>
        <div className="List">
          <p>Current list</p>
          <p>
            {this.props.list}
          </p>
        </div>
        <div className="Start-Block">
          <label htmlFor="start">
            Start gap
          </label>
          <input
            id="start"
            type="number"
            onChange={(e) => { this.changeHandlerForInput('startGap', e) }}
            value={this.state.startGapValue}
          />
        </div>
        <div className="End-Block">
          <label htmlFor="end">
            End gap
          </label>
          <input
            id="end"
            type="number"
            onChange={(e) => { this.changeHandlerForInput('endGap', e) }}
            value={this.state.endGapValue}
          />
        </div>
        <button
          className="Button Button-Add"
          onClick={() => { this.clickHandlerForButton('add') }}
        >
          Add
        </button>
        <button
          className="Button Button-Remove"
          onClick={() => { this.clickHandlerForButton('remove') }}
        >
          Remove
        </button>
      </>
    );
  }
}

export default Ranges;