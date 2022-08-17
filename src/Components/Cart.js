import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../Context/StoreContext';
import CartItems from './CartItems';

export default class Cart extends Component {
  static contextType = StoreContext;
  render() {
    const { getTotal, currencies, currency } = this.context;

    const getSymbol = () => {
      const symbol = currencies.find((c) => c.label === currency);
      if (symbol) {
        return symbol.symbol;
      }
    };

    return (
      <div className="show-cart-container">
        <CartItems miniCart="small" />
        <div className="mini-cart-container">
          <h3 className="mini-cart-total">Total: </h3>
          <span className="mini-cart-total">
            {' '}
            {getSymbol()}
            {getTotal().toFixed(2)}
          </span>
        </div>

        <div className="mini-cart">
          <button to="/cart" className="button white-button mini-cart-button">
            <Link to="/cart" className="button-link">
              {' '}
              View Bag
            </Link>
          </button>
          <button className="button  green-button mini-cart-button">
            Check Out
          </button>
        </div>
      </div>
    );
  }
}
