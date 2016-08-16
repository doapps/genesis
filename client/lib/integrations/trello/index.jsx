import React from 'react';

import ConnectionCard from 'components/connection-card';
import APIHandler from 'lib/api-handler';

const debug = require( 'debug' )( 'app:lib:integrations:trello' );

const TrelloIntegration = React.createClass( {
  displayName: 'TrelloIntegration',

  connect() {
    debug( 'connect trello' );
    APIHandler.trelloAuthorize( token => {
      if ( ! token ) {
        debug( 'Not authorized' );
        return;
      }

      debug( 'token', token );

      APIHandler.getTokenInfo( token, ( errToken, tokenInfo ) => {
        if ( errToken ) {
          debug( 'errToken', errToken );
          return;
        }

        const { idMember } = tokenInfo;

        APIHandler.getTrelloUserInfo( token, idMember, ( errUser, userData ) => {
          if ( errUser ) {
            debug( 'errUser', errUser );
            return;
          }

          const { username } = userData;

          this.props.handleCrendentials( username, token );
        } );
      } );
    } );
  },

  render() {
    const { credentials } = this.props;

    return (
      <ConnectionCard
        title="Trello"
        iconClass="fa fa-trello"
        description="for scrum"
        infoLogged={ credentials }
        onClick={ this.connect } />
    );
  }
} );

export default TrelloIntegration;
