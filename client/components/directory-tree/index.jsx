import React from 'react';
import Treebeard from './treebeard';

const debug = require( 'debug' )( 'app:components:directory-tree' );

const DirectoryTree = React.createClass( {
  getInitialState() {
    return {
      cursor: null
    }
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

  render() {
    return (
      <aside className="menu">
        <ul className="menu-list">
          <Treebeard
            data={ this.props.tree }
            onToggle={ this.onToggle } />
        </ul>
      </aside>
    );
  }
} );

export default DirectoryTree;
