import React, { Component } from 'react';

export default class Attributes extends Component {
  render() {
    const { attribute, selectedAttributes, name, isCartItem } = this.props;
    return (
      <>
        {name === 'Color' ? (
          <div
            className={
              selectedAttributes && selectedAttributes[name] === attribute.value
                ? 'color-selected-boder'
                : 'color-not-selected-border'
            }
          >
            <div
              style={{
                backgroundColor: attribute.value,
                color: 'transparent',
              }}
              className="color-selected"
              /*  className={
                selectedAttributes &&
                selectedAttributes[name] === attribute.value
                  ? 'color-selected'
                  : 'attribute-block'
              } */
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
                ? 'attribute attribute-selected'
                : 'attribute attribute-not-selected'
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
