import React, { Component } from 'react';
import DetailedCard from '../Components/DetailedCard';
import client from '../Connection/Client';
import { loadDetailedProduct } from '../GraphQL/DetailedProductQueries';

export default class DetailedPage extends Component {
  constructor(props) {
    super();
    this.state = { product: {} };
  }

  async componentDidMount() {
    const { id } = await this.props.match.params;

    const fetchProduct = await client.query({
      query: loadDetailedProduct(id),
    });

    const product = fetchProduct.data.product;

    this.setState((prevState) => ({ product }));
  }

  render() {
    const { product } = this.state;
    return <div>{product && <DetailedCard product={product} />}</div>;
  }
}
