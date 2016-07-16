import React from 'react';

import Main from 'components/main';
import { Step, TextInput, CheckBox } from 'components/form';
import { TitleSection, SubtitleSection } from 'components/section';
import NavigationButtons from 'components/navigation';

const BasicSetupSection = React.createClass( {
  render() {
    return (
      <Main>
        <TitleSection/>
        <SubtitleSection/>
        <Step>
          <TextInput placeholder="Proyecto Nuevo"/>
        </Step>
        <Step>
          <TextInput placeholder="proyecto-nuevo"/>
        </Step>
        <Step>
          <CheckBox/>
        </Step>
        <br/>
        <NavigationButtons/>
      </Main>
    );
  }
} );

export default BasicSetupSection;
