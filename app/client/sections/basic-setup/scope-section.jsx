import React from 'react';

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

export default ScopeSection;
