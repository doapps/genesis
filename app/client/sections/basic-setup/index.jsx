import React from 'react';

import Main from 'components/main';
import { InputContainer, Step, TextInput, CheckBox, Tag } from 'components/form';
import { TitleSection, SubtitleSection } from 'components/section';
import NavigationButtons from 'components/navigation';

const debug = require( 'debug' )( 'app:sections:basic-setup' );

const ScopeSection = React.createClass( {
  displayName: 'ScopeSection',

  renderListBody() {
    const {
      scopes,
      onChangeScopeValue,
      removeScope,
      indexTarget
    } = this.props;

    return scopes.map( ( scope, indexScope ) =>
      <p key={ indexScope } className="control has-addons">
        <input
          className="input is-expanded is-medium"
          type="text"
          placeholder="name"
          value={ scope.value }
          onChange={ onChangeScopeValue.bind( null, indexTarget, indexScope ) } />
        <a
          onClick={ removeScope.bind( null, indexTarget, indexScope ) }
          className={ 'button is-danger is-medium ' + ( ( scopes.length === 1 && indexScope === 0 ) ? 'is-disabled' : '' ) }>
          <span className="icon">
            <i className="fa fa-trash-o"></i>
          </span>
        </a>
      </p>
    )
  },

  renderSelectBody() {
    const {
      scopes,
      checkIfScopeSelected,
      deselectScope,
      checkIfAreSelectedScopes
    } = this.props;

    return (
      <p className="control has-addons">
        {
          checkIfAreSelectedScopes()
          ? scopes.map( ( scope, indexScope ) => {
              return checkIfScopeSelected( scope.value )
              ? <span key={ indexScope }>
                  <span className="tag is-dark is-medium">
                    { scope.title }
                    <button
                      onClick={ deselectScope.bind( null, scope.value ) }
                      className="delete"></button>
                  </span>
                  &nbsp;
                </span>
              : null
            } )
          : <code>No hay aplicaciones seleccionadas</code>
        }
      </p>
    );
  },

  renderSectionType( type ) {
    switch ( type ) {
      case 'list':
        return this.renderListBody();
      case 'select':
        return this.renderSelectBody();
    }
  },

  getTitleHeader() {
    const { title } = this.props;

    return (
      <strong>{ title }&nbsp;</strong>
    );
  },

  renderListHeader() {
    const {
      addScope,
      indexTarget
    } = this.props;

    return (
      <span>
        { this.getTitleHeader() }
        <a onClick={ addScope.bind( null, indexTarget ) }>
          <small style={ { color: '#fce473' } }>más</small>
        </a>
      </span>
    );
  },

  renderSelectHeader() {
    const {
      scopes,
      checkIfScopeSelected,
      selectScope
    } = this.props;

    return (
      <span>
        { this.getTitleHeader() }
        {
          scopes.map( ( scope, indexScope ) => {
            return ! checkIfScopeSelected( scope.value )
            ? <a key={ indexScope } onClick={ selectScope.bind( null, scope.value ) }>
                <span className="tag is-warning is-small">
                  { scope.title }
                </span>
                &nbsp;
              </a>
            : null
          } )
        }
      </span>
    );
  },

  renderHeaderType( type ) {
    switch ( type ) {
      case 'list':
        return this.renderListHeader();
      case 'select':
        return this.renderSelectHeader();
    }
  },

  render() {
    const { typeSection } = this.props;

    return (
      <article className="message">
        <div className="message-header">
          { this.renderHeaderType( typeSection ) }
        </div>
        <div className="message-body">
          { this.renderSectionType( typeSection ) }
        </div>
      </article>
    );
  }
} );

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
                  checkIfAreSelectedScopes={ this.props.checkIfAreSelectedScopes }
                  checkIfScopeSelected={ this.props.checkIfScopeSelected }
                  onChangeScopeValue={ this.props.onChangeScopeValue } />
              : null
            } )
          }
        </Step>
        <br/>
        <NavigationButtons
          onClickNext={ this.props.goToNextStep } />
      </Main>
    );
  }
} );

export default BasicSetupSection;
