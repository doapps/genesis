import React from 'react';

import ConnectionCard from 'components/connection-card';

const debug = require( 'debug' )( 'app:lib:integrations:trello' );

const TrelloIntegration = React.createClass( {
  displayName: 'TrelloIntegration',

  connect() {
    debug( 'connect trello' );
  },

  render() {
    return (
      <ConnectionCard
        title="Trello"
        iconClass="fa fa-trello"
        description="for scrum"
        isConnected
        onClick={ this.connect } />
    );
  }
} );

export default TrelloIntegration;
