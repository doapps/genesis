import each from 'async/each';

import APIHandler from 'lib/api-handler';

const debug = require( 'debug' )( 'app:lib:builder-methods:gitlab:builder' );

const getInitialReadme = projectName => `
# ${ projectName }
New project content

## Licence
DoApps
`;

function createBranches( token, projectId, cb ) {
  const listBranches = [ 'development', 'release', 'hotfix' ];

  each( listBranches, ( branch, next ) => {
    APIHandler.createBranchOnProject( token, projectId, branch, err => {
      if ( err ) {
        debug( 'err', err );
      }

      next();
    } );
  }, err => {
    if ( err ) {
      cb( err );
      return;
    }

    cb();
  } );
}

function buildRepositories( token, repositories = [], cb ) {
  each( repositories, ( repository, next ) => {
    APIHandler.createNewRepository( token, repository, ( errNewRepo, repoData ) => {
      if ( errNewRepo ) {
        debug( 'errNewRepo', errNewRepo );
        return;
      }

      const { id: projectId } = repoData;
      const filePath = 'README.md';
      const branchName = 'master';
      const content = getInitialReadme( repository );
      const commitMessage = 'initial commit';

      APIHandler.createFileOnBranch( token, projectId, filePath, branchName, content, commitMessage, errNewFile => {
        if ( errNewFile ) {
          debug( 'errNewFile', errNewFile );
          return;
        }

        createBranches( token, projectId, errBranches => {
          if ( errBranches ) {
            debug( 'errBranches', errBranches );
            return;
          }

          next();
        } );
      } );
    } );
  }, errExecution => {
    if ( errExecution ) {
      cb( errExecution, null );
      return;
    }

    cb( null, 'done gitlab' );
  } );
}

export default buildRepositories;
