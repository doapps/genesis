import Dispatcher from 'lib/dispatcher';

import openWindow from './window.js';

const debug = require( 'debug' )( 'app:lib:popup-window:actions' );

const PopupWindowActions = {
  openWindowPopup( url ) {
    openWindow( url );
  },

  receiveData( dataWindow ) {
    const { status } = dataWindow;

    if ( status > 400 ) {
      Dispatcher.handleServerAction( {
        type: 'RECEIVE_WINDOW_DATA_ERROR'
      } );
    } else {
      Dispatcher.handleServerAction( {
        type: 'RECEIVE_WINDOW_DATA_SUCCESS',
        data: dataWindow.data
      } );
    }
  }
};

const popupCallback = data => {
  debug( 'This is callback: ', data );
  PopupWindowActions.receiveData( data );
}

window.popupCallback = popupCallback;

export default PopupWindowActions;
