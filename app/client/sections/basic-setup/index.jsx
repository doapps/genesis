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
            onChange={ this.props.updateProjectNamespace } />
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
              label="Web App"
              onClick={ this.props.checkTarget.bind( null, 'targetWebCheckbox' ) }/>
            <CheckBox
              label="Web Admin"
              onClick={ this.props.checkTarget.bind( null, 'targetWebCheckbox' ) }/>
          </InputContainer>
        </Step>
        <Step
          stepNumber="4"
          title="Ingrese los perfiles por dispositivo"
          description="Por defecto se crea un scope por cada target">
          <article className="message is-light_">
            <div className="message-header">
              <strong>Android&nbsp;</strong>
              <a>
                <small>más</small>
              </a>
            </div>
            <div className="message-body">
              <p className="control has-addons">
                <input className="input is-expanded is-medium" type="text" placeholder="client"/>
                <a className="button is-danger is-medium is-disabled">
                  <span className="icon">
                    <i className="fa fa-trash-o"></i>
                  </span>
                </a>
              </p>
              <p className="control has-addons">
                <input className="input is-expanded is-medium" type="text" placeholder="client"/>
                <a className="button is-danger is-medium">
                  <span className="icon">
                    <i className="fa fa-trash-o"></i>
                  </span>
                </a>
              </p>
            </div>
          </article>
          <article className="message is-light_">
            <div className="message-header">
              <strong>iOS&nbsp;</strong>
              <a>
                <small>más</small>
              </a>
            </div>
            <div className="message-body">
              <p className="control has-addons">
                <input className="input is-expanded is-medium" type="text" placeholder="client"/>
                <a className="button is-danger is-medium is-disabled">
                  <span className="icon">
                    <i className="fa fa-trash-o"></i>
                  </span>
                </a>
              </p>
            </div>
          </article>
        </Step>
        <br/>
        <NavigationButtons onClick={ this.props.goToNextStep }/>
      </Main>
    );
  }
} );

export default BasicSetupSection;
