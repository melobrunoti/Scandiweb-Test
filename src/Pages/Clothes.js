import React, { Component } from 'react';
import { loadClothesProducts } from '../GraphQL/ProductsQueries';
import client from '../Connection/Client';
import Card from '../Components/Card';

export default class Clothes extends Component {
  constructor() {
    super();
    this.state = { products: [] };
  }

  async componentDidMount() {
    const fetchAllProducts = await client.query({
      query: loadClothesProducts,
    });

    const products = fetchAllProducts.data.category.products;

    this.setState((prevState) => ({ products }));
  }
  render() {
    const { products } = this.state;
    return (
      <>
        <h1 className="title">Clothes</h1>
        <div className="home">{products && <Card products={products} />}</div>
      </>
    );
  }
}
