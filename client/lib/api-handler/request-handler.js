import request from 'superagent';

const debug = require( 'debug' )( 'app:lib:api-handler:request-handler' );

export default class RequestHandler {
  constructor( url ) {
    this._url = url;
  }

  getPath( path ) {
    return `${ this._url }${ path }`;
  }

  get( { path, query = {} }, cb ) {
    const urlPath = this.getPath( path );

    request
      .get( urlPath )
      .query( query )
      .end( ( err, res ) => {
        if ( err ) {
          cb( res, null );
          return;
        }

        cb( null, res.body );
      } );
  }

  getRawText( { path }, cb ) {
    const urlPath = this.getPath( path );

    request.get( urlPath, ( err, res ) => {
      if ( err ) {
        cb( res, null );
        return;
      }

      cb( null, res.text );
    } );
  }

  post( { path, body = {}, query = {}, headers = {} }, cb ) {
    const urlPath = this.getPath( path );

    request
      .post( urlPath )
      .send( body )
      .query( query )
      .set( headers )
      .end( ( err, res ) => {
        if ( err ) {
          cb( res.body, null );
          return;
        }

        cb( null, res.body );
      } );
  }
}
