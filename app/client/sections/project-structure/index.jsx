import React from 'react';

import Main from 'components/main';
import { Step, TextInput, CheckBox } from 'components/form';
import { TitleSection, SubtitleSection } from 'components/section';
import NavigationButtons from 'components/navigation';
import DirectoryTree from 'components/directory-tree';
import FilePreview from 'components/file-preview';

const BasicSetupSection = React.createClass( {
  render() {
    return (
      <Main>
        <div className="columns">
          <div className="column is-3">
            <DirectoryTree
              tree={ this.props.projectTree } />
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
