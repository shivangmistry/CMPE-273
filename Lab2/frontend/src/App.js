import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './Components/Main';
import './App.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducers';
import { initialState } from './reducers/reducers';

const store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
        <div>
          <Main />
        </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
