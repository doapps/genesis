const debug = require( 'debug' )( 'app:lib:integrations:google-drive' );

const GDRIVE_CLIENT_ID = '1004924447672-ib5vtaiimi6h1sqfhq6b6o34iiheb8p8.apps.googleusercontent.com';
const GDRIVE_COOKIE_POLICY = 'single_host_origin';
const GDRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';

let auth2;
let element = null;

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

function requestWrapper( fn ) {
  window.gapi.client.load( 'drive', 'v3', fn );
}

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

function listFileHandler() {
  const request = window.gapi.client.drive.files.list( {
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)'
  } );

  return request;
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
      googleUser = googleUser.getBasicProfile();

      const userData = {
        id: googleUser.getId(),
        name: googleUser.getName(),
        email: googleUser.getEmail(),
        imageUrl: googleUser.getImageUrl()
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

    request.execute( resp => {
      if ( resp.error ) {
        cb( resp.error, null );
        return;
      }

      cb( null, resp );
    } );
  } );
};

export const createFile = ( data, cb ) => {
  requestWrapper( () => {
    const { folderId, fileName } = data;
    const fileMetadata = getFileMetadata( folderId, fileName );
    const request = createFileHandler( fileMetadata );

    request.execute( resp => {
      if ( resp.error ) {
        cb( resp.error, null );
        return;
      }

      cb( null, resp );
    } );
  } );
};

export const listFiles = cb => {
  requestWrapper( () => {
    const request = listFileHandler();

    request.execute( resp => {
      cb( resp );
    } );
  } );
}
