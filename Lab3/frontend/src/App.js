import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './Components/Main';
import './App.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducers';
import { initialState } from './reducers/reducers';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <ApolloProvider client={client}>
            <Main />
          </ApolloProvider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
