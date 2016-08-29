import async from 'async';
import each from 'async/each';

import APIHandler from 'lib/api-handler';
import ProjectBuilderActions from 'lib/project-builder/actions';
import { buildConstants, integrationsConstants } from 'lib/project-builder/build-status-constants';

const debug = require( 'debug' )( 'app:lib:integrations:gitlab:builder' );

const integrationName = integrationsConstants.GITLAB;
const defaultBranch = 'master';
const defaultInitialCommit = 'initial commit :rocket:';

function buildRepositories( environment, cb ) {
  const {
    gitlabToken: token,
    projectName,
    repositories,
    gitlabUsername
  } = environment;

  const buildStatusLoading = {
    status: buildConstants.LOADING,
    data: {}
  };

  ProjectBuilderActions.setBuildStatus( integrationName, buildStatusLoading );

  debug( 'repositories', repositories );

  each( repositories, ( repository, nextRepo ) => {
    const { repoName, branches, files, additionalReadmeText } = repository;

    APIHandler.createNewRepository( token, repoName, ( errNewRepo, repoData ) => {
      if ( errNewRepo ) {
        debug( 'errNewRepo', errNewRepo );
        return;
      }

      const { id: projectId } = repoData;
      async.forEachSeries( files, ( file, nextFile ) => {
        const { filename, raw } = file;

        const fileContent = raw( projectName, additionalReadmeText ? additionalReadmeText( gitlabUsername, repoName ) : '' );

        debug( 'fileContent', fileContent );
        debug( 'window.btoa( fileContent )', window.btoa( fileContent ) );

        APIHandler.createFileOnBranch( token, projectId, filename, defaultBranch, fileContent, defaultInitialCommit, errNewFile => {
          if ( errNewFile ) {
            debug( 'errNewFile', errNewFile );
            return;
          }

          each( branches, ( branch, nextBranch ) => {
            if ( branch === defaultBranch ) {
              nextBranch();
              return;
            }

            //  -------------------------------------------------------------
            // |                          WARNING                            |
            //  -------------------------------------------------------------
            // | Currently, there are a potential bug in case that a file    |
            // | contains many branches due to creation continuity design,   |
            // | so for the moment this will reponse well if there are only  |
            // | one file by many branches project                           |
            //  -------------------------------------------------------------
            APIHandler.createBranchOnProject( token, projectId, branch, err => {
              if ( err ) {
                debug( 'err', err );
              }

              nextBranch();
            } );
          }, errBranches => {
            if ( errBranches ) {
              debug( 'errBranches', errBranches );
              return;
            }

            nextFile();
          } );
        } );
      }, errFiles => {
        if ( errFiles ) {
          debug( 'errFiles', errFiles );
          return;
        }

        nextRepo();
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
        doneURL: `https://gitlab.com/u/${ gitlabUsername }/projects`
      }
    };

    debug( 'done gitlab' );
    ProjectBuilderActions.setBuildStatus( integrationName, buildStatus );

    cb( null, { status: 200 } );
  } );
}

export default buildRepositories;
