import React, { Component } from 'react';

export default class Attributes extends Component {
  render() {
    const { attribute, selectedAttributes, name, isCartItem } = this.props;
    return (
      <>
        {name === 'Color' ? (
          <div
            style={{
              backgroundColor: attribute.value,
            }}
            className={
              selectedAttributes && selectedAttributes[name] === attribute.value
                ? 'selected'
                : ''
            }
            onClick={() => {
              !isCartItem && this.props.setAttributes(name, attribute.value);
            }}
          >
            -
          </div>
        ) : (
          <div
            onClick={() => !isCartItem && this.props.setAttributes(name, attribute.value)}
            className={
              selectedAttributes && selectedAttributes[name] === attribute.value
                ? 'attribute-selected'
                : ''
            }
            key={attribute.displayValue}
          >
            {attribute.displayValue}
          </div>
        )}
      </>
    );
  }
}
