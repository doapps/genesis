import React from 'react';

import ConnectionCard from 'components/connection-card';
import PopupWindowStore from 'lib/popup-window/store';
import PopupWindowActions from 'lib/popup-window/actions';

const debug = require( 'debug' )( 'app:lib:integrations:gitlab' );

const gitlabWindowFile = 'gitlab.html';
const openerName = 'gitlabWindow';

const GitlabIntegration = React.createClass( {
  displayName: 'GitlabIntegration',

  componentDidMount() {
    PopupWindowStore.on( 'change', this.gitlabWindowHandler );
  },

  componentWillUnmount() {
    PopupWindowStore.removeListener( 'change', this.gitlabWindowHandler );
  },

  gitlabWindowHandler() {
    debug( 'triggered:gitlab' );
    const openerJustDispatched = PopupWindowStore.getRecentOpenerDispatched();

    debug( 'openerJustDispatched', openerJustDispatched );
    if ( openerJustDispatched !== openerName ) {
      return;
    }

    const payload = PopupWindowStore.getPopupResponse( openerName );
    const tokenGitlab = payload.token;

    debug( 'payload gitlab', payload );

    if ( tokenGitlab ) {
      this.props.handleCrendentials( payload.username, tokenGitlab );
    }
  },

  connect() {
    debug( 'connect gitlab' );
    const windowURL = `${ gitlabWindowFile }?openerName=${ openerName }`;

    PopupWindowActions.openWindowPopup( windowURL );
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
