import React from 'react';

const File = React.createClass( {
  render() {
    return (
      <a href="#">
        <span className="icon is-small">
          <i className="fa fa-file-text-o"></i>
        </span>&nbsp;README
      </a>
    );
  }
} );

export default File;
