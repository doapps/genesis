import RequestHandler from './request-handler';

const debug = require( 'debug' )( 'app:lib:api-handler' );

const githubRawContentPath = 'https://raw.githubusercontent.com';
const githubApiPath = 'https://api.github.com';
const githubUser = 'doapps';
const githubRepo = 'dspp';
const internalsFolder = 'internals';
const baseFolder = 'base';

const rootPath = `/repos/${ githubUser }/${ githubRepo }/git/refs`;
const getTreePath = rootSHA => `/repos/${ githubUser }/${ githubRepo }/git/trees/${ rootSHA }?recursive=true`;
const getRawPath = ( folderName, path ) => `/${ githubUser }/${ githubRepo }/master/${ folderName }/${ path }`;
const getInternalsPath = path => getRawPath( internalsFolder, path );
const getRawContentPath = path => getRawPath( baseFolder, path );

const githubApiHandler = new RequestHandler( githubApiPath );
const githubRawHandler = new RequestHandler( githubRawContentPath );

const APIHandler = {
  fetchRepositoryRefs( cb ) {
    githubApiHandler.get( {
      path: rootPath
    }, cb );
  },

  fetchRepositoryTree( sha, cb ) {
    githubApiHandler.get( {
      path: getTreePath( sha )
    }, cb );
  },

  fetchInternalsContent( path, cb ) {
    githubRawHandler.getRawText( {
      path: getInternalsPath( path )
    }, cb );
  },

  fetchFileContent( path, cb ) {
    githubRawHandler.getRawText( {
      path: getRawContentPath( path )
    }, cb );
  },
};

export default APIHandler;
