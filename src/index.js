import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import DevTools from 'mobx-react-devtools';
import { observable } from 'mobx'
import { observer } from 'mobx-react'

@observer
class Counter extends Component {
  @observable count = 0

  handleIncrement = () => this.count++
  handleDecrement = () => this.count--

  render() {
    return (
      <div className="App">
        <DevTools />
        <h1>Count: {this.count}</h1>
        <button onClick={this.handleIncrement}>+1</button>
        <button onClick={this.handleDecrement}>-1</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById('root'));

serviceWorker.unregister();
