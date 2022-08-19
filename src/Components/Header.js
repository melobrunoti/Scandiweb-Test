import React, { Component } from 'react';
import client from '../Connection/Client';

import StoreContext from '../Context/StoreContext';
import { loadCategories } from '../GraphQL/CategoriesQueries';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import cart from '../assets/cart.svg';
import Cart from './Cart';
import CustomSelect from './CustomSelect';
import arrowUp from '../assets/arrowUp.svg';
import arrowDown from '../assets/arrowDown.svg';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      categories: '',
      isOpen: false,
      activePage: 'all',
    };
  }

  static contextType = StoreContext;

  async componentDidMount() {
    const fetchCategories = await client.query({
      query: loadCategories,
    });

    const categories = fetchCategories.data.categories;

    this.setState((prevState) => ({ categories }));
  }

  closeCart = (e) => {
    if (e.target.className === 'show-cart') this.setState({ isOpen: false });
  };

  render() {
    const { getTotalLength, toggleCurrency, isCurrenciesOpen } = this.context;
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
                  <Link
                    key={name}
                    to={`/${name}`}
                    onClick={() => this.setState(() => ({ activePage: name }))}
                    className={
                      this.state.activePage === name
                        ? 'nav__link active'
                        : 'nav__link'
                    }
                  >
                    {name}
                  </Link>
                );
              })}
          </nav>

          <img className="logo" src={logo} alt="logo" />

          <div className="cart-container">
            <div className="currency" onClick={() => toggleCurrency()}>
              $
              {isCurrenciesOpen ? (
                <img src={arrowUp} alt="close currencies"></img>
              ) : (
                <img src={arrowDown} alt="open currencies"></img>
              )}
            </div>

            <img
              onClick={() => toggleCart()}
              className="cart"
              src={cart}
              alt="cart-icon"
            />

            <span
              data-testid="cartLength"
              className={getTotalLength() === 0 ? 'hide-length' : 'cartLength '}
            >
              {getTotalLength()}
            </span>
          </div>
        </div>
        <div
          className={isCurrenciesOpen ? 'show-currencies' : 'hide-currencies'}
        >
          <CustomSelect toggleCurrency={toggleCurrency} />
        </div>
        <div
          onClick={(e) => this.closeCart(e)}
          className={this.state.isOpen ? 'show-cart' : 'hide-cart'}
        >
          <Cart />
        </div>
      </>
    );
  }
}
