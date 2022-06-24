import StoreContext from './StoreContext';

import React, { Component } from 'react';

export default class StoreProvider extends Component {
  currencyState = {
    currency: 'USD',
  };

  chooseCurrency = (currency) => {
    this.setState({ currency });
  };

  render() {
    const { currency } = this.currencyState;
    const { chooseCurrency } = this;
    return (
      <StoreContext.Provider
        value={{
          currency,
          chooseCurrency,
        }}
      >
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}
