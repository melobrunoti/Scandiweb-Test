import React, { Component } from 'react';
import { loadTechProducts } from '../GraphQL/ProductsQueries';
import client from '../Connection/Client';
import Card from '../Components/Card';
import StoreContext from '../Context/StoreContext';

export default class Tech extends Component {
  constructor() {
    super();
    this.state = { products: [] };

    this._isMounted = false;
  }

  static contextType = StoreContext;

  async componentDidMount() {
    this._isMounted = true;
    const fetchAllProducts = await client.query({
      query: loadTechProducts,
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
      <div onClick={() => closeCurrency()}>
        <h1 className="title">Tech</h1>
        <div>{products && <Card products={products} />}</div>
      </div>
    );
  }
}
