import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import DevTools from 'mobx-react-devtools';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

const nickName = observable({
  firstName: 'Andrei',
  age: 25,

  get nickName() {
    return `${this.firstName}-${this.age}`;
  },

  increment() {
    this.age++;
  },
  decrement() {
    this.age--;
  },
});

const todos = observable([
  { text: 'Learn React' },
  { text: 'Learn MobX' },
])

@observer
class Counter extends Component {
  handleClickDecrement = () => this.props.store.nickName.decrement();
  handleClickIncrement = () => this.props.store.nickName.increment();

  render() {
    return (
      <div className="App">
        <DevTools />
        <h1>{this.props.store.nickName.nickName}</h1>
        <button onClick={this.handleClickDecrement}>-1</button>
        <button onClick={this.handleClickIncrement}>+1</button>

        <ul>
          {this.props.store.todos.map(({ text }) => <li key={text}>{text}</li>)}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<Counter store={{ nickName, todos }} />, document.getElementById('root'));

serviceWorker.unregister();
