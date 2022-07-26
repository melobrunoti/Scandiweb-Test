import React, { Component } from 'react';
import StoreContext from '../Context/StoreContext';
import { choosePriceAndSymbol } from '../utils/ChoosePrice';
import Attributes from './Attributes';

export default class CartItems extends Component {
  static contextType = StoreContext;

  constructor() {
    super();
    this.state = { cart: [] };
  }

  render() {
    const { currency, getTotal, cart } = this.context;

    return (
      <div>
        {cart &&
          cart.map((item) => {
            const product = item[Object.keys(item)];
            return (
              <div key={product.name}>
                <h2>{product.brand}</h2>
                <h3>{product.name}</h3>
                <span>{choosePriceAndSymbol(product.prices, currency)}</span>
                {product.attributes &&
                  product.attributes.map(({ name, items }) => (
                    <div key={name}>
                      <h2>{name}</h2>
                      <div>
                        {items.map((attribute) => {
                          return (
                            <Attributes
                              attribute={attribute}
                              name={name}
                              selectedAttributes={product.selected}
                              // setAttributes={setAttributes}
                              key={attribute.displayValue}
                              isCartItem={true}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            );
          })}
        <h2>{getTotal()}</h2>
      </div>
    );
  }
}
