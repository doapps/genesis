import Dispatcher from 'lib/dispatcher';
import emitter from 'lib/mixins/emitter';
import constructTree from './tree-parser';

const debug = require( 'debug' )( 'app:lib:github-tree:store' );

const directoryTree = {
  name: 'dspp-tree',
  toggled: true,
  children: []
};

const GithubTreeStore = {
  getProjectStructure() {
    return directoryTree;
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

function setRepositoryTree( tree ) {
  tree = preprocessTree( tree );
  directoryTree.children = tree;
  constructTree( directoryTree.children );
}

GithubTreeStore.dispatchToken = Dispatcher.register( payload => {
  const { action } = payload;

  switch ( action.type ) {
    case 'RECEIVE_REPOSITORY_TREE_SUCCESS':
      const { tree } = action.data.body;
      setRepositoryTree( tree );

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
