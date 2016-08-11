import React from 'react';

import Main from 'components/main';
import { InputContainer, Step, TextInput, CheckBox, Tag } from 'components/form';
import { TitleSection, SubtitleSection } from 'components/section';
import NavigationButtons from 'components/navigation';
import ScopeSection from './scope-section';

const debug = require( 'debug' )( 'app:sections:basic-setup' );

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
            isCorrect={ !! this.props.projectName }
            value={ this.props.projectName }
            onChange={ this.props.updateProjectName } />
        </Step>
        <Step
          stepNumber="2"
          title="El nombre de identificación es el siguiente"
          description="con este nombre se crearán todas las carpetas, repositorios, canales y más." >
          <TextInput
            placeholder="proyecto-nuevo"
            value={ this.props.projectNamespace }
            isDisabled
            onChange={ this.props.updateProjectNamespace } />
        </Step>
        <Step
          stepNumber="3"
          title="Seleccione los dispositivos">
          <InputContainer>
            {
              this.props.targets.map( ( target, indexTarget ) =>
                <CheckBox
                  key={ indexTarget }
                  label={ target.title }
                  defaultChecked={ this.props.checkIfTargetSelected( target.namespace ) }
                  onClick={ this.props.checkTarget.bind( null, target.namespace ) } />
              )
            }
          </InputContainer>
        </Step>
        <Step
          stepNumber="4"
          title="Seleccione los módulos backend">
          <InputContainer>
            {
              this.props.backendSources.map( ( source, indexSource ) =>
                <Tag
                  key={ indexSource }
                  label={ source.title }
                  isSelected={ this.props.checkIfSourceSelected( source.value ) }
                  onClickSelect={ this.props.selectSource.bind( null, source.value ) }
                  onClickDeselect={ this.props.deselectSource.bind( null, source.value ) } />
              )
            }
          </InputContainer>
        </Step>
        <Step
          stepNumber="5"
          title="Ingrese las aplicaciones por dispositivo"
          description="Por defecto se crea una aplicación por dispositivo">
          {
            this.props.targets.map( ( target, indexTarget ) => {
              return this.props.checkIfTargetSelected( target.namespace )
              ? <ScopeSection
                  key={ indexTarget }
                  indexTarget={ indexTarget }
                  typeSection={ target.type }
                  title={ target.title }
                  scopes={ target.scopes }
                  addScope={ this.props.addScope }
                  selectScope={ this.props.selectScope }
                  deselectScope={ this.props.deselectScope }
                  removeScope={ this.props.removeScope }
                  onChangeScopeValue={ this.props.onChangeScopeValue }
                  checkIfAreSelectedScopes={ this.props.checkIfAreSelectedScopes }
                  checkIfScopeSelected={ this.props.checkIfScopeSelected } />
              : null
            } )
          }
        </Step>
        <Step
          stepNumber="6"
          title="Seleccione la carpeta raíz"
          description="En esta carpeta se creará la carpeta <namespace>">
          <InputContainer>
            <p className="control has-addons">
              <a className="button is-outlined">
                <span className="icon is-small">
                  <i className="fa fa-folder-open"></i>
                </span><span>Seleccionar carpeta</span>
              </a>
              <input className="input is-disabled is-success_ is-expanded_" type="text" placeholder="Root Folder"/>
            </p>
          </InputContainer>
        </Step>
        <Step
          stepNumber="7"
          title="Seleccione la carpeta de templates"
          description="Esta carpeta debe contener todos los templates descritos en el dspp">
          <InputContainer>
            <p className="control has-addons">
              <a className="button is-outlined">
                <span className="icon is-small">
                  <i className="fa fa-folder-open"></i>
                </span><span>Seleccionar carpeta</span>
              </a>
              <input className="input is-disabled is-success_ is-expanded_" type="text" placeholder="Templates Folder"/>
            </p>
          </InputContainer>
        </Step>
        <br/>
        <NavigationButtons
          onClickNext={ this.props.goToNextStep } />
      </Main>
    );
  }
} );

export default BasicSetupSection;
