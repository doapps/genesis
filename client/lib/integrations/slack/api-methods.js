import config from 'config';
import RequestHandler from 'lib/api-handler/request-handler';

const slackPath = 'https://slack.com/api';
const clientId = config( 'slack' )( 'client_id' );
const clientSecret = config( 'slack' )( 'client_secret' );

const slackHandler = new RequestHandler( slackPath );

const slackAPI = {
  slackAuthorize( code, cb ) {
    slackHandler.get( {
      path: '/oauth.access',
      query: {
        client_id: clientId,
        client_secret: clientSecret,
        code
      }
    }, cb );
  },

  getSlackUserInfo( token, cb ) {
    slackHandler.post( {
      path: '/auth.test',
      body: `token=${ token }`
    }, cb );
  },

  createPrivateChannel( token, channelName, cb ) {
    slackHandler.post( {
      path: '/groups.create',
      body: `name=${ channelName }&token=${ token }`
    }, cb );
  }
};

export default slackAPI;
