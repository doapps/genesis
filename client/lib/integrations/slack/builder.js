import APIHandler from 'lib/api-handler';

const debug = require( 'debug' )( 'app:lib:builder-methods:slack:builder' );

function buildSlackData( environment, cb ) {
  const {
    slackToken: token,
    projectNamespace: channelName
  } = environment;

  APIHandler.createPrivateChannel( token, channelName, ( err, resp ) => {
    if ( err ) {
      debug( 'err', err );
      cb( err, null );
      return;
    }

    debug( 'createPrivateChannel:resp', resp );

    cb( null, 'done slack' );
  } );
}

export default buildSlackData;
