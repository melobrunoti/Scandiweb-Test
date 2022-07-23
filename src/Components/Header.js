import React, { Component } from 'react';
import client from '../Connection/Client';

import StoreContext from '../Context/StoreContext';
import { loadCurrencies } from '../GraphQL/CurrencyQueries';
import { loadCategories } from '../GraphQL/CategoriesQueries';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  constructor() {
    super();
    this.state = { currencies: [], categories: '' };
  }

  static contextType = StoreContext;

  async componentDidMount() {
    const fetchCurrencies = await client.query({
      query: loadCurrencies,
    });

    const fetchCategories = await client.query({
      query: loadCategories,
    });

    const currencies = fetchCurrencies.data.currencies;
    const categories = fetchCategories.data.categories;

    this.setState((prevState) => ({ currencies, categories }));
  }

  render() {
    const { currency, setCurrency } = this.context;
    const { currencies, categories } = this.state;
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
        <div>
          <Link className="nav__link" to={'/cart'}>
            Cart
          </Link>
          <label htmlFor="currency">$</label>
          <select
            value={currency}
            onChange={(e) => {
              setCurrency(e.target.value);
            }}
          >
            {currencies.map(({ label }) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}
