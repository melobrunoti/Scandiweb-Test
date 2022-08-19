import React, { Component } from 'react';
import DetailedCard from '../Components/DetailedCard';
import client from '../Connection/Client';
import StoreContext from '../Context/StoreContext';
import { loadDetailedProduct } from '../GraphQL/DetailedProductQueries';

export default class DetailedPage extends Component {
  constructor(props) {
    super();
    this.state = { product: {}, selectedAttributes: {} };
    this.setAttributes = this.setAttributes.bind(this);
    this._isMounted = false;
  }

  static contextType = StoreContext;

  setAttributes(key, value) {
    this.setState(({ selectedAttributes }) => ({
      selectedAttributes: { ...selectedAttributes, [key]: value },
    }));
  }

  async componentDidMount() {
    this._isMounted = true;
    const { id } = await this.props.match.params;

    const fetchProduct = await client.query({
      query: loadDetailedProduct(id),
    });

    const product = fetchProduct.data.product;

    this._isMounted === true && this.setState(() => ({ product }));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { product, selectedAttributes } = this.state;
    const { closeCurrency } = this.context;
    return (
      <div onClick={() => closeCurrency()} className="detailed-container">
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

export { DetailedPage };
