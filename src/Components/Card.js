import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../Context/StoreContext';
import { choosePrice } from '../utils/ChoosePrice';

export default class Card extends Component {
  static contextType = StoreContext;
  render() {
    const products = this.props.products;
    const { currency } = this.context;
    return (
      <>
        {products &&
          products.map(({ name, gallery, prices, inStock, category, id }) => {
            /*   const filteredPrice = prices.find(
              (c) => c.currency.label === currency
            );
            const { symbol } = filteredPrice.currency;
            const { amount } = filteredPrice; */
            return (
              <div key={name} className="product-card">
                <img
                  src={gallery[0]}
                  alt={name}
                  className="product-card__image"
                ></img>
                <span>{name}</span>
                <span>{choosePrice(prices, currency)}</span>
                <Link to={`/product/${id}`}>buy</Link>
              </div>
            );
          })}
      </>
    );
  }
}
