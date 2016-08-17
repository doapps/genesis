import capitalize from 'lodash/capitalize';
import async from 'async';

import ProjectBuilderActions from 'lib/project-builder/actions';
import { buildConstants, integrationsConstants } from 'lib/project-builder/build-status-constants';
import APIHandler from 'lib/api-handler';

const debug = require( 'debug' )( 'app:lib:builder-methods:trello:builder' );

const integrationName = integrationsConstants.TRELLO;

function getBoardLists( targets ) {
  const list = [];

  targets.forEach( target => {
    list.push( `Complete ${ capitalize( target ) }` );
    list.push( `In Progress ${ capitalize( target ) }` );
    list.push( `To do ${ capitalize( target ) }` );
  } );

  list.push( 'Ice Box' );

  return list;
}

function buildTrelloData( environment, cb ) {
  const {
    trelloToken: token,
    projectNamespace: boardName,
    targets
  } = environment;

  const buildStatusLoading = {
    status: buildConstants.LOADING,
    data: {}
  };

  ProjectBuilderActions.setBuildStatus( integrationName, buildStatusLoading );

  APIHandler.createBoard( token, boardName, ( errBoard, boardInfo ) => {
    if ( errBoard || ! boardInfo ) {
      debug( 'errBoard', errBoard );
      cb( { status: 500 }, null );
      return;
    }

    debug( 'boardInfo', boardInfo );

    const { id: boardId } = boardInfo;
    const boardLists = getBoardLists( targets );

    async.forEachSeries( boardLists, ( listName, next ) => {
      APIHandler.createList( token, listName, boardId, errList => {
        if ( errList ) {
          debug( 'errList', errList );
        }

        next();
      } );
    }, err => {
      if ( err ) {
        debug( 'err', err );
        cb( err, null );
        return;
      }

      const buildStatus = {
        status: buildConstants.DONE,
        data: {
          doneURL: `http://trello.com`
          // doneURL: `https://trello.com/b/${ channelName }`
        }
      };

      debug( 'done trello' );
      ProjectBuilderActions.setBuildStatus( integrationName, buildStatus );

      APIHandler.trelloDeauthorize();
      cb( null, { status: 200 } );
    } );
  } );
}
export default buildTrelloData;
