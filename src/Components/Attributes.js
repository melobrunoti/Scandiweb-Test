import React, { Component } from 'react';

export default class Attributes extends Component {
  render() {
    const { attribute, selectedAttributes, name } = this.props;
    return (
      <div
        onClick={() => this.props.setAttributes(name, attribute.value)}
        className={
          selectedAttributes && selectedAttributes[name] === attribute.value
            ? 'attribute-selected'
            : ''
        }
        key={attribute.displayValue}
      >
        {attribute.displayValue}
      </div>
    );
  }
}
