import RequestHandler from './request-handler';

const debug = require( 'debug' )( 'app:lib:api-handler' );

// Github
const githubApiPath = 'https://api.github.com';
const rootSHA = '4b96c713ea2531e3b14362559a652bcd617f57b3';
const githubUser = 'doapps';
const githubRepo = 'genesis';

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
