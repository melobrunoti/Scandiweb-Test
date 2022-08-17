import React, { Component } from 'react';
import StoreContext from '../Context/StoreContext';

export default class CustomSelect extends Component {
  static contextType = StoreContext;
  render() {
    const { setCurrency, currencies } = this.context;
    const { toggleCurrency } = this.props;
    return (
      <div>
        <div className="select">
          {currencies.map(({ label, symbol }) => (
            <div
              className="option"
              key={label}
              onClick={() => {
                setCurrency(label);
                toggleCurrency();
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
