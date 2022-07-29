import React, { Component } from 'react';
import CartItems from '../Components/CartItems';
import StoreContext from '../Context/StoreContext';

export default class CartPage extends Component {
  static contextType = StoreContext;
  render() {
    return (
      <div>
        <h1 className="cart-title">Cart</h1>
        <div className="cart-page-container">
          <CartItems />
        </div>
      </div>
    );
  }
}
