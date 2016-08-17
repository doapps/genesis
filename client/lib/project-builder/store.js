import Dispatcher from 'lib/dispatcher';
import emitter from 'lib/mixins/emitter';

const debug = require( 'debug' )( 'app:lib:project-builder:store' );

const integrationsStatus = {};
let integrationsCount = 0;

const ProjectBuilderStore = {
  getIntegrationsStatus() {
    return integrationsStatus;
  },

  getIntegrationsCount() {
    return integrationsCount;
  },

  emitChange() {
    this.emit( 'change' );
  }
};

ProjectBuilderStore.dispatchToken = Dispatcher.register( payload => {
  const { action } = payload;

  switch ( action.type ) {
    case 'REGISTER_BUILD_STATUS':
      const { integrationName, statusData } = action.data;
      integrationsStatus[ integrationName ] = statusData;

      ProjectBuilderStore.emitChange();
      break;

    case 'REGISTER_BUILD_STATUS':
      const { count } = action;
      integrationsCount = count;

      ProjectBuilderStore.emitChange();
      break;
  }
} );

emitter( ProjectBuilderStore );

export default ProjectBuilderStore;
