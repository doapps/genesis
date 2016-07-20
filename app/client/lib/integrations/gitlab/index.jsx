import React from 'react';

import ConnectionCard from 'components/connection-card';

const debug = require( 'debug' )( 'app:lib:integrations:gitlab' );

const GitlabIntegration = React.createClass( {
  displayName: 'GitlabIntegration',

  connect() {
    debug( 'connect gitlab' );
  },

  render() {
    return (
      <ConnectionCard
        title="Gitlab"
        iconClass="fa fa-gitlab"
        description="for repos"
        onClick={ this.connect } />
    );
  }
} );

export default GitlabIntegration;
