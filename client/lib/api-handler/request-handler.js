import request from 'superagent';

const debug = require( 'debug' )( 'app:lib:api-handler:request-handler' );

export default class RequestHandler {
  constructor( url ) {
    this._url = url;
  }

  getPath( path ) {
    return `${ this._url }${ path }`;
  }

  get( { path }, cb ) {
    const urlPath = this.getPath( path );

    request.get( urlPath, ( err, res ) => {
      if ( err ) {
        cb( res.body, null );
        return;
      }

      cb( null, res.body );
    } );
  }

  post( { path, body = {} }, cb ) {
    const urlPath = this.getPath( path );

    request
      .post( urlPath )
      .send( body )
      .end( ( err, res ) => {
        if ( err ) {
          cb( res.body, null );
          return;
        }

        cb( null, res.body );
      } );
  }
}
