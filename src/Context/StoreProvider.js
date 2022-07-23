import StoreContext from './StoreContext';

import React, { Component } from 'react';

export default class StoreProvider extends Component {
  // Context state
  state = {
    currency: 'USD',
    cart: [],
  };

  addToCart = (product) => {
    const customId = `${product.id}${Object.values(product.selected)}`;

    this.setState((prevState) => {
      if (
        !prevState.cart.some(
          (item) => Object.keys(item).toString() === customId
        )
      ) {
        return {
          cart: [
            ...prevState.cart,
            { [customId]: { ...product, quantity: 1 } },
          ],
        };
      }

      return {
        cart: prevState.cart.map((item) => {
          const customItem = item[customId];
          if (Object.keys(item).toString() === customId) {
            return {
              [customId]: { ...customItem, quantity: customItem.quantity + 1 },
            };
          }
          return item;
        }),
      };
    });
  };

  removeItem = (product) => {
    const customId = `${product.id}${Object.values(product.selected)}`;

    this.setState((prevState) => {
      const customItem = prevState.cart.find((item) => Object.keys(item).toString() === customId);
      const test = customItem[customId];
      if (test.quantity === 1) {

        console.log(prevState.cart.filter(((item) => Object.keys(item).toString() !== customId)));
        return {
          cart: 
            prevState.cart.filter(((item) => Object.keys(item).toString() !== customId)),
          
        }
      }

      return {
        cart: prevState.cart.map((item) => {
          const customItem = item[customId];
          if (Object.keys(item).toString() === customId) {
            return {
              [customId]: { ...customItem, quantity: customItem.quantity - 1  },
            };
          }
          return item;
        }),
      };
    });
  };


  setCurrency = (currency) => {
    this.setState(() => ({ currency }));
  };

  render() {
    const { currency, cart } = this.state;
    const { setCurrency, addToCart, removeItem } = this;
    return (
      <StoreContext.Provider
        value={{
          currency,
          setCurrency,
          cart,
          addToCart,
          removeItem,
        }}
      >
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}
