import React, { Component } from 'react';
import CartItems from '../Components/CartItems';
import StoreContext from '../Context/StoreContext';

export default class CartPage extends Component {
  static contextType = StoreContext;
  render() {
    return (
      <div>
        <h1>Cart</h1>
        <div>
          <CartItems />
        </div>
      </div>
    );
  }
}
