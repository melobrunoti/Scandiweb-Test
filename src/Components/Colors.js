import React, { Component } from 'react';

export default class Colors extends Component {
  render() {
    const { attribute, selectedAttributes, name } = this.props;
    return (
      <div
        style={
          name === 'Color' && {
            backgroundColor: attribute.value,
          }
        }
        className={
          selectedAttributes && selectedAttributes[name] === attribute.value
            ? 'selected'
            : ''
        }
        onClick={() => {
          this.props.setAttributes(name, attribute.value);
        }}
      >
        -
      </div>
    );
  }
}
