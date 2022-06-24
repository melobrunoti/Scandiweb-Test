import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from '@apollo/client';

import { onError } from '@apollo/client/link/error';
import React, { Component } from 'react';
import Header from './Components/Header';

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([errorLink, new HttpLink({ uri: 'http://localhost:4000' })]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

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
