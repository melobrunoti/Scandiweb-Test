import React, { Component } from 'react';
import StoreContext from '../Context/StoreContext';

export default class CustomSelect extends Component {
  static contextType = StoreContext;
  render() {
    const { setCurrency, currencies } = this.context;
    return (
      <div>
        <div className="select">
          {currencies.map(({ label, symbol }) => (
            <div
              className="option"
              key={label}
              onClick={() => {
                setCurrency(label);
              }}
            >
              {`${symbol} ${label}`}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
