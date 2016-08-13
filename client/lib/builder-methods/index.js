import async from 'async';
import toml from 'toml';

import APIHandler from 'lib/api-handler';
import { runScriptBuilder } from 'lib/integrations/google-drive';

const debug = require( 'debug' )( 'app:lib:builder-methods' );
const templatesFilename = 'templates.toml';

const globalVariables = {
  projectName: '',
  projectNamespace: ''
};

const macrotargetRegex = /<macrotarget>/g;
const targetRegex = /<target>/g;
const scopeRegex = /<scope>/g;

function setGlobalVariables( projectName, projectNamespace ) {
  globalVariables.projectName = projectName;
  globalVariables.projectNamespace = projectNamespace;
}

function getTemplatesList( cb ) {
  const path = templatesFilename;
  APIHandler.fetchInternalsContent( path, ( err, templatesText ) => {
    if ( err ) {
      cb( err, null );
      return;
    }

    const parsedStructure = toml.parse( templatesText );
    cb( null, parsedStructure );
  } );
}

function getAndParseFileContent( path, cb ) {
  APIHandler.fetchFileContent( path, ( error, content ) => {
    if ( error ) {
      debug( 'error', error );
      cb( error, null );
      return;
    }

    const parsedStructure = toml.parse( content );
    cb( null, parsedStructure );
  } );
}

function getAllFileBuilderContents( listFileBuilders, cb ) {
  const builderFilesStructure = {};

  async.forEachSeries( listFileBuilders, ( folderPath, next ) => {
    const filePath = `${ folderPath }/files.toml`;
    getAndParseFileContent( filePath, ( error, data ) => {
      if ( error ) {
        debug( 'error', error );
      }

      builderFilesStructure[ folderPath ] = data;
      next();
    } );
  }, () => {
    cb( builderFilesStructure );
  } );
}

function middlewareFillGlobals( objTemplates ) {
  for ( let template in objTemplates ) {
    const templateElement = objTemplates[ template ];

    if ( templateElement.body ) {
      for ( let variable in templateElement.body ) {
        const variableContent = templateElement.body[ variable ];

        templateElement.body[ variable ] = variableContent
          .replace( /<project-name>/g, globalVariables.projectName )
          .replace( /<namespace>/g, globalVariables.projectNamespace );
      }
    }
  }
}

function normalizeFiles( filesStructure, { scopes = [], targets = [], macrotargets = [] } ) {
  const normalizedFiles = {};

  for ( let path in filesStructure ) {
    const pathObj = filesStructure[ path ];
    normalizedFiles[ path ] = {};

    for ( let file in pathObj ) {
      const fileProps = pathObj[ file ];

      if ( macrotargetRegex.test( file ) ) {
        macrotargets.forEach( macrotarget => {
          const newFilename = file.replace( macrotargetRegex, macrotarget );
          let fileBody = Object.assign( {}, fileProps.body );

          if ( fileProps.body ) {
            for ( let prop in fileProps.body ) {
              fileBody[ prop ] = fileProps.body[ prop ].replace( macrotargetRegex, macrotarget );
            }

            fileProps.body = fileBody;
          }

          normalizedFiles[ path ][ newFilename ] = fileProps;
        } );
      } else if ( targetRegex.test( file ) ) {
        targets.forEach( target => {
          const newFilename = file.replace( targetRegex, target );
          let fileBody = Object.assign( {}, fileProps.body );

          if ( fileProps.body ) {
            for ( let prop in fileProps.body ) {
              fileBody[ prop ] = fileProps.body[ prop ].replace( targetRegex, target );
            }

            fileProps.body = fileBody;
          }

          normalizedFiles[ path ][ newFilename ] = fileProps;
        } );
      } else if ( scopeRegex.test( file ) ) {
        scopes.forEach( scope => {
          let newFilename, fileBody;

          if ( scopes.length === 1 ) {
            // this temporal workaround manages
            // "requirements.<scope>" but not "requirements.<scope>.body"
            newFilename = file.replace( scopeRegex, '' ).slice( 0, - 1 );
          } else {
            newFilename = file.replace( scopeRegex, scope );
          }

          fileBody = Object.assign( {}, fileProps.body );

          if ( fileProps.body ) {
            for ( let prop in fileProps.body ) {
              fileBody[ prop ] = fileProps.body[ prop ].replace( scopeRegex, scope );
            }

            fileProps.body = fileBody;
          }

          normalizedFiles[ path ][ newFilename ] = fileProps;
        } );
      } else {
        normalizedFiles[ path ][ file ] = fileProps;
      }
    }
  }

  return normalizedFiles;
}

const BuilderMethods = {
  buildProject( environment, cb ) {
    const {
      listFileBuilders,
      objFolders,
      projectName,
      projectNamespace,
      rootFolderId,
      templatesFolderId,
      scopes,
      targets,
      macrotargets,
    } = environment;

    debug( 'scopes', scopes );
    debug( 'targets', targets );
    debug( 'macrotargets', macrotargets );

    setGlobalVariables( projectName, projectNamespace );

    getTemplatesList( ( errTemplates, dataTemplates ) => {
      if ( errTemplates ) {
        debug( 'errTemplates', errTemplates );
      }

      middlewareFillGlobals( dataTemplates );

      getAllFileBuilderContents( listFileBuilders, filesStructure => {
        const filesToBuild = normalizeFiles( filesStructure, { scopes, targets, macrotargets } );
        const ownerFoldersInfo = {
          rootFolderId,
          templatesFolderId,
          projectNamespace
        };

        const buildParameters = {
          objFolders,
          dataTemplates,
          filesToBuild,
          ownerFoldersInfo
        };

        debug( 'buildParameters', buildParameters );

        // cb( null, { folderId: 'folderId' } );
        runScriptBuilder( buildParameters, cb );
      } );
    } );
  }
};

export default BuilderMethods;
