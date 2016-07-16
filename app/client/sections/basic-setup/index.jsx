import React from 'react';

import Main from 'components/main';
import { Step, TextInput, CheckBox } from 'components/form';
import { TitleSection, SubtitleSection } from 'components/section';
import NavigationButtons from 'components/navigation';

const BasicSetupSection = React.createClass( {
  displayName: 'BasicSetupSection',

  propTypes: {
    updateProjectName: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      storedEmail: null
    };
  },

  render() {
    return (
      <Main>
        <TitleSection/>
        <SubtitleSection/>
        <Step
          stepNumber="1"
          title="Ingrese el nombre del proyecto">
          <TextInput
            placeholder="Proyecto Nuevo",
            value={ this.props.projectName }
            onChange={ this.props.updateProjectName } />
        </Step>
        <Step
          stepNumber="2"
          title="Establezca un nombre de identificacion"
          description="con este nombre se crearán todas las carpetas y repositorios" >
          <TextInput
            placeholder="proyecto-nuevo"
            value={ this.props.projectNamespace }
            onChange={ this.props.updateProjectNamespace }/>
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
