import RequestHandler from './request-handler';
import githubAPI from 'lib/integrations/github/api-methods';
import gitlabAPI from 'lib/integrations/gitlab/api-methods';
import trelloAPI from 'lib/integrations/trello/api-methods';
import slackAPI from 'lib/integrations/slack/api-methods';

const debug = require( 'debug' )( 'app:lib:api-handler' );

const APIHandler = Object.assign( {},
  githubAPI,
  gitlabAPI,
  trelloAPI,
  slackAPI
);

export default APIHandler;
