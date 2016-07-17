import React from 'react';

import Main from 'components/main';
import { InputContainer, Step, TextInput, CheckBox } from 'components/form';
import { TitleSection, SubtitleSection } from 'components/section';
import NavigationButtons from 'components/navigation';

const BasicSetupSection = React.createClass( {
  displayName: 'BasicSetupSection',

  propTypes: {
    updateProjectName: React.PropTypes.func
  },

//  getDefaultProps: function() {},

  render() {
    return (
      <Main>
        <TitleSection>
          Configuración de los datos del proyecto
        </TitleSection>
        <SubtitleSection>
          Ingrese la información básica para entender la naturaleza del <strong>proyecto</strong>
        </SubtitleSection>
        <Step
          stepNumber="1"
          title="Ingrese el nombre del proyecto">
          <TextInput
            placeholder="Proyecto Nuevo"
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
        <Step
          stepNumber="3"
          title="Seleccione los dispositivos a crear">
          <InputContainer>
            <CheckBox
              label="Android"
              onClick={ this.props.checkTarget.bind( null, 'targetAndroidCheckbox' ) }/>
            <CheckBox
              label="iOS"
              onClick={ this.props.checkTarget.bind( null, 'targetIosCheckbox' ) }/>
            <CheckBox
              label="Web"
              onClick={ this.props.checkTarget.bind( null, 'targetWebCheckbox' ) }/>
          </InputContainer>
        </Step>
        <br/>
        <NavigationButtons onClick={ this.props.goToNextStep }/>
      </Main>
    );
  }
} );

export default BasicSetupSection;
