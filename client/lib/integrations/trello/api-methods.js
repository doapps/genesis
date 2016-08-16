import sample from 'lodash/sample';

import RequestHandler from 'lib/api-handler/request-handler';

const debug = require( 'debug' )( 'app:lib:integrations:trello:api-methods' );

const trelloPath = 'https://api.trello.com/1';
const trelloKey = '3e94bccaf31b389d9a8866894446d6ac';
const trelloColors = [ 'black', 'blue', 'green', 'lime', 'orange', 'pink', 'purple', 'red', 'sky', 'yellow' ];
const projectName = 'Genesis';

const trelloHandler = new RequestHandler( trelloPath );

const trelloAPI = {
  trelloAuthorize( cb ) {
    window.Trello.authorize( {
      type: 'popup',
      name: projectName,
      scope: {
        read: true,
        write: true
      },
      expiration: 'never',
      success: () => {
        const token = window.Trello.token();
        cb( token );
      },
      error: () => {
        cb( null );
      }
    } );
  },

  // Deauthorize in every after-building
  trelloDeauthorize() {
    window.Trello.deauthorize();
  },

  getTokenInfo( token, cb ) {
    trelloHandler.get( {
      path: `/tokens/${ token }`,
      query: { key: trelloKey, token }
    }, cb );
  },

  getTrelloUserInfo( token, userId, cb ) {
    trelloHandler.get( {
      path: `/members/${ userId }`,
      query: { key: trelloKey, fields: 'username,fullName', token }
    }, cb );
  },

  createBoard( token, boardName, cb ) {
    trelloHandler.post( {
      path: `/boards`,
      query: {
        key: trelloKey,
        token
      },
      body: `name=${ boardName }&defaultLists=false&prefs_background=${ sample( trelloColors ) }`
      // body: {
      //   name: boardName,
      //   defaultLists: false,
      //   prefs_background: sample( trelloColors )
      // }
    }, cb );
  },

  createList( token, listName, boardId, cb ) {
    trelloHandler.post( {
      path: `/lists`,
      query: {
        key: trelloKey,
        token
      },
      body: `name=${ listName }&idBoard=${ boardId }`
      // body: {
      //   name: listName,
      //   idBoard: boardId
      // }
    }, cb );
  }
};

export default trelloAPI;
