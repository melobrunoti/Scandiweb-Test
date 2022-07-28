import React, { Component } from 'react';
import DetailedCard from '../Components/DetailedCard';
import client from '../Connection/Client';
import { loadDetailedProduct } from '../GraphQL/DetailedProductQueries';

export default class DetailedPage extends Component {
  constructor(props) {
    super();
    this.state = { product: {}, selectedAttributes: {} };
    this.setAttributes = this.setAttributes.bind(this);
  }

  setAttributes(key, value) {
    this.setState(({ selectedAttributes }) => ({
      selectedAttributes: { ...selectedAttributes, [key]: value },
    }));
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
    const { product, selectedAttributes } = this.state;
    return (
      <div className="detailed-container">
        {
          <DetailedCard
            product={product}
            setAttributes={this.setAttributes}
            selectedAttributes={selectedAttributes}
          />
        }
      </div>
    );
  }
}
