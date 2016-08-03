import RequestHandler from './request-handler';

const debug = require( 'debug' )( 'app:lib:api-handler' );

// Github
const githubApiPath = 'https://api.github.com';
const rootSHA = 'a23caa93b11ca99f1ee1ccaacdba5f119333998b';
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
