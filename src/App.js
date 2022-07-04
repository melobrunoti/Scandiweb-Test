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
          <Route exact path="/all" component={Home}></Route>
          <Route exact path="/product/:id" component={DetailedPage}></Route>
          <Route exact path="/tech" component={Tech}></Route>
          <Route path="/clothes" component={Clothes}></Route>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
