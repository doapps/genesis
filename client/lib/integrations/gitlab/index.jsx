import React from 'react';
import toml from 'toml';

import BuilderMethods from 'lib/builder-tools';

import ConnectionCard from 'components/connection-card';

const debug = require( 'debug' )( 'app:lib:integrations:gitlab' );

const GitlabIntegration = React.createClass( {
  displayName: 'GitlabIntegration',

  connect() {
    debug( 'connect gitlab' );

    BuilderMethods.getTemplates( ( err, content ) => {
      debug( 'content', content );
      const result = toml.parse( content.text );

      debug( 'result', result );
    } );
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
