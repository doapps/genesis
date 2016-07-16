import React from 'react';

import Main from 'components/main';
import { TitleSection, SubtitleSection } from 'components/section';
import NavigationButtons from 'components/navigation';
import ConnectionCard from 'components/connection-card';

const IntegrationsSetupSection = React.createClass( {
  render() {
    return (
      <Main>
        <TitleSection/>
        <SubtitleSection/>
          <div className="columns is-multiline">
            <ConnectionCard/>
            <ConnectionCard/>
            <ConnectionCard/>
          </div>
        <br/>
        <NavigationButtons/>
      </Main>
    );
  }
} );

export default IntegrationsSetupSection;
