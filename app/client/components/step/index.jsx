import React from 'react';

export const StepTitle = React.createClass( {
  render() {
    return (
      <span>{ this.props.title }</span>
    );
  }
} );

export const StepDivision = React.createClass( {
  render() {
    return (
      <span className="icon is-small" id="item-tab">
        <i className="fa fa-caret-right"></i>
      </span>
    );
  }
} );
