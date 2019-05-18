import React from 'react';
import Ranges from '../components/Ranges'

class RangesCont extends React.Component {
  state = {
    list: [],
    listView: '',
    cleaningField: false
  }
  addRange = async (inputArray) => {
    let newArray = this.state.list;
    let counter = 0;

    for (let i = inputArray[0], l = inputArray[1]; i <= l; i++) {
      if (!newArray.includes(i)) {
        newArray.push(i);
        counter++;
      }
    }

    if (counter) {
      newArray.sort((a, b) => a - b);

      this.setListView(newArray);
      await this.setState({ list: newArray, cleaningField: true });
    } else {
      await this.setState({ cleaningField: false });
      alert('Gap already added previously');
    }
  }
  removeRange = async (inputArray) => {
    let newArray = this.state.list;
    let counter = 0;

    for (let i = inputArray[0], l = inputArray[1]; i <= l; i++) {
      let index = newArray.indexOf(i);

      if (index !== -1) {
        newArray.splice(index, 1);
        counter++;
      }
    }

    if (counter) {
      this.setListView(newArray);
      await this.setState({ list: newArray, cleaningField: true });
    } else {
      await this.setState({ cleaningField: false });
      alert('Gap not found in list');
    }
  }
  setListView(newArray) {
    let startGap = [newArray[0]];
    let endGap = [];
    let resultString = '';

    newArray.reduce((prevValue, currValue) => {
      if ((currValue - prevValue) > 1) {
        startGap.push(currValue);
        endGap.push(prevValue);
      }

      return currValue;
    });

    endGap.push(newArray[newArray.length - 1]);

    for (let i = 0, l = startGap.length; i < l; i++) {
      resultString += `[${startGap[i]}, ${endGap[i]}] `;
    }

    this.setState({ listView: resultString });
  }
  render() {
    return (
      <Ranges
        list={this.state.listView}
        addRange={this.addRange}
        removeRange={this.removeRange}
        cleaningField={this.state.cleaningField}
      />
    );
  }
}

export default RangesCont;
