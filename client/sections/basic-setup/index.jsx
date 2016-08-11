import React from 'react';

import Main from 'components/main';
import { InputContainer, Step, TextInput, CheckBox, Tag, SelectFolderDrive } from 'components/form';
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
          title={ <span>Ingrese el <strong>nombre</strong> del proyecto</span> }>
          <TextInput
            placeholder="Proyecto Nuevo"
            isCorrect={ !! this.props.projectName }
            value={ this.props.projectName }
            onChange={ this.props.updateProjectName } />
        </Step>
        <Step
          stepNumber="2"
          title={ <span>El nombre de <strong>identificación</strong> es el siguiente</span> }
          description="con este nombre se crearán todas las carpetas, repositorios, canales y más." >
          <TextInput
            placeholder="proyecto-nuevo"
            value={ this.props.projectNamespace }
            isDisabled
            onChange={ this.props.updateProjectNamespace } />
        </Step>
        <Step
          stepNumber="3"
          title={ <span>Seleccione los <strong>dispositivos</strong></span> }>
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
          title={ <span>Seleccione los <strong>módulos</strong> backend</span> }>
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
          title={ <span>Ingrese las <strong>aplicaciones</strong> por dispositivo</span> }
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
          title={ <span>Seleccione la <strong>carpeta raíz</strong></span> }
          description={ <span>Aquí se creará la carpeta <strong>{ this.props.projectNamespace }</strong></span> }>
          <SelectFolderDrive handleSelection={ this.props.setRootFolderId } />
        </Step>
        <Step
          stepNumber="7"
          title={ <span>Seleccione la <strong>carpeta de templates</strong></span> }
          description="Esta carpeta debe contener todos los templates descritos en el dspp">
          <SelectFolderDrive handleSelection={ this.props.setTemplatesFolderId } />
        </Step>
        <br/>
        <NavigationButtons
          onClickNext={ this.props.goToNextStep } />
      </Main>
    );
  }
} );

export default BasicSetupSection;
