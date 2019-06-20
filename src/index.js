import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import DevTools from 'mobx-react-devtools';
import { observable, computed } from 'mobx'
import { observer } from 'mobx-react'

const nickName = new class UserNickName {
  @observable firstName = 'Andrei'
  @observable age = 25

  @computed get nickName() {
    return `${this.firstName}-${this.age}`
  }
}

nickName.increment = function() {
  this.age++
}
nickName.decrement = function() {
  this.age--
}

@observer
class Counter extends Component {
  handleClickDecrement = () => this.props.store.decrement()
  handleClickIncrement = () => this.props.store.increment()

  render() {
    return (
      <div className="App">
        <DevTools />
        <h1>{this.props.store.nickName}</h1>
        <button onClick={this.handleClickDecrement}>-1</button>
        <button onClick={this.handleClickIncrement}>+1</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter store={nickName} />, document.getElementById('root'));

serviceWorker.unregister();
