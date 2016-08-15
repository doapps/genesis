import RequestHandler from 'lib/api-handler/request-handler';

const gitlabPath = 'https://gitlab.com/api/v3';
const gitlabHandler = new RequestHandler( gitlabPath );

const gitlabAPI = {
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

export default gitlabAPI;
