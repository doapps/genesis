import React from 'react';

import Main from 'components/main';
import NavigationButtons from 'components/navigation';
import DirectoryTree from 'components/directory-tree';
import FilePreview from 'components/file-preview';

const BasicSetupSection = React.createClass( {
  renderLoading() {
    return (
      <h1>Loading...</h1>
    );
  },

  renderDirectoryTree( projectTree ) {
    return (
      <DirectoryTree
        tree={ projectTree } />
    );
  },

  render() {
    const { projectTree } = this.props;
    let treeComponent;

    if ( ! projectTree ) {
      treeComponent = this.renderLoading();
    } else {
      treeComponent = this.renderDirectoryTree( projectTree );
    }

    return (
      <Main>
        <div className="columns">
          <div className="column is-3">
            { treeComponent }
          </div>
          <div className="column">
            <FilePreview />
          </div>
        </div>
        <br/>
        <NavigationButtons/>
      </Main>
    );
  }
} );

export default BasicSetupSection;
