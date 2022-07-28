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
          <div className="detailed-card__container">
            <div className="detailed-card__container__img">
              <div className="detailed-card__container__img__not-selected">
                {product.gallery &&
                  product.gallery.map((item, index) => (
                    <img
                      onClick={() => chooseImage(index)}
                      key={item}
                      src={item}
                      alt={item}
                      className="detailed-card__container__img__not-selected__image"
                    ></img>
                  ))}
              </div>
              <div className="detailed-card__container__img__selected-container">
                {product.gallery && (
                  <img
                    src={product.gallery[this.state.selectedImage]}
                    alt={product.name}
                    className="detailed-card__container__img__selected-container__img"
                  />
                )}
              </div>
            </div>
            <div className="detailed-card__container__info-container">
              <h1 className="detailed-card__product__brand">{product.brand}</h1>
              <h2 className="detailed-card__product__name">{product.name}</h2>
              <div className="attributes-container">
                {product.attributes &&
                  product.attributes.map(({ name, items }) => (
                    <div
                      key={name}
                      className="detailed-card__product__attributes"
                    >
                      <h3 className="detailed-card__product__attributes__name">
                        {name}
                      </h3>
                      <div className="detailed-card__product__attributes__attribute">
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
              </div>
              <h3 className="detailed-card__product__price__title">Price:</h3>
              <span className="detailed-card__product__price">
                {product.prices &&
                  choosePriceAndSymbol(product.prices, currency)}
              </span>
              {product && (
                <button
                  className="button detailed-card__button green-button"
                  disabled={enableButton()}
                  onClick={() => addToCart(addProduct(product))}
                >
                  Add to Cart
                </button>
              )}
              <div
                className="detailed-card__description"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
