import StoreContext from './StoreContext';

import React, { Component } from 'react';
import { choosenPrice } from '../utils/ChoosePrice';
import { loadCurrencies } from '../GraphQL/CurrencyQueries';
import client from '../Connection/Client';

export default class StoreProvider extends Component {
  constructor(props) {
    super(props);

    // rest of your code
    this._isMounted = false;
  }
  // Context state
  state = {
    currency: 'USD',
    cart: [],
    currencies: [],
  };

  async componentDidMount() {
    this._isMounted = true;
    this._isMounted === true && this.getCurrencyFromLocalStorage();
    this._isMounted === true && this.getCartFromLocalStorage();

    const fetchCurrencies = await client.query({
      query: loadCurrencies,
    });

    const currencies = fetchCurrencies.data.currencies;

    this._isMounted === true && this.setState(() => ({ currencies }));
  }

  componentDidUpdate() {
    this._isMounted === true &&
      localStorage.setItem('cart', JSON.stringify(this.state.cart));
  }

  componentWillUnmount() {
    this._isMounted = false;
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

        return { cart: createItem };
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

        return removeItem;
      }

      return {
        cart: prevState.cart.map((item) => {
          const customItem = item[customId];
          if (Object.keys(item).toString() === customId) {
            const removeItem = {
              [customId]: { ...customItem, quantity: customItem.quantity - 1 },
            };

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

  getTotalLength = () => {
    return this.state.cart.reduce((total, cartItem) => {
      const item = cartItem[Object.keys(cartItem)];
      return total + item.quantity;
    }, 0);
  };

  getQuantity = () => {
    return this.state.cart.reduce((total, cartItem) => {
      const item = cartItem[Object.keys(cartItem)];
      return total + item.quantity;
    }, 0);
  };

  render() {
    const { currency, cart, currencies } = this.state;
    const {
      setCurrency,
      addToCart,
      removeFromCart,
      getTotal,
      getLocal,
      getQuantity,
      getTotalLength,
    } = this;
    return (
      <StoreContext.Provider
        value={{
          currencies,
          currency,
          setCurrency,
          cart,
          addToCart,
          removeFromCart,
          getTotal,
          getLocal,
          getQuantity,
          getTotalLength,
        }}
      >
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}
