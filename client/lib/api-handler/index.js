import RequestHandler from './request-handler';

const debug = require( 'debug' )( 'app:lib:api-handler' );

// GitHub
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

// GitLab
const gitlabPath = 'https://gitlab.com/api/v3';
const gitlabHandler = new RequestHandler( gitlabPath );

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

  createNewRepository( token, projectName, cb ) {
    gitlabHandler.post( {
      path: '/projects',
      query: { name: projectName },
      headers: { 'PRIVATE-TOKEN': token }
    }, cb );
  },

  createBranchOnProject( token, projectId, branchName, cb ) {
    gitlabHandler.post( {
      path: `/projects/${ projectId }/repository/branches`,
      query: { branch_name: branchName, ref: 'master' },
      headers: { 'PRIVATE-TOKEN': token }
    }, cb );
  },

  createFileOnBranch( token, projectId, filePath, branchName, content, commitMessage, cb ) {
    gitlabHandler.post( {
      path: `/projects/${ projectId }/repository/files`,
      query: {
        file_path: filePath,
        branch_name: branchName,
        content: window.btoa( content ),
        encoding: 'base64',
        commit_message: commitMessage
      },
      headers: { 'PRIVATE-TOKEN': token }
    }, cb );
  }
};

export default APIHandler;
