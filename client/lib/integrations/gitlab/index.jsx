import React from 'react';

import ConnectionCard from 'components/connection-card';
import openWindow from 'lib/popup-window';

const debug = require( 'debug' )( 'app:lib:integrations:gitlab' );

const popupCallback = str => {
  debug( 'This is callback: ', str );
}

window.popupCallback = popupCallback;

const GitlabIntegration = React.createClass( {
  displayName: 'GitlabIntegration',

  connect() {
    debug( 'connect gitlab' );
    openWindow( 'gitlab.html' );
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

/*
  curl -X POST "https://gitlab.com/api/v3/session?login=123&password=123
  curl --header "PRIVATE-TOKEN: t0k3n" -X POST "https://gitlab.com/api/v3/projects?name=nuevoproject"
  curl -X POST -H 'PRIVATE-TOKEN: t0k3n' 'https://gitlab.com/api/v3/projects/:id/repository/files?file_path=README.md&branch_name=master&content=namespace&commit_message=initial%20commit'

  JkUQ5Erv6vwMfTutX6VY
  1516822
 */
