import { Dispatcher } from 'flux';

const debug = require( 'debug' )( 'app:lib:dispatcher' );

const AppDispatcher = Object.assign( new Dispatcher(), {
  handleViewAction( action ) {
    this.dispatch( {
      source: 'VIEW_ACTION',
      action
    } );
  },

  handleServerAction( action ) {
    debug( '->action', action );

    this.dispatch( {
      source: 'SERVER_ACTION',
      action
    } );
  }
} );

export default AppDispatcher;
