import React, { Component } from 'react';

import StoreContext from '../Context/StoreContext';

export default class Header extends Component {
  static contextType = StoreContext;

  render() {
    const { currency } = this.context;
    return <div>{currency}</div>;
  }
}
