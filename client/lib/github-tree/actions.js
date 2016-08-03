import Dispatcher from 'lib/dispatcher';
import APIHandler from 'lib/api-handler';

const debug = require( 'debug' )( 'app:lib:github-tree:actions' );

const GithubTreeActions = {
  buildRepositoryTree() {
    APIHandler.fetchRepositoryTree( ( error, data ) => {
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
  }
};

export default GithubTreeActions;
