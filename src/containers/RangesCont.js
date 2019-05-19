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

    if (newArray.length) {
      for (let i = 0, l = newArray.length; i < l; i++) {
        if (newArray[i][1] < inputArray[0] - 1 || newArray[i][0] > inputArray[1] + 1) {
          continue;
        }
        if (newArray[i][0] < inputArray[0] && newArray[i][1] > inputArray[1]) {
          counter++;

          continue;
        }
        if ((newArray[i][0] <= inputArray[0] && newArray[i][1] < inputArray[1]) || (newArray[i][1] + 1 === inputArray[0])) {
          newArray[i][1] = inputArray[1];
          counter++;

          continue;
        }
        if ((newArray[i][0] > inputArray[0] && newArray[i][1] >= inputArray[1]) || (newArray[i][0] - 1 === inputArray[1])) {
          newArray[i][0] = inputArray[0];
          counter++;

          continue;
        }
        if (newArray[i][0] > inputArray[0] && newArray[i][1] < inputArray[1]) {
          newArray[i][0] = inputArray[0];
          newArray[i][1] = inputArray[1];
          counter++;

          continue;
        }
      }
    }

    if (!counter) {
      newArray.push(inputArray);
    }

    if (newArray.length > 1) {
      newArray.sort((a, b) => {
        return a[0] - b[0];
      });

      newArray.reduce((prevValue, currValue, index) => {
        if (prevValue[1] >= currValue[0]) {
          prevValue[1] = currValue[1];

          newArray.splice(index, 1);
        }

        return currValue;
      });
    }

    this.setListView(newArray);
    this.setState({ list: newArray });
  }
  removeRange = async (inputArray) => {

    let newArray = this.state.list;
    let indexesToRemove = [];
    let counter = 0;

    if (newArray.length) {
      for (let i = 0, l = newArray.length; i < l; i++) {
        if (!newArray.length) {
          break;
        }
        if (!newArray[i] || newArray[i][1] < inputArray[0] - 1 || newArray[i][0] > inputArray[1] + 1) {
          continue;
        }
        if (newArray[i][0] < inputArray[0] && newArray[i][1] > inputArray[1]) {
          const newGap = [inputArray[1] + 1, newArray[i][1]];

          newArray.push(newGap);
          newArray[i][1] = inputArray[0] - 1;
          counter++;

          continue;
        }
        if (newArray[i][0] <= inputArray[0]) {
          newArray[i][0] === inputArray[0] ? indexesToRemove.push(i) : newArray[i][1] = inputArray[0] - 1;
          counter++;

          continue;
        }
        if (newArray[i][1] >= inputArray[1]) {
          newArray[i][1] === inputArray[1] ? indexesToRemove.push(i) : newArray[i][0] = inputArray[1] + 1;
          counter++;

          continue;
        }
        if (newArray[i][0] > inputArray[0] && newArray[i][1] < inputArray[1]) {
          indexesToRemove.push(i);
          counter++;

          continue;
        }
      }
    } else {
      alert('There are no values in the list');
    }

    if (indexesToRemove.length) {
      for (let i = indexesToRemove.length - 1, l = 0; i >= l; i--) {
        newArray.splice(indexesToRemove[i], 1);
      }
    }

    newArray.sort((a, b) => {
      return a[0] - b[0];
    });

    if (counter) {
      this.setListView(newArray);
      await this.setState({ list: newArray, cleaningField: true });
    } else {
      await this.setState({ cleaningField: false });
      alert('Gap not found in list');
    }
  }
  setListView(newArray) {
    let resultString = '';

    for (let i = 0, l = newArray.length; i < l; i++) {
      resultString += `[${newArray[i]}] `;
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
