import RequestHandler from './request-handler';

const debug = require( 'debug' )( 'app:lib:api-handler' );

// Github
const githubApiPath = 'https://api.github.com';
const rootSHA = '2c2a75a5ee5a7385ae1128c99e7e3b2c07d08c65';
const githubUser = 'doapps';
const githubRepo = 'dspp';

const getTreePath = () =>
  `/repos/${ githubUser }/${ githubRepo }/git/trees/${ rootSHA }?recursive=true`;

const githubHandler = new RequestHandler( githubApiPath );

const APIHandler = {
  fetchRepositoryTree( cb ) {
    githubHandler.get( {
      path: getTreePath()
    }, cb );
  }
};

export default APIHandler;
