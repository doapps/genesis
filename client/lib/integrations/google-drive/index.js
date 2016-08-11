const debug = require( 'debug' )( 'app:lib:integrations:google-drive' );

// const GDRIVE_CLIENT_ID = '1004924447672-ib5vtaiimi6h1sqfhq6b6o34iiheb8p8.apps.googleusercontent.com';
const GDRIVE_CLIENT_ID = '494857266143-s5miocne763456shvqr6nh5q8i4olqin.apps.googleusercontent.com';
const GDRIVE_COOKIE_POLICY = 'single_host_origin';
const GDRIVE_SCOPE = 'https://www.googleapis.com/auth/drive';
// const GDRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';

// Google App Script Variables
const SCRIPT_URL_EXECUTION = 'https://script.googleapis.com';
const SCRIPT_ID = 'MmfSf4AzQaez_YS5SScyV4uV-tPu4-D5Y';
const SCRIPT_PATH_EXECUTION = `v1/scripts/${ SCRIPT_ID }:run`;
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

      cb( null, payload );
    }
  } );
};
