import React, { Component } from 'react';
import { loadAllProducts } from '../GraphQL/ProductsQueries';
import client from '../Connection/Client';
import Card from '../Components/Card';
import StoreContext from '../Context/StoreContext';

export default class Home extends Component {
  constructor() {
    super();
    this.state = { products: [] };
    this._isMounted = false;
  }

  static contextType = StoreContext;

  async componentDidMount() {
    this._isMounted = true;
    const fetchAllProducts = await client.query({
      query: loadAllProducts,
    });

    const products = fetchAllProducts.data.category.products;

    this._isMounted === true && this.setState(() => ({ products }));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { products } = this.state;
    const { closeCurrency } = this.context;
    return (
      <main onClick={() => closeCurrency()}>
        <h1 className="title">All</h1>
        <div className="home-container">
          {products && <Card products={products} />}
        </div>
      </main>
    );
  }
}
