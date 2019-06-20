import './index.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observable, computed, configure, action, decorate } from 'mobx';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
configure({ enforceActions: 'observed' });

class Store {
  @observable devsList = [
    { name: "Jack", sp: 12 },
    { name: "Max", sp: 10 },
		{ name: "Leo", sp: 8 },
  ];

  @observable filter = ''

	@computed get totalSum() {
    return this.devsList.reduce((summ, { sp }) => {
      return summ + sp
    }, 0)
  };
 
  @computed get topPerformer() {
    return this.devsList.reduce((acc, dev) => {
      return dev.sp > acc.sp ? dev : acc
    }, { name: '', sp: 0 })
  };

  @computed get filteredDevelopers() {
    const matchesFilter = new RegExp(this.filter, 'i')
    return this.devsList.filter(({ name }) => !this.filter || matchesFilter.test(name))
  }

  @action clearList() { 
    this.devsList = []
  };

  @action addDeveloper(dev) {
    this.devsList.push(dev)
  };

  @action updateFilter(value) {
    this.filter = value
  }
};

// decorate(Store, {
//   devsList: observable,
//   totalSum: computed,
//   topPerformer: computed,
//   clearList: action,
//   addDeveloper: action,
// })

const appStore = new Store();

const Row = ({ data: { name, sp } }) => {
  return (
		<tr>
    	<td>{name}</td>
    	<td>{sp}</td>
  	</tr>
	);
};

@observer
class Table extends Component {
  render() {
    const { store } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <td>Name:</td>
            <td>SP:</td>
          </tr>
        </thead>
        <tbody>
          {store.filteredDevelopers.map((dev, i) => <Row key={i} data={dev} />)}
        </tbody>
        <tfoot>
          <tr>
            <td>Team SP:</td>
            <td>{store.totalSum}</td>
          </tr>
          <tr>
            <td>Top Performer:</td>
            <td>{store.topPerformer ? store.topPerformer.name : ''}</td>
          </tr>
        </tfoot>
      </table>
		);
  }
}

@observer
class Controls extends Component {
  addDeveloper = () => {
    const name = prompt("The name:");
    const sp = parseInt(prompt("The story points:"), 10);
    this.props.store.addDeveloper({ name, sp });
  }

  clearList = () => { this.props.store.clearList(); }

  onChangeFilter = ({ target }) => this.props.store.updateFilter(target.value)

  render() {
    return (
			<div className="controls">
      	<button onClick={this.clearList}>Clear table</button>
      	<button onClick={this.addDeveloper}>Add record</button>
        <input type="text" value={this.props.store.filter} onChange={this.onChangeFilter}/>
    	</div>
		);
  }
}

class App extends Component {
  render() {
    return (
      <div>
				<DevTools />
        <h1>Sprint Board:</h1>
        <Controls store={appStore} />
        <Table store={appStore} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));