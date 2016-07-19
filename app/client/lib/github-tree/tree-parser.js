import find from 'lodash/find';
import filter from 'lodash/filter';

const debug = require( 'debug' )( 'app:lib:github-tree:tree-parser' );

function selectTrees( children ) {
  return children.reduce( ( directoryDependent, element, index ) => {
    if ( element.type === 'tree' || element.name.indexOf( '/' ) !== -1 ) {
      directoryDependent.push( element );
      children[ index ] = undefined;
    }

    return directoryDependent;
  }, [] );
}

function findParentDirs( filesWithDirectories ) {
  return filesWithDirectories.map( file => file.name.split( '/' ) )
    .filter( pathArr => pathArr.length === 1 )
    .map( dir => dir[ 0 ] );
}

function removeParentDir( file ) {
  const fileArr = file.name.split( '/' );

  fileArr.shift();
  file.name = fileArr.join( '/' );

  return file;
}

function childrenOfParentDir( files, parentDir ) {
  // searches for only those files which have the same parent dir
  const childrenFiles = filter( files, function( file ) {
    return file.name !== parentDir && file.name.split( '/' )[ 0 ] === parentDir;
  } );

  // removes the parent dir (e.g. 'src/client/styles' --> 'client/styles')
  const childrenWithoutParentPaths = childrenFiles.map( removeParentDir );

  return childrenWithoutParentPaths;
}

function destructiveReject( array, rejectItem ) {
  while ( array.indexOf( rejectItem ) !== -1 ) {
    const i = array.indexOf( rejectItem );

    array.splice( i, 1 );
  }

  return array;
}

export default function constructTree( children ) {
  const filesWithDirectories = selectTrees( children ),
    parentDirs = findParentDirs( filesWithDirectories );

  destructiveReject( children );

  return parentDirs.forEach( function( dir ) {
    const childPaths = childrenOfParentDir( filesWithDirectories, dir );

    children.push( {
      name: dir,
      children: childPaths
    } );

    const newChildren = find( children, { name: dir } ).children;

    constructTree( newChildren );
  } );
}
