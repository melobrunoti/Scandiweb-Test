import React, { Component } from 'react';
import client from '../Connection/Client';

import StoreContext from '../Context/StoreContext';
import { loadCategories } from '../GraphQL/CategoriesQueries';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import cart from '../assets/cart.svg';

export default class Header extends Component {
  constructor() {
    super();
    this.state = { categories: '' };
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
    const { currency, setCurrency, currencies } = this.context;
    const { categories } = this.state;

    return (
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

        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
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
          <Link to={'/cart'}>
            <img className="cart" src={cart} alt="cart-icon" />
          </Link>
        </div>
      </div>
    );
  }
}
