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
        isConnected={ false }
        onClick={ this.connect } />
    );
  }
} );

export default TrelloIntegration;

/*
import React from 'react';

import ConnectionCard from 'components/connection-card';
import {executeScript} from 'lib/integrations/google-drive';

const debug = require( 'debug' )( 'app:lib:integrations:trello' );

const TrelloIntegration = React.createClass( {
  displayName: 'TrelloIntegration',

  getInitialState() {
    return {
      folderId: ''
    }
  },

  connect() {
    debug( 'connect trello' );
    const {folderId} = this.state;
    debug('folderId', folderId);
    executeScript(folderId);
  },

  changeInput(event) {
    this.setState({folderId: event.target.value});
  },

  render() {
    return (
      <div>
        <input type="text" onChange={ this.changeInput }/>
        <button onClick={ this.connect }>
        Click
        </button>
      </div>
    );
  }
} );

export default TrelloIntegration;

 */
