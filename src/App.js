import './App.css';
import { ApolloProvider } from '@apollo/client';

import React, { Component } from 'react';
import Header from './Components/Header';
import client from './Connection/Client';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Tech from './Pages/Tech';
import Clothes from './Pages/Clothes';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/tech" element={<Tech />}></Route>
          <Route path="/clothes" element={<Clothes />}></Route>
        </Routes>
      </ApolloProvider>
    );
  }
}

export default App;
