import React from 'react';

import Main from 'components/main';
import { InputContainer, Step, TextInput, CheckBox } from 'components/form';
import { TitleSection, SubtitleSection } from 'components/section';
import NavigationButtons from 'components/navigation';

const debug = require( 'debug' )( 'app:sections:basic-setup' );

const ScopeSection = React.createClass( {
  displayName: 'ScopeSection',

  render() {
    const { title, indexTarget, addScope, removeScope, scopes } = this.props;

    return (
      <article className="message">
        <div className="message-header">
          <strong>{ title }&nbsp;</strong>
          <a onClick={ addScope.bind( null, indexTarget ) }>
            <small>más</small>
          </a>
        </div>
        <div className="message-body">
          {
            scopes.map( ( scope, indexScope ) =>
              <p key={ indexScope } className="control has-addons">
                <input
                  className="input is-expanded is-medium"
                  type="text"
                  placeholder="customer"
                  value={ scope.value }
                  onChange={ 'scope.onChange.bind( null, index )' } />
                <a
                  onClick={ removeScope.bind( null, indexTarget, indexScope ) }
                  className={ 'button is-danger is-medium ' + ( indexScope === 0 ? 'is-disabled' : '' ) }>
                  <span className="icon">
                    <i className="fa fa-trash-o"></i>
                  </span>
                </a>
              </p>
            )
          }
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
    debug( 'render' );

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
          title="Establezca un nombre de identificación"
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
            {
              this.props.targets.map( ( target, indexTarget ) =>
                <CheckBox
                  key={ indexTarget }
                  label={ target.title }
                  onClick={ this.props.checkTarget.bind( null, target.namespace ) }/>
              )
            }
          </InputContainer>
        </Step>
        <Step
          stepNumber="4"
          title="Ingrese los perfiles por dispositivo"
          description="Por defecto se crea un scope por cada target">
          {
            this.props.targets.map( ( target, indexTarget ) => {
              return this.props.checkIfTargetSelected( target.namespace )
              ? <ScopeSection
                  key={ indexTarget }
                  indexTarget={ indexTarget }
                  title={ target.title }
                  scopes={ target.scopes }
                  addScope={ this.props.addScope }
                  removeScope={ this.props.removeScope } />
              : null
            } )
          }
        </Step>
        <br/>
        <NavigationButtons onClick={ this.props.goToNextStep }/>
      </Main>
    );
  }
} );

export default BasicSetupSection;
