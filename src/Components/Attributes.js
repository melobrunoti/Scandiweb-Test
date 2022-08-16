import React, { Component } from 'react';

export default class Attributes extends Component {
  render() {
    const { attribute, selectedAttributes, name, isCartItem, miniCart } =
      this.props;
    return (
      <>
        {name === 'Color' ? (
          <div
            className={
              selectedAttributes && selectedAttributes[name] === attribute.value
                ? `color-border color-selected-boder color-border-${miniCart}`
                : `color-border color-not-selected-border color-border-${miniCart}`
            }
          >
            <div
              style={{
                backgroundColor: attribute.value,
                color: 'transparent',
              }}
              className={`color-${miniCart}`}
              onClick={() => {
                !isCartItem && this.props.setAttributes(name, attribute.value);
              }}
            >
              -
            </div>
          </div>
        ) : (
          <div
            onClick={() =>
              !isCartItem && this.props.setAttributes(name, attribute.value)
            }
            className={
              selectedAttributes && selectedAttributes[name] === attribute.value
                ? `attribute attribute-selected attribute-${miniCart}`
                : `attribute attribute-not-selected attribute-${miniCart}`
            }
            key={attribute.value}
          >
            {attribute.displayValue}
          </div>
        )}
      </>
    );
  }
}
