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
      this.props.handleCrendentials( payload.username, tokenGitlab );
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
