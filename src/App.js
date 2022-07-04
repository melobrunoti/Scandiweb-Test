import './App.css';
import { ApolloProvider } from '@apollo/client';

import React, { Component } from 'react';
import Header from './Components/Header';
import client from './Connection/Client';

import Home from './Pages/Home';
import Tech from './Pages/Tech';
import Clothes from './Pages/Clothes';
import DetailedPage from './Pages/DetailedPage';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={Home}></Route>
          <Route path="/:id" component={DetailedPage}></Route>
          <Route path="/tech/:id" component={DetailedPage}></Route>
          <Route path="/clothes/:id" component={DetailedPage}></Route>
          <Route path="/tech" component={Tech}></Route>
          <Route path="/clothes" component={Clothes}></Route>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
