import React, { Component } from 'react';
import StoreContext from '../Context/StoreContext';
import { choosePrice } from '../utils/ChoosePrice';
import Attributes from './Attributes';

export default class DetailedCard extends Component {
  static contextType = StoreContext;

  render() {
    const { product, selectedAttributes, setAttributes } = this.props;
    const { currency, addToCart } = this.context;

    function addProduct(product) {
      return product = { ...product, selected: selectedAttributes };
    }

    function enableButton() {
      if (!selectedAttributes) return true;

      if (product.attributes) {
        return (
          product.attributes.length !== Object.keys(selectedAttributes).length
        );
      }

      return true;
    }

    return (
      <>
        {product && (
          <div>
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
                      return (
                        <Attributes
                          attribute={attribute}
                          name={name}
                          selectedAttributes={selectedAttributes}
                          setAttributes={setAttributes}
                          key={attribute.displayValue}
                          isCartItem={false}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            {product.prices && choosePrice(product.prices, currency)}
            {product && (
              <button
                disabled={enableButton()}
                onClick={() => addToCart(addProduct(product))}
              >
                Add to Cart
              </button>
            )}
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        )}
      </>
    );
  }
}
