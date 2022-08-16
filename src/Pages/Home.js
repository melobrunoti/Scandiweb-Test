import React, { Component } from 'react';
import { loadAllProducts } from '../GraphQL/ProductsQueries';
import client from '../Connection/Client';
import Card from '../Components/Card';

export default class Home extends Component {
  constructor() {
    super();
    this.state = { products: [] };
  }

  async componentDidMount() {
    const fetchAllProducts = await client.query({
      query: loadAllProducts,
    });

    const products = fetchAllProducts.data.category.products;

    this.setState((prevState) => ({ products }));
  }
  render() {
    const { products } = this.state;
    return (
      <>
        <h1 className="title">All</h1>
        <div className="home-container">
          {products && <Card products={products} />}
        </div>
      </>
    );
  }
}
