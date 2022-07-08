import React, { Component } from 'react';
import StoreContext from '../Context/StoreContext';
import { choosePrice } from '../utils/ChoosePrice';
import Attributes from './Attributes';
import Colors from './Colors';

export default class DetailedCard extends Component {
  static contextType = StoreContext;
  render() {
    const { product, selectedAttributes, setAttributes } = this.props;
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
          product.attributes.map(({ name, items }) => (
            <div key={name}>
              <h2>{name}</h2>
              <div>
                {items.map((attribute) => {
                  if (name === 'Color') {
                    return (
                      <Colors
                        attribute={attribute}
                        name={name}
                        selectedAttributes={selectedAttributes}
                        setAttributes={setAttributes}
                        key={attribute.displayValue}
                      />
                    );
                  }
                  return (
                    <Attributes
                      attribute={attribute}
                      name={name}
                      selectedAttributes={selectedAttributes}
                      setAttributes={setAttributes}
                      key={attribute.displayValue}
                    />
                  );
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
