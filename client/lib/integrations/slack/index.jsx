import React from 'react';

import ConnectionCard from 'components/connection-card';
import { createFolder, createFile, listFiles } from 'lib/integrations/google-drive';

const debug = require( 'debug' )( 'app:lib:integrations:slack' );

const SlackIntegration = React.createClass( {
  displayName: 'SlackIntegration',

  createFolder() {
    createFolder( {
      folderName: 'carpeta'
    }, ( err, folder ) => {
      if ( err ) {
        debug( 'err', err );
        return;
      }

      createFile( {
        folderId: folder.id,
        fileName: 'archivo'
      }, ( errFile, file ) => {
        debug( 'done' );
      } );
    } );
  },

  listFiles() {
    listFiles( files => {
      debug( 'files', files );
    } );
  },

  connect() {
    debug( 'connect slack' );
    this.listFiles();
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
