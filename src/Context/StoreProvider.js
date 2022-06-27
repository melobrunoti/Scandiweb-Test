import StoreContext from './StoreContext';

import React, { Component } from 'react';

export default class StoreProvider extends Component {
  // Context state
  state = {
    currency: 'USD',
  };

  // Method to update state
  setUser = (user) => {
    this.setState((prevState) => ({ user }));
  };

  setCurrency = (currency) => {
    this.setState((prevState) => ({ currency }));
  };

  render() {
    const { currency } = this.state;
    const { setCurrency } = this;
    return (
      <StoreContext.Provider
        value={{
          currency,
          setCurrency,
        }}
      >
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}
