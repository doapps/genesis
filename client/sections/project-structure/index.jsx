import React from 'react';

import Main from 'components/main';
import { TitleSection, SubtitleSection } from 'components/section';
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
    let { projectTree, projectNamespace } = this.props;
    let treeComponent;

    if ( ! projectTree ) {
      treeComponent = this.renderLoading();
    } else {
      projectTree = Object.assign( {}, projectTree, { name: projectNamespace } );
      treeComponent = this.renderDirectoryTree( projectTree );
    }

    return (
      <Main>
        <TitleSection>
          Estructura del proyecto
        </TitleSection>
        <SubtitleSection>
          Se construirá la siguiente estructura de archivos y carpetas.
        </SubtitleSection>
        <div className="columns">
          <div className="column is-3">
            { treeComponent }
          </div>
          <div className="column">
            <FilePreview />
          </div>
        </div>
        <br/>
        <NavigationButtons
          onClickNext={ this.props.goToNextStep }
          onClickPrevious={ this.props.goToPreviousStep } />
      </Main>
    );
  }
} );

export default BasicSetupSection;
