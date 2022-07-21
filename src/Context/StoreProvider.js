import StoreContext from './StoreContext';

import React, { Component } from 'react';

export default class StoreProvider extends Component {
  // Context state
  state = {
    currency: 'USD',
    cart: [],
  };

  addToCart = (product, attributes) => {
    product = { ...product, selected: attributes };
    this.setState({
      cart: [...this.state.cart, product],
    });
  };

  setCurrency = (currency) => {
    this.setState((prevState) => ({ currency }));
  };

  render() {
    const { currency, cart } = this.state;
    const { setCurrency, addToCart } = this;
    return (
      <StoreContext.Provider
        value={{
          currency,
          setCurrency,
          cart,
          addToCart,
        }}
      >
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}
