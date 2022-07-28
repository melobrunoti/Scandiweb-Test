import StoreContext from './StoreContext';

import React, { Component } from 'react';
import { choosenPrice } from '../utils/ChoosePrice';

export default class StoreProvider extends Component {
  // Context state
  state = {
    currency: 'USD',
    cart: [],
  };

  componentDidMount() {
    this.getCurrencyFromLocalStorage();
    this.getCartFromLocalStorage();
  }

  setCurrency = (currency) => {
    this.setState(() => ({ currency }));
    localStorage.setItem('currency', JSON.stringify(currency));
  };

  getCurrencyFromLocalStorage = (localCurrency) => {
    const local = localStorage.getItem('currency');
    const currency = JSON.parse(local);

    if (currency !== null) {
      this.setState(() => ({ currency }));
    }
  };

  getCartFromLocalStorage = () => {
    const local = localStorage.getItem('cart');
    const cart = JSON.parse(local);

    if (cart) {
      this.setState(() => ({ cart }));
    }
  };

  addToCart = async (product) => {
    const customId = `${product.id}${Object.values(product.selected)}`;

    this.setState((prevState) => {
      if (
        !prevState.cart?.some(
          (item) => Object.keys(item).toString() === customId
        )
      ) {
        const createItem = [
          ...prevState.cart,
          { [customId]: { ...product, quantity: 1 } },
        ];
        localStorage.setItem('cart', JSON.stringify(createItem));
        return { cart: createItem };
      }

      return {
        cart: prevState.cart.map((item) => {
          const customItem = item[customId];
          if (Object.keys(item).toString() === customId) {
            const increaseItem = {
              [customId]: { ...customItem, quantity: customItem.quantity + 1 },
            };
            localStorage.setItem('cart', JSON.stringify(increaseItem));
            return increaseItem;
          }
          return item;
        }),
      };
    });
  };

  removeFromCart = (product) => {
    const customId = `${product.id}${Object.values(product.selected)}`;

    this.setState((prevState) => {
      if (
        prevState.cart.find(
          (item) => Object.keys(item).toString() === customId
        )?.[customId]?.quantity === 1
      ) {
        const removeItem = {
          cart: prevState.cart.filter(
            (item) => Object.keys(item).toString() !== customId
          ),
        };
        localStorage.setItem('cart', JSON.stringify(removeItem));
        return removeItem;
      }

      return {
        cart: prevState.cart.map((item) => {
          const customItem = item[customId];
          if (Object.keys(item).toString() === customId) {
            const removeItem = {
              [customId]: { ...customItem, quantity: customItem.quantity - 1 },
            };
            localStorage.setItem('cart', JSON.stringify(removeItem));
            return removeItem;
          }
          return item;
        }),
      };
    });
  };

  getTotal = () => {
    return this.state.cart.reduce((total, cartItem) => {
      const item = cartItem[Object.keys(cartItem)];
      const price = choosenPrice(item.prices, this.state.currency);
      return total + price * item.quantity;
    }, 0);
  };

  render() {
    const { currency, cart } = this.state;
    const { setCurrency, addToCart, removeFromCart, getTotal, getLocal } = this;
    return (
      <StoreContext.Provider
        value={{
          currency,
          setCurrency,
          cart,
          addToCart,
          removeFromCart,
          getTotal,
          getLocal,
        }}
      >
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}
