import React from 'react';
import Treebeard from './treebeard';

import File from './file';
import Folder from './folder';

const debug = require( 'debug' )( 'app:components:directory-tree' );

const styles = {
  component: {
    width: '80%',
    display: 'inline-block',
    verticalAlign: 'top',
    padding: '20px'
  },
  searchBox: {
    padding: '20px 20px 0 20px'
  },
  viewer: {
    base: {
      fontSize: '12px',
      whiteSpace: 'pre-wrap',
      backgroundColor: '#282C34',
      border: 'solid 1px black',
      padding: '20px',
      color: '#9DA5AB',
      minHeight: '250px'
    }
  }
};

const DirectoryTree = React.createClass( {
  getInitialState() {
    return {
      cursor: null
    }
  },

  renderStaticTree() {
    return (
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
    );
  },

  onToggle( node, toggled ) {
    if ( this.state.cursor ) {
      this.state.cursor.active = false;
    }

    node.active = true;

    if ( node.children ) {
      node.toggled = toggled;
    }

    this.setState( { cursor: node } );
  },

  renderTree() {
    debug( 'tree', this.props.tree );

    return (
      <div style={styles.component}>
        <Treebeard
          data={ this.props.tree }
          onToggle={ this.onToggle } />
      </div>
    );
  },

  render() {
    return (
      <aside className="menu">
        <p className="menu-label">
          <strong>proyecto nuevo</strong>
        </p>
        <ul className="menu-list">
          { this.renderTree() }
        </ul>
      </aside>
    );
  }
} );

export default DirectoryTree;
