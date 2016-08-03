import React from 'react';

const inactiveStyle = {
  opacity: '.5',
  alignItems: 'center',
  color: '#f5f7fa',
  display: 'flex',
  justifyContent: 'center',
  margin: '0px -5px 0px -5px',
  padding: '6px 12px',
  verticalAlign: 'top',
};

export const StepTitle = React.createClass( {
  render() {
    const { isActive } = this.props;

    return (
      <span style={ ! isActive ? inactiveStyle : null }>
        { this.props.title }
      </span>
    );
  }
} );

export const StepDivision = React.createClass( {
  render() {
    return (
      <span style={ inactiveStyle } className="icon is-small" id="item-tab">
        <i className="fa fa-caret-right"></i>
      </span>
    );
  }
} );
