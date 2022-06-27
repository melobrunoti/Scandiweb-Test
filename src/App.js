import './App.css';
import { ApolloProvider } from '@apollo/client';

import React, { Component } from 'react';
import Header from './Components/Header';
import client from './Connection/Client';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Header />
      </ApolloProvider>
    );
  }
}

export default App;
