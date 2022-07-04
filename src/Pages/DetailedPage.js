import { gql } from '@apollo/client';
import React, { Component } from 'react';
import client from '../Connection/Client';

export default class DetailedPage extends Component {
  constructor(props) {
    super();
    this.state = { product: {} };
  }

  test(id) {
    const result = gql`
        query {
          product(id: "${id}") {
            name
          }
        }
      `;
    return result;
  }

  async componentDidMount() {
    const { id } = await this.props.match.params;

    const fetchProduct = await client.query({
      query: this.test(id),
    });

    const product = fetchProduct.data.product;
    console.log(product);
    this.setState((prevState) => ({ product }));
  }

  render() {
    return <div>DetailedPage</div>;
  }
}
