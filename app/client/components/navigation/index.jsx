import React from 'react';

const NavigationButtons = React.createClass( {
  render() {
    return (
      <nav className="pagination">
        <ul>&nbsp;</ul>
          <a
            className="button is-dark"
            onClick={ this.props.onClick }>
            Siguiente
          </a>
        <ul>&nbsp;</ul>
      </nav>
    );
  }
} );

export default NavigationButtons;
