import Dispatcher from 'lib/dispatcher';
import emitter from 'lib/mixins/emitter';

const debug = require( 'debug' )( 'app:lib:popup-window:store' );

let windowData = null;

const PopupWindowStore = {
  getPopupResponse() {
    return windowData;
  },

  emitChange() {
    this.emit( 'change' );
  }
};

PopupWindowStore.dispatchToken = Dispatcher.register( payload => {
  const { action } = payload;

  switch ( action.type ) {
    case 'RECEIVE_WINDOW_DATA_SUCCESS':
      const { data } = action;

      windowData = data;

      PopupWindowStore.emitChange();
      break;

    case 'RECEIVE_WINDOW_DATA_ERROR':
      PopupWindowStore.emitChange();
      break;
  }
} );

emitter( PopupWindowStore );

export default PopupWindowStore;
