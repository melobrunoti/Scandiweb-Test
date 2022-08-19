import React, { Component } from 'react';
import CartItems from '../Components/CartItems';
import StoreContext from '../Context/StoreContext';

export default class CartPage extends Component {
  static contextType = StoreContext;
  render() {
    const { currency, getTotal, currencies, getQuantity, closeCurrency } =
      this.context;

    const getSymbol = () => {
      const symbol = currencies.find((c) => c.label === currency);
      if (symbol) {
        return symbol.symbol;
      }
    };

    return (
      <div onClick={() => closeCurrency()} className="order-container">
        <h1 className="cart-title">Cart</h1>
        <div className="cart-page-container">
          <CartItems miniCart="regular" />
        </div>
        <div className="order-total-container">
          <h3>
            Tax 21%: <span>{(getTotal() * 0.21).toFixed(2)}</span>
          </h3>
          <h3>
            Quantity: <span>{getQuantity()}</span>
          </h3>
          <h3>
            Total:{' '}
            <span>
              {' '}
              {getSymbol()}
              {getTotal().toFixed(2)}
            </span>{' '}
          </h3>
          <button className="button green-button order-button">Order</button>
        </div>
      </div>
    );
  }
}
