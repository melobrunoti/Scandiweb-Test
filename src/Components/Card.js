import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../Context/StoreContext';
import { choosePriceAndSymbol } from '../utils/ChoosePrice';
import buyIcon from '../assets/buyIcon.svg';

export default class Card extends Component {
  static contextType = StoreContext;

  render() {
    const products = this.props.products;
    const { currency } = this.context;
    return (
      <div className="home">
        {products &&
          products.map(({ name, gallery, prices, inStock, category, id }) => {
            return (
              <div key={name} className="product-card">
                <div className="product-card__image-container">
                  <img
                    src={gallery[0]}
                    alt={name}
                    className="product-card__image"
                  ></img>
                  <Link to={`/product/${id}`} className="product-card__button">
                    {' '}
                    <img src={buyIcon} alt="go to cart" />{' '}
                  </Link>
                </div>
                <div className="product-card__content">
                  <p>{name}</p>
                  <p>
                    <strong>{choosePriceAndSymbol(prices, currency)}</strong>
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}
