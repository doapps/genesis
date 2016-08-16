import parallel from 'async/parallel';

import buildProjectStructure from 'lib/integrations/github/builder';
import buildRepositories from 'lib/integrations/gitlab/builder';
import buildTrelloData from 'lib/integrations/trello/builder';
import buildSlackData from 'lib/integrations/slack/builder';

const debug = require( 'debug' )( 'app:lib:builder-methods' );

const BuilderMethods = {
  buildProject( environment, cb ) {
    const {
      projectName,
      projectNamespace,
      repositories,
      targets,
      gitlabToken,
      trelloToken,
      slackToken
    } = environment;

    parallel( [
      buildProjectStructure.bind( null, environment ),
      buildRepositories.bind( null, gitlabToken, repositories ),
      buildTrelloData.bind( null, trelloToken, projectName, targets ),
      buildSlackData.bind( null, slackToken, projectNamespace )
    ], ( err, results ) => {
      if ( err ) {
        debug( 'err', err );
        cb( err, null );
        return;
      }

      const resultOne = results[ 0 ];
      const resultTwo = results[ 1 ];
      const resultThree = results[ 2 ];
      const resultFour = results[ 3 ];

      debug( 'resultOne', resultOne );
      debug( 'resultTwo', resultTwo );
      debug( 'resultThree', resultThree );
      debug( 'resultFour', resultFour );

      cb( null, resultOne );
    } );
  }
};

export default BuilderMethods;
