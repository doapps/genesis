import config from 'config';
import APIHandler from 'lib/api-handler';
import ProjectBuilderActions from 'lib/project-builder/actions';
import { buildConstants, integrationsConstants } from 'lib/project-builder/build-status-constants';

const debug = require( 'debug' )( 'app:lib:builder-methods:slack:builder' );

const integrationName = integrationsConstants.SLACK;

function buildSlackData( environment, cb ) {
  const {
    slackToken: token,
    projectNamespace: channelName
  } = environment;

  const buildStatusLoading = {
    status: buildConstants.LOADING,
    data: {}
  };

  ProjectBuilderActions.setBuildStatus( integrationName, buildStatusLoading );

  APIHandler.createPrivateChannel( token, channelName, ( errChannel, channelData ) => {
    if ( errChannel ) {
      debug( 'errChannel', errChannel );
      cb( errChannel, null );
      return;
    }

    debug( 'channelData', channelData );

    const { group: { id: channelId } } = channelData;
    const text = 'Bienvenido al nuevo proyecto! :tada: :queso: :jorgeek:';
    const username = config( 'slack' )( 'bot_name' );
    const iconUrl = config( 'slack' )( 'bot_icon' );

    APIHandler.postMessageOnChannel( token, channelId, text, username, iconUrl, ( errMessage, messageData ) => {
      if ( errMessage ) {
        debug( 'errMessage', errMessage );
        cb( errMessage, null );
        return;
      }

      const buildStatus = {
        status: buildConstants.DONE,
        data: {
          doneURL: `http://slack.com`
          // doneURL: `https://${ group }.slack.com/messages/${ channelName }/`
        }
      };

      debug( 'done slack' );
      ProjectBuilderActions.setBuildStatus( integrationName, buildStatus );
      cb( null, { status: 200 } );
    } );
  } );
}

export default buildSlackData;
