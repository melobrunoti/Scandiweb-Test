import React, { Component } from 'react';
import StoreContext from '../Context/StoreContext';
import { choosePriceAndSymbol } from '../utils/ChoosePrice';
import Attributes from './Attributes';
import arrowRight from '../assets/arrowRight.svg';
import arrowLeft from '../assets/arrowLeft.svg';

export default class CartItems extends Component {
  static contextType = StoreContext;

  constructor() {
    super();
    this.state = { cart: [] };
    this.state = { selectedImage: [] };
  }

  render() {
    const { currency, cart, addToCart, removeFromCart } = this.context;

    const { miniCart } = this.props;

    const nextImg = (index, length) => {
      this.setState((prevState) => {
        if (
          !prevState.selectedImage.some((item) => item.id === index) &&
          length !== 1
        ) {
          return {
            selectedImage: [
              ...prevState.selectedImage,
              { id: index, value: 1 },
            ],
          };
        }

        return {
          selectedImage: prevState.selectedImage.map((item) => {
            if (item.id === index && item.value < length - 1) {
              return { ...item, value: item.value + 1 };
            }
            return item;
          }),
        };
      });
    };

    const previusImg = (index) => {
      this.setState((prevState) => {
        return {
          selectedImage: prevState.selectedImage.map((item) => {
            if (item.id === index && item.value > 0) {
              return { ...item, value: item.value - 1 };
            }
            return item;
          }),
        };
      });
    };

    const getImg = (e) => {
      const img = this.state.selectedImage?.find((i) => i.id === e);
      if (img) {
        return img.value;
      }
      return 0;
    };

    return (
      <div className={`container-${miniCart}`}>
        {miniCart === 'small' && <h2 className="mini-cart-title">My Bag</h2>}
        {cart.length >= 1 && (
          <div className={`container-${miniCart}-items`}>
            {cart.map((item, index) => {
              const product = item[Object.keys(item)];
              return (
                <div className={`cart-item__container-${miniCart}`} key={index}>
                  <div className={`cart-item-${miniCart}`}>
                    <h2 className="">{product.brand}</h2>
                    <h3 className="">{product.name}</h3>
                    <span>
                      {choosePriceAndSymbol(product.prices, currency)}
                    </span>

                    <div className="attributes-container">
                      {product.attributes &&
                        product.attributes.map(({ name, items }) => (
                          <div
                            className="detailed-card__product__attributes"
                            key={name}
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
                                    selectedAttributes={product.selected}
                                    key={attribute.displayValue}
                                    isCartItem={true}
                                    miniCart={miniCart}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div
                    className={`cart-item__image-container image-container-${miniCart}`}
                  >
                    <div
                      className={`cart-item__image-container-btn-container-${miniCart}`}
                    >
                      <button
                        onClick={() => addToCart(product)}
                        className={`cart-item__image-container-btn-container-${miniCart}__btn`}
                      >
                        +
                      </button>
                      <span>{product.quantity}</span>
                      <button
                        onClick={() => removeFromCart(product)}
                        className={`cart-item__image-container-btn-container-${miniCart}__btn`}
                      >
                        -
                      </button>
                    </div>

                    <div
                      className={`cart-item__image-container-img-${miniCart}`}
                    >
                      {product.gallery && (
                        <>
                          <img
                            src={product.gallery[getImg(index)]}
                            alt={product.name}
                            className="cart-item__image"
                          />
                          <div className="cart-item__image__buttons">
                            <button
                              className="cart-item__image__buttons__btn"
                              onClick={() => previusImg(index)}
                            >
                              {<img src={arrowLeft} alt="previous img" />}
                            </button>
                            <button
                              className="cart-item__image__buttons__btn"
                              onClick={() =>
                                nextImg(index, product.gallery.length)
                              }
                            >
                              {<img src={arrowRight} alt="next img" />}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
