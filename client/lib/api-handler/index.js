import RequestHandler from './request-handler';

const debug = require( 'debug' )( 'app:lib:api-handler' );

// GitHub
const githubRawContentPath = 'https://raw.githubusercontent.com';
const githubApiPath = 'https://api.github.com';
const rootSHA = '2c2a75a5ee5a7385ae1128c99e7e3b2c07d08c65';
const githubUser = 'doapps';
const githubRepo = 'dspp';
const baseInternalsFolder = 'internals';

const getTreePath = () =>
  `/repos/${ githubUser }/${ githubRepo }/git/trees/${ rootSHA }?recursive=true`;

const getBasePath = path =>
  `/${ githubUser }/${ githubRepo }/master/${ baseInternalsFolder }/${ path }`;

const githubHandler = new RequestHandler( githubApiPath );
const githubRawHandler = new RequestHandler( githubRawContentPath );

const APIHandler = {
  fetchRepositoryTree( cb ) {
    githubHandler.get( {
      path: getTreePath()
    }, cb );
  },

  fetchContent( path, cb ) {
    githubRawHandler.get( { path: getBasePath( path ) }, cb, true );
  }
};

export default APIHandler;
