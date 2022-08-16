import React, { Component } from 'react';
import client from '../Connection/Client';

import StoreContext from '../Context/StoreContext';
import { loadCategories } from '../GraphQL/CategoriesQueries';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import cart from '../assets/cart.svg';
import Cart from './Cart';

export default class Header extends Component {
  constructor() {
    super();
    this.state = { categories: '', isOpen: false };
  }

  static contextType = StoreContext;

  async componentDidMount() {
    const fetchCategories = await client.query({
      query: loadCategories,
    });

    const categories = fetchCategories.data.categories;

    this.setState((prevState) => ({ categories }));
  }

  render() {
    const { currency, setCurrency, currencies, getTotalLength } = this.context;
    const { categories } = this.state;

    const toggleCart = () => {
      this.setState((prevState) => ({ isOpen: !this.state.isOpen }));
    };
    return (
      <>
        <div className="header">
          <nav className="nav">
            {categories &&
              categories.map(({ name }) => {
                return (
                  <Link className="nav__link" key={name} to={`/${name}`}>
                    {name}
                  </Link>
                );
              })}
          </nav>

          <img className="logo" src={logo} alt="logo" />

          <div className="cart-container">
            <label htmlFor="currency">$</label>
            <select
              className="select"
              value={currency}
              onChange={(e) => {
                setCurrency(e.target.value);
              }}
            >
              {currencies.map(({ label, symbol }) => (
                <option className="option" key={label} value={label}>
                  {`${symbol} ${label}`}
                </option>
              ))}
            </select>
            {/* <Link to={'/cart'}> */}
            <img
              onClick={() => toggleCart()}
              className="cart"
              src={cart}
              alt="cart-icon"
            />
            {/* </Link> */}
            <span
              className={getTotalLength() === 0 ? 'hide-length' : 'cartLength '}
            >
              {getTotalLength()}
            </span>
          </div>
        </div>
        <div className={this.state.isOpen ? 'show-cart' : 'hide-cart'}>
          <Cart />
        </div>
      </>
    );
  }
}
