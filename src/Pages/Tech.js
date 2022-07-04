import React, { Component } from 'react';
import { loadTechProducts } from '../GraphQL/ProductsQueries';
import client from '../Connection/Client';
import Card from '../Components/Card';

export default class Tech extends Component {
  constructor() {
    super();
    this.state = { products: [] };
  }

  async componentDidMount() {
    const fetchAllProducts = await client.query({
      query: loadTechProducts,
    });

    const products = fetchAllProducts.data.category.products;

    this.setState((prevState) => ({ products }));
  }
  render() {
    const { products } = this.state;
    return (
      <div className="home">{products && <Card products={products} />}</div>
    );
  }
}
