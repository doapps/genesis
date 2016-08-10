import Dispatcher from 'lib/dispatcher';
import APIHandler from 'lib/api-handler';

const debug = require( 'debug' )( 'app:lib:github-tree:actions' );

const GithubTreeActions = {
  getAndParseRepositoryTree() {
    APIHandler.fetchRepositoryRefs( ( errorRef, dataRefs ) => {
      if ( errorRef ) {
        debug( 'errorRef', errorRef );
        return;
      }

      const { sha: rootSHA } = dataRefs.find( dataRef => dataRef.ref === 'refs/heads/master' ).object;

      APIHandler.fetchRepositoryTree( rootSHA, ( errorTree, dataTree ) => {
        if ( errorTree ) {
          debug( 'errorTree', errorTree );
          return;
        }

        const { sha: mainTreeSHA } = dataTree.tree.find( node => node.path === 'base' && node.type === 'tree' );

        APIHandler.fetchRepositoryTree( mainTreeSHA, ( error, data ) => {
          if ( error ) {
            Dispatcher.handleServerAction( {
              type: 'RECEIVE_REPOSITORY_TREE_ERROR',
              error
            } );
            return;
          }

          Dispatcher.handleServerAction( {
            type: 'RECEIVE_REPOSITORY_TREE_SUCCESS',
            data
          } );
        } );
      } );
    } );
  }
};

export default GithubTreeActions;
