import each from 'async/each';

import APIHandler from 'lib/api-handler';
import ProjectBuilderActions from 'lib/project-builder/actions';
import { buildConstants, integrationsConstants } from 'lib/project-builder/build-status-constants';

const debug = require( 'debug' )( 'app:lib:integrations:gitlab:builder' );

const getInitialReadme = projectName => `
# ${ projectName }
New project content

## Licence
DoApps
`;

const integrationName = integrationsConstants.GITLAB;

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

function buildRepositories( environment, cb ) {
  const {
    gitlabToken: token,
    repositories
  } = environment;

  const buildStatusLoading = {
    status: buildConstants.LOADING,
    data: {}
  };

  ProjectBuilderActions.setBuildStatus( integrationName, buildStatusLoading );

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
      const commitMessage = 'initial commit :rocket:';

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

    const buildStatus = {
      status: buildConstants.DONE,
      data: {
        doneURL: `https://gitlab.com`
      }
    };

    debug( 'done gitlab' );
    ProjectBuilderActions.setBuildStatus( integrationName, buildStatus );

    cb( null, { status: 200 } );
  } );
}

export default buildRepositories;
