import Dispatcher from 'lib/dispatcher';
import emitter from 'lib/mixins/emitter';

const PopupWindowStore = {
  emitChange() {
    this.emit( 'change' );
  }
};

PopupWindowStore.dispatchToken = Dispatcher.register( payload => {
  const { action } = payload;

  switch ( action.type ) {
  }
} );

export default PopupWindowStore;
