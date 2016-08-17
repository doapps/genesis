import compact from 'lodash/compact';
import map from 'lodash/map';
import parallel from 'async/parallel';

import buildProjectStructure from 'lib/integrations/github/builder';
import buildRepositories from 'lib/integrations/gitlab/builder';
import buildTrelloData from 'lib/integrations/trello/builder';
import buildSlackData from 'lib/integrations/slack/builder';

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
      token: true, // it always execute
      builder: buildProjectStructure.bind( null, environment )
    },
    {
      token: gitlabToken,
      builder: buildRepositories.bind( null, environment )
    },
    {
      token: trelloToken,
      builder: buildTrelloData.bind( null, environment )
    },
    {
      token: slackToken,
      builder: buildSlackData.bind( null, environment )
    }
  ];

  return integrations;
}

const ProjectBuilder = ( environment, cb ) => {
  const integrationsList = getIntegrationsList( environment );
  const availableIntegrations = getAvailableIntegrations( integrationsList );

  parallel( availableIntegrations, ( err, results ) => {
    if ( err ) {
      debug( 'err', err );
      cb( err ),
      return;
    }

    cb( null );
  } );
};

export default ProjectBuilder;
