import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import DevTools from 'mobx-react-devtools';
import { observable } from 'mobx'
import { observer } from 'mobx-react'

const counterState = observable({
  count: 0,
})

counterState.increment = function() {
  this.count++
}
counterState.decrement = function() {
  this.count--
}

@observer
class Counter extends Component {
  handleClickDecrement = () => this.props.store.decrement()
  handleClickIncrement = () => this.props.store.increment()

  render() {
    return (
      <div className="App">
        <DevTools />
        <h1>Count: {this.props.store.count}</h1>
        <button onClick={this.handleClickDecrement}>-1</button>
        <button onClick={this.handleClickIncrement}>+1</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter store={counterState} />, document.getElementById('root'));

serviceWorker.unregister();
