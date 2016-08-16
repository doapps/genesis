import React from 'react';

import config from 'config';
import APIHandler from 'lib/api-handler';
import ConnectionCard from 'components/connection-card';
import PopupWindowStore from 'lib/popup-window/store';
import PopupWindowActions from 'lib/popup-window/actions';

const debug = require( 'debug' )( 'app:lib:integrations:slack' );

const slackWindowFile = 'slack-wrapper.html';
const openerName = 'slackWindow';

const SlackIntegration = React.createClass( {
  displayName: 'SlackIntegration',

  componentDidMount() {
    PopupWindowStore.on( 'change', this.slackWindowHandler );
  },

  componentWillUnmount() {
    PopupWindowStore.removeListener( 'change', this.slackWindowHandler );
  },

  slackWindowHandler() {
    debug( 'triggered:slack' );
    const openerJustDispatched = PopupWindowStore.getRecentOpenerDispatched();

    debug( 'openerJustDispatched', openerJustDispatched );
    if ( openerJustDispatched !== openerName ) {
      return;
    }

    const payload = PopupWindowStore.getPopupResponse( openerName );
    const slackCode = payload.code;

    debug( 'payload slack', payload );

    if ( slackCode ) {
      APIHandler.slackAuthorize( slackCode, ( errAuth, authData ) => {
        if ( errAuth ) {
          debug( 'errAuth', errAuth );
          return;
        }

        const { access_token: token } = authData;

        debug( 'token', token );

        APIHandler.getSlackUserInfo( token, ( errUser, userData ) => {
          if ( errUser ) {
            debug( 'errUser', errUser );
            return;
          }

          const { user } = userData;

          this.props.handleCrendentials( user, token );
        } );
      } );
    }
  },

  connect() {
    debug( 'connect slack' );
    const scope = config( 'slack' )( 'scope' );
    const clientId = config( 'slack' )( 'client_id' );

    const windowURL = `${ slackWindowFile }?scope=${ scope }&clientId=${ clientId }&openerName=${ openerName }`;
    PopupWindowActions.openWindowPopup( windowURL );
  },

  render() {
    const { credentials } = this.props;

    return (
      <ConnectionCard
        title="Slack"
        iconClass="fa fa-slack"
        description="for channels"
        infoLogged={ credentials }
        onClick={ this.connect } />
    );
  }
} );

export default SlackIntegration;
