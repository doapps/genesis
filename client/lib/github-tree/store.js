import zipObjectDeep from 'lodash/zipObjectDeep';

import Dispatcher from 'lib/dispatcher';
import emitter from 'lib/mixins/emitter';
import constructTree from './tree-parser';

const debug = require( 'debug' )( 'app:lib:github-tree:store' );
let objFolders;
let listFileBuilders;

const directoryTree = {
  name: 'new-project',
  toggled: true,
  children: []
};

const GithubTreeStore = {
  getProjectTree() {
    return directoryTree;
  },

  getProjectStructure() {
    return {
      objFolders,
      listFileBuilders
    };
  },

  emitChange() {
    this.emit( 'change' );
  }
};

function preprocessTree( tree ) {
  return tree.map( node => {
    delete node.mode;
    delete node.size;
    node.name = node.path;
    delete node.path;

    return node;
  } );
}

function parseTreeForRendering( tree ) {
  const treeForParse = preprocessTree( tree );
  directoryTree.children = treeForParse;
  constructTree( directoryTree.children );
}

function permute( newObj, obj ) {
  for ( let prop in obj ) {
    if ( obj.hasOwnProperty( prop ) ) {
      if ( typeof obj[ prop ] === 'object' ) {
        newObj[ prop ] = {};
        permute( newObj[ prop ], obj[ prop ] );
      } else {
        newObj[ prop ] = [];
      }
    }
  }
}

function changeUndefinedLeafs( obj ) {
  let newTree = {};
  permute( newTree, obj );
  return newTree;
}

// parsing process will be made based on README files
// because all leaf nodes always have a file
function parseTreeFolders( tree ) {
  const readmeFile = '/README.md';
  const listFolders = tree
    .filter( node => node.type === 'blob' && !!~node.path.indexOf( readmeFile ) ) // only objects with readme
    .map( node => node.path.slice( 0, node.path.indexOf( readmeFile ) ) ) // cut to path only
    .map( node => node.replace( /\//g, '.' ) ) // transform '/' to '.'
    .filter( node => !!~node.indexOf( '.' ) ); // removing standalone folders

  const parsedTree = zipObjectDeep( listFolders, null );
  let filledTree = changeUndefinedLeafs( parsedTree );

  return filledTree;
}

// parsing process depends on '.toml' files
function parseFactoryFiles( tree ) {
  const fileBuilderName = '/files.toml';
  const listBuilders = tree
    .filter( node => node.type === 'blob' && !!~node.path.indexOf( fileBuilderName ) ) // only objects with files.toml
    .map( node => node.path.slice( 0, node.path.indexOf( fileBuilderName ) ) ); // cut to only path

  return listBuilders;
}

GithubTreeStore.dispatchToken = Dispatcher.register( payload => {
  const { action } = payload;

  switch ( action.type ) {
    case 'RECEIVE_REPOSITORY_TREE_SUCCESS':
      const { tree } = action.data;
      objFolders = parseTreeFolders( tree );
      listFileBuilders = parseFactoryFiles( tree );
      parseTreeForRendering( tree );

      GithubTreeStore.emitChange();
      break;

    case 'RECEIVE_REPOSITORY_TREE_ERROR':
      // TODO: Show error notification
      GithubTreeStore.emitChange();
      break;
  }
} );

emitter( GithubTreeStore );

export default GithubTreeStore;
