import capitalize from 'lodash/capitalize';
import async from 'async';

import APIHandler from 'lib/api-handler';

const debug = require( 'debug' )( 'app:lib:builder-methods:trello:builder' );

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

function buildTrelloData( token, boardName, targets = [], cb ) {
  APIHandler.createBoard( token, boardName, ( errBoard, boardInfo ) => {
    if ( errBoard ) {
      debug( 'errBoard', errBoard );
    }

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

      cb( null, 'done trello' );
    } );
  } );
}
export default buildTrelloData;
