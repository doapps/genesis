import React from 'react';

import ConnectionCard from 'components/connection-card';
import PopupWindowStore from 'lib/popup-window/store';
import PopupWindowActions from 'lib/popup-window/actions';

const debug = require( 'debug' )( 'app:lib:integrations:gitlab' );

const gitlabWindowFile = 'gitlab.html';

const GitlabIntegration = React.createClass( {
  displayName: 'GitlabIntegration',

  componentDidMount() {
    PopupWindowStore.on( 'change', this.gitlabWindowHandler );
  },

  componentWillUnmount() {
    PopupWindowStore.removeListener( 'change', this.gitlabWindowHandler );
  },

  gitlabWindowHandler() {
    const payload = PopupWindowStore.getPopupResponse();
    const tokenGitlab = payload.token;

    debug( 'payload', payload );

    if ( tokenGitlab ) {
      this.props.handleCrendentials( {
        username: payload.name,
        token: tokenGitlab
      } );
    }
  },

  connect() {
    debug( 'connect gitlab' );
    PopupWindowActions.openWindowPopup( gitlabWindowFile );
  },

  render() {
    const { credentials } = this.props;

    return (
      <ConnectionCard
        title="Gitlab"
        iconClass="fa fa-gitlab"
        description="for repos"
        infoLogged={ credentials }
        onClick={ this.connect } />
    );
  }
} );

export default GitlabIntegration;

/*
  curl -X POST "https://gitlab.com/api/v3/session?login=123&password=123

  curl --header "PRIVATE-TOKEN: t0k3n" -X POST "https://gitlab.com/api/v3/projects?name=nuevoproject"
  curl -X POST -H 'PRIVATE-TOKEN: t0k3n' 'https://gitlab.com/api/v3/projects/:id/repository/files?file_path=README.md&branch_name=master&content=namespace&commit_message=initial%20commit'
  "https://gitlab.example.com/api/v3/projects/5/repository/branches?branch_name=newbranch&ref=master"

  JkUQ5Erv6vwMfTutX6VY
  1516822
 */
