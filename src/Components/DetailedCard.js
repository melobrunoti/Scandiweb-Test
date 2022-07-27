import React, { Component } from 'react';
import StoreContext from '../Context/StoreContext';
import { choosePriceAndSymbol } from '../utils/ChoosePrice';
import Attributes from './Attributes';

export default class DetailedCard extends Component {
  static contextType = StoreContext;

  constructor(props) {
    super(props);
    this.state = { selectedImage: 0 };
  }

  render() {
    const { product, selectedAttributes, setAttributes } = this.props;
    const { currency, addToCart } = this.context;

    function addProduct(product) {
      return (product = { ...product, selected: selectedAttributes });
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

    const chooseImage = (index) => {
      this.setState({ selectedImage: index });
    };
    return (
      <div className="detailed-card">
        {product && (
          <div>
            <div>
              {product.gallery &&
                product.gallery.map((item, index) => (
                  <img
                    onClick={() => chooseImage(index)}
                    key={item}
                    src={item}
                    alt={item}
                    className="not-selected"
                  ></img>
                ))}
            </div>
            <div>
              {product.gallery && (
                <img src={product.gallery[this.state.selectedImage]} alt="oi" />
              )}
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
            {product.prices && choosePriceAndSymbol(product.prices, currency)}
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
      </div>
    );
  }
}
