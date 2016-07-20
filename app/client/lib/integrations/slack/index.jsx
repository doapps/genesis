import React from 'react';

import ConnectionCard from 'components/connection-card';

const debug = require( 'debug' )( 'app:lib:integrations:slack' );

const SlackIntegration = React.createClass( {
  displayName: 'SlackIntegration',

  connect() {
    debug( 'connect slack' );
  },

  render() {
    return (
      <ConnectionCard
        title="Slack"
        iconClass="fa fa-slack"
        description="for channels"
        onClick={ this.connect } />
    );
  }
} );

export default SlackIntegration;
