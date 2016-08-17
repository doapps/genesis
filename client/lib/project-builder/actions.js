import Dispatcher from 'lib/dispatcher';

const debug = require( 'debug' )( 'app:lib:project-builder:actions' );

const ProjectBuilderActions = {
  setBuildStatus( integrationName, statusData ) {
    Dispatcher.handleServerAction( {
      type: 'REGISTER_BUILD_STATUS',
      data: { integrationName, statusData }
    } );
  },

  setIntegrationsCountToBuild( count ) {
    Dispatcher.handleServerAction( {
      type: 'REGISTER_INTEGRATIONS_COUNT',
      count
    } );
  }
};

export default ProjectBuilderActions;
