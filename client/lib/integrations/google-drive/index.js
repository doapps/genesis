const debug = require( 'debug' )( 'app:lib:integrations:google-drive' );

const GDRIVE_CLIENT_ID = '1004924447672-ib5vtaiimi6h1sqfhq6b6o34iiheb8p8.apps.googleusercontent.com';
const GDRIVE_COOKIE_POLICY = 'single_host_origin';
const GDRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';

let auth2;
let element = null;

window.handleGoogleClientLoad = () => {
  debug( 'handleGoogleClientLoad' );
};

const metadataFileTable = {
  audio: 'application/vnd.google-apps.audio',
  document: 'application/vnd.google-apps.document',
  drawing: 'application/vnd.google-apps.drawing',
  file: 'application/vnd.google-apps.file',
  folder: 'application/vnd.google-apps.folder',
  form: 'application/vnd.google-apps.form',
  fusiontable: 'application/vnd.google-apps.fusiontable',
  map: 'application/vnd.google-apps.map',
  photo: 'application/vnd.google-apps.photo',
  presentation: 'application/vnd.google-apps.presentation',
  script: 'application/vnd.google-apps.script',
  sites: 'application/vnd.google-apps.sites',
  spreadsheet: 'application/vnd.google-apps.spreadsheet',
  unknown: 'application/vnd.google-apps.unknown',
  video: 'application/vnd.google-apps.video'
};

function getFolderMetadata( folderName ) {
  return {
    name: folderName,
    mimeType: metadataFileTable.folder
  };
}

function getFileMetadata( folderId, fileName ) {
  return {
    name: fileName,
    parents: [ folderId ],
    mimeType: metadataFileTable.document
  };
}

function createFileHandler( fileMetadata ) {
  const request = window.gapi.client.drive.files.create( {
    fields: 'id',
    resource: fileMetadata
  } );

  return request;
}

function requestWrapper( fn ) {
  return window.gapi.client.load( 'drive', 'v3', fn() );
}

export const prepareAuth = cb => {
  window.gapi.load( 'auth2', () => {
    auth2 = window.gapi.auth2.init( {
      client_id: GDRIVE_CLIENT_ID,
      cookiepolicy: GDRIVE_COOKIE_POLICY,
      scope: GDRIVE_SCOPE
    } );

    element = document.getElementById( 'gdrive-button-login' );

    auth2.attachClickHandler( element, {}, googleUser => {
      const userData = { // maybe handle this in another scope?
        id: googleUser.getBasicProfile().getId(),
        name: googleUser.getBasicProfile().getName(),
        email: googleUser.getBasicProfile().getEmail(),
        imageUrl: googleUser.getBasicProfile().getImageUrl()
      };

      cb( { authorized: true, ...userData } );
    }, error => {
      cb( { authorized: false, ...error } );
    } );
  } );
};

export const createFolder = ( data, cb ) => {
  requestWrapper( () => {
    const { folderName } = data;
    const folderMetadata = getFolderMetadata( folderName );
    const request = createFileHandler( folderMetadata );

    request.execute( ( err, file ) => {
      if ( err ) {
        cb( err, null );
        return;
      }

      debug( 'created', file.id );

      cb( null, file );
    } );
  } );
};

export const createFile = ( data, cb ) => {
  requestWrapper( () => {
    const { folderId, fileName } = data;
    const fileMetadata = getFileMetadata( folderId, fileName );
    const request = createFileHandler( fileMetadata );

    request.execute( ( err, file ) => {
      if ( err ) {
        cb( err, null );
        return;
      }

      debug( 'created', file.id );

      cb( null, file );
    } );
  } );
};
