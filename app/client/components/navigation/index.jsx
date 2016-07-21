import React from 'react';

const NavButton = props =>
  <a
    className="button is-dark is-outlined"
    onClick={ props.onClick }>
    { props.children }
  </a>

const NavigationButtons = React.createClass( {
  render() {
    return (
      <nav className="pagination">
        {
          this.props.onClickPrevious
          ? <NavButton onClick={ this.props.onClickPrevious }>
              Previous
            </NavButton>
          : <ul>&nbsp;</ul>
        }
        {
          this.props.onClickNext
          ? <NavButton onClick={ this.props.onClickNext }>
              Next
            </NavButton>
          : <ul>&nbsp;</ul>
        }
        <ul>&nbsp;</ul>
      </nav>
    );
  }
} );

export default NavigationButtons;
