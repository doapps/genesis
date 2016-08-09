const debug = require( 'debug' )( 'app:lib:integrations:google-drive' );

// const GDRIVE_CLIENT_ID = '1004924447672-ib5vtaiimi6h1sqfhq6b6o34iiheb8p8.apps.googleusercontent.com';
const GDRIVE_CLIENT_ID = '494857266143-s5miocne763456shvqr6nh5q8i4olqin.apps.googleusercontent.com';
const GDRIVE_COOKIE_POLICY = 'single_host_origin';
const GDRIVE_SCOPE = 'https://www.googleapis.com/auth/drive';
// const GDRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';

// Google App Script Variables
const SCRIPT_URL_EXECUTION = 'https://script.googleapis.com';
const SCRIPT_ID = 'MmfSf4AzQaez_YS5SScyV4uV-tPu4-D5Y';
const SCRIPT_PATH_EXECUTION = `v1/scripts/${ scriptId }:run`;
const FUNCTION_NAME = 'buildProject';


let auth2;
let element = null;

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

export const runScriptBuilder = ( data, cb ) => {
  const request = {
    function: FUNCTION_NAME,
    parameters: data
  };

  const operation = window.gapi.request( {
    root: SCRIPT_URL_EXECUTION,
    path: SCRIPT_PATH_EXECUTION,
    method: 'POST',
    body: request
  } );

  operation.execute( resp => {
    debug( 'resp', resp );

    if ( resp.error && resp.error.status ) {
      debug( 'Error calling API: ', res.error );
      cb( res.error, null );
    } else if ( resp.error ) {
      debug( 'Script error:', resp.error.details[ 0 ] );
      cb( res.error, null );
    } else {
      const payload = resp.response.result;

      debug( 'API Executed: ', payload );
      cb( null, payload );
    }
  } );
};

export const executeScript = folderId => {
  debug('------>', folderId);
  // const folderId = '0BxTy39Zuq5lLanZpZDFDRkdFZ0k';
  const request = {
    'function': 'getFiles',
    'parameters': folderId,
     // "devMode": true,
  };

  const op = gapi.client.request({
    'root': 'https://script.googleapis.com',
    'path': 'v1/scripts/' + scriptId + ':run',
    'method': 'POST',
    'body': request
  });

  op.execute(function(resp) {
    console.log('resp', resp);
    if (resp.error && resp.error.status) {
      debug('Error calling API:');
    } else if (resp.error) {
      var error = resp.error.details[0];
      debug('Script error message: ' + error.errorMessage);

      if (error.scriptStackTraceElements) {
        debug('Script error stacktrace:');
        for (let i = 0; i < error.scriptStackTraceElements.length; i++) {
          var trace = error.scriptStackTraceElements[i];
          debug('\t' + trace.function + ':' + trace.lineNumber);
        }
      }
    } else {
      var fileList = resp.response.result;

      fileList.forEach(function(file) {
        debug(file.id + '\t' + file.name);
      });
    }
  });
};
