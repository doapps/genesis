import React from 'react';

const File = ( props ) => (
  <a className={ props.active ? 'is-active' : '' }>
    <span className="icon is-small">
      <i className="fa fa-file-text-o"></i>
    </span>&nbsp;{ props.name }
  </a>
);

export default File;
