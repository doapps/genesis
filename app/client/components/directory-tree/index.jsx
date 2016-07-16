import React from 'react';

import File from './file';
import Folder from './folder';

const DirectoryTree = React.createClass( {
  render() {
    return (
      <aside className="menu">
        <p className="menu-label">
          <strong>proyecto nuevo</strong>
        </p>
        <ul className="menu-list">
          <li>
            <Folder/>
            <ul>
              <li>
                <Folder/>
                <ul>
                  <li>
                    <File/>
                    <File/>
                    <File/>
                    <File/>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    );
  }
} );

export default DirectoryTree;
