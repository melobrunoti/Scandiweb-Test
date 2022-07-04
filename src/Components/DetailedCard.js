import React, { Component } from 'react';
import StoreContext from '../Context/StoreContext';
import { choosePrice } from '../utils/ChoosePrice';

export default class DetailedCard extends Component {
  static contextType = StoreContext;
  render() {
    const product = this.props.product;
    const { currency } = this.context;
    return (
      <>
        <div>
          {product.gallery &&
            product.gallery.map((item) => (
              <img
                key={item}
                src={item}
                alt={item}
                className="product-card__image"
              ></img>
            ))}
        </div>
        <h1>{product.brand}</h1>
        <h2>{product.name}</h2>
        {product.attributes &&
          product.attributes.map((item) => (
            <div key={item.name}>
              <h2>{item.name}</h2>
              <div>
                {item.items.map((att) => {
                  if (item.name === 'Color') {
                    return (
                      <div
                        key={att.displayValue}
                        style={{ backgroundColor: att.value }}
                      >
                        -
                      </div>
                    );
                  }
                  return <div key={att.displayValue}>{att.displayValue}</div>;
                })}
              </div>
              {choosePrice(product.prices, currency)}
            </div>
          ))}

        <button>Add to Cart</button>
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
      </>
    );
  }
}
