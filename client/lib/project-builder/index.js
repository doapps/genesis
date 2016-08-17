import map from 'lodash/map';
import parallel from 'async/parallel';

import buildProjectStructure from 'lib/integrations/github/builder';
import buildRepositories from 'lib/integrations/gitlab/builder';
import buildTrelloData from 'lib/integrations/trello/builder';
import buildSlackData from 'lib/integrations/slack/builder';
import ProjectBuilderActions from 'lib/project-builder/actions';
import { integrationsConstants } from 'lib/project-builder/build-status-constants';

const debug = require( 'debug' )( 'app:lib:builder-methods' );

const getAvailableIntegrations = integrations =>
  map( integrations.filter( integration => integration.token ), 'builder' );

function getIntegrationsList( environment ) {
  const {
    gitlabToken,
    trelloToken,
    slackToken
  } = environment;

  const integrations = [
    {
      name: integrationsConstants.GOOGLE_DRIVE,
      token: true, // it always execute
      builder: buildProjectStructure.bind( null, environment )
    },
    {
      name: integrationsConstants.GITLAB,
      token: gitlabToken,
      builder: buildRepositories.bind( null, environment )
    },
    {
      name: integrationsConstants.TRELLO,
      token: trelloToken,
      builder: buildTrelloData.bind( null, environment )
    },
    {
      name: integrationsConstants.SLACK,
      token: slackToken,
      builder: buildSlackData.bind( null, environment )
    }
  ];

  return integrations;
}

const ProjectBuilder = ( environment, cb ) => {
  const integrationsList = getIntegrationsList( environment );
  const availableIntegrations = getAvailableIntegrations( integrationsList );

  debug( 'availableIntegrations', availableIntegrations );
  ProjectBuilderActions.setIntegrationsCountToBuild( availableIntegrations.length );

  parallel( availableIntegrations, err => {
    if ( err ) {
      debug( 'err', err );
      cb( err );
      return;
    }

    cb( null );
  } );
};

export default ProjectBuilder;
