import React from 'react';

const Folder = React.createClass( {
  render() {
    return (
      <a href="#">
        <span className="icon is-small">
          <i className="fa fa-folder"></i>
        </span>&nbsp;diagram
      </a>
    );
  }
} );

export default Folder;
