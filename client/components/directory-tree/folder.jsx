import React from 'react';

const Folder = ( props ) => (
  <a className={ props.active ? 'is-active' : '' }>
    <span className="icon is-small">
      <i className="fa fa-folder"></i>
    </span>&nbsp;{ props.name }
  </a>
);

export default Folder;
