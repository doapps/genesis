import React from 'react';

const Main = React.createClass( {
  render() {
    return (
    <section className="section">
      <div className="container">
        { this.props.children }
      </div>
    </section>
    );
  }
} );

export default Main;
