import config from 'config';
import ProjectBuilderActions from 'lib/project-builder/actions';
import { buildConstants, integrationsConstants } from 'lib/project-builder/build-status-constants';

const debug = require( 'debug' )( 'app:lib:integrations:google-drive' );

const GDRIVE_CLIENT_ID = config( 'google_drive' )( 'client_id' );
const GDRIVE_COOKIE_POLICY = 'single_host_origin';
const GDRIVE_SCOPES = [
  'https://www.googleapis.com/auth/documents',
  'https://www.googleapis.com/auth/drive'
];
const GDRIVE_API_KEY = config( 'google_drive' )( 'api_key' );
const MIME_TYPE_FOLDER = 'application/vnd.google-apps.folder';

// Google App Script Variables
const SCRIPT_URL_EXECUTION = 'https://script.googleapis.com';
const SCRIPT_ID = config( 'google_drive' )( 'script_id' );
const SCRIPT_PATH_EXECUTION = `v1/scripts/${ SCRIPT_ID }:run`;
const FUNCTION_NAME = config( 'google_drive' )( 'function_name' );

const integrationName = integrationsConstants.GOOGLE_DRIVE;

let auth2;
let element = null;
let pickerApiLoaded = false;
let oauthToken;
let rootFolderId;

function loadDriveInfo() {
  window.gapi.client.load( 'drive', 'v2', () => {
    window.gapi.client.drive.about.get().execute( resp => {
      rootFolderId = resp.rootFolderId;
    } );
  } );
}

function loadPicker() {
  window.gapi.load( 'picker', {
    callback: () => {
      debug( 'picker loaded' );
      pickerApiLoaded = true;
    }
  } );
}

export const prepareAuth = cb => {
  window.gapi.load( 'auth2', () => {
    auth2 = window.gapi.auth2.init( {
      client_id: GDRIVE_CLIENT_ID,
      cookiepolicy: GDRIVE_COOKIE_POLICY,
      scope: GDRIVE_SCOPES.join( ' ' )
    } );

    element = document.getElementById( 'gdrive-button-login' );

    auth2.attachClickHandler( element, {}, googleUser => {
      const authData = googleUser.getAuthResponse();
      const googleUserData = googleUser.getBasicProfile();

      debug( 'authData', authData );
      oauthToken = authData.access_token;
      loadDriveInfo();

      const userData = {
        id: googleUserData.getId(),
        name: googleUserData.getName(),
        email: googleUserData.getEmail(),
        imageUrl: googleUserData.getImageUrl()
      };

      cb( { authorized: true, ...userData } );
    }, error => {
      cb( { authorized: false, ...error } );
    } );
  } );

  loadPicker();
};

export const runScriptBuilder = ( data, cb ) => {
  const request = {
    function: FUNCTION_NAME,
    parameters: data,
    // devMode: true
  };

  const operation = window.gapi.client.request( {
    root: SCRIPT_URL_EXECUTION,
    path: SCRIPT_PATH_EXECUTION,
    method: 'POST',
    body: request
  } );

  operation.execute( resp => {
    if ( resp.error && resp.error.status ) {
      debug( 'Error calling API: ', resp.error );
      cb( resp.error, null );
    } else if ( resp.error ) {
      debug( 'Script error: ', resp.error.details[ 0 ] );
      cb( resp.error, null );
    } else {
      const payload = resp.response.result;
      const { folderId } = payload;
      const buildStatus = {
        status: buildConstants.DONE,
        data: {
          doneURL: `https://drive.google.com/drive/folders/${ folderId }`
        }
      };

      ProjectBuilderActions.setBuildStatus( integrationName, buildStatus );

      cb( null, { status: 200 } );
    }
  } );
};

function pickerCallback( cb, data ) {
  if ( data[ window.google.picker.Response.ACTION ] === window.google.picker.Action.LOADED ) {
    debug( 'Picker loaded' );
  }

  if ( data[ window.google.picker.Response.ACTION ] === window.google.picker.Action.PICKED ) {
    const folderDoc = data[ window.google.picker.Response.DOCUMENTS ][ 0 ];
    const folderId = folderDoc[ window.google.picker.Document.ID ];
    const folderName = folderDoc[ window.google.picker.Document.NAME ];
    const response = { folderId, folderName };

    cb( response );
  }
}

export const createPicker = cb => {
  if ( ! ( pickerApiLoaded && oauthToken && rootFolderId ) ) {
    return;
  }

  const view = new window.google.picker.DocsView();
  view.setMimeTypes( MIME_TYPE_FOLDER );
  view.setIncludeFolders( true );
  view.setSelectFolderEnabled( true );
  view.setParent( rootFolderId );

  const picker = new window.google.picker.PickerBuilder()
    .addView( view )
    .setOAuthToken( oauthToken )
    .setDeveloperKey( GDRIVE_API_KEY )
    .setCallback( pickerCallback.bind( null, cb ) )
    .build();

  picker.setVisible( true );
};
