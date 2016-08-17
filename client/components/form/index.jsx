import React from 'react';
import classnames from 'classnames';
import omit from 'lodash/omit';

import { createPicker } from 'lib/integrations/google-drive';
import { globalBuildConstants } from 'lib/project-builder/build-status-constants';

const debug = require( 'debug' )( 'app:components:form' );

export const InputContainer = ( { children } ) => (
  <div className="control">
    { children }
  </div>
);

export const TextInput = React.createClass( {
  displayName: 'TextInput',

  getDefaultProps() {
    return {
      placeholder: 'New Project'
    }
  },

  render() {
    const { isCorrect, isDisabled, placeholder } = this.props;

    const styleInput = classnames( {
      input: true,
      'is-medium': true,
      'is-dark': isCorrect,
      'is-disabled': isDisabled
    } );

    const icon = isCorrect
      ? <i className="fa fa-check"></i>
      : null;

    return (
      <p className="control has-icon has-icon-right">
        <input
          className={ styleInput }
          type="text"
          placeholder={ placeholder }
          { ...omit( this.props, [ 'isDisabled', 'isCorrect', 'placeholder' ] ) } />
        { icon }
      </p>
    );
  }
} );

export const CheckBox = React.createClass( {
  displayName: 'CheckBox',

  render() {
    return (
      <label className="checkbox">
        <input
          type="checkbox"
          { ...this.props } />
          &nbsp;{ this.props.label }&nbsp;
      </label>
    );
  }
} );

export const Tag = props => {
  const { isSelected, label, onClickSelect, onClickDeselect } = props;
  let styleTag, Wrapper;

  styleTag = classnames( {
    tag: true,
    'is-medium': true,
    'is-dark': isSelected,
    'is-light': ! isSelected
  } );

  Wrapper = ( { children, onClickSelectWrapper } ) => {
    return isSelected
      ? <span>
          { children }
        </span>
      : <a onClick={ onClickSelectWrapper }>
          { children }
        </a>;
  };

  return (
    <Wrapper
      isSelected={ isSelected }
      onClickSelectWrapper={ onClickSelect } >
      <span
        className={ styleTag }>
        { label }
        {
          isSelected
          ? <button
              onClick={ onClickDeselect }
              className="delete"></button>
          : null
        }
      </span>
      &nbsp;
    </Wrapper>
  );
};

export const Step = React.createClass( {
  displayName: 'Step',

  getDefaultProps() {
    return {
      stepNumber: '#',
      title: 'This is a step',
      description: null
    }
  },

  render() {
    const { stepNumber, title, description } = this.props;

    return (
      <article className="media is-large">
        <div className="media-number">{ stepNumber }</div>
        <div className="media-content">
          <p className="title is-5">
            { title }
          </p>
          { this.props.children }
          {
            description
            ? <div className="content">
                { description }
              </div>
            : null
          }
        </div>
      </article>
    );
  }
} );

export const BuildButton = React.createClass( {
  displayName: 'BuildButton',

  getButtonContext( state ) {
    let buttonProps;

    switch ( state ) {
      case globalBuildConstants.IDLE:
        buttonProps = {
          icon: 'fa fa-gears',
          text: 'Build'
        };
        break;
      case globalBuildConstants.LOADING:
        buttonProps = {
          icon: 'fa fa-cog fa-spin fa-3x fa-fw',
          text: 'Building'
        };
        break;
      case globalBuildConstants.DONE:
        buttonProps = {
          icon: 'fa fa-check',
          text: 'Completed'
        };
        break;
    }

    return buttonProps;
  },

  render() {
    const { statusButton, onClick } = this.props;
    const buttonProps = this.getButtonContext( statusButton );
    const styleButton = classnames( {
      button: true,
      'is-large': true,
      'is-info': statusButton !== globalBuildConstants.DONE,
      'is-disabled': statusButton !== globalBuildConstants.IDLE
    } );

    return (
      <div className="hero-buttons">
        <a onClick={ onClick } className={ styleButton }>
          <span className="icon is-medium">
            <i className={ buttonProps.icon }></i>
          </span>&nbsp;
          { buttonProps.text }
        </a>
      </div>
    );
  }
} );

export const SelectFolderDrive = React.createClass( {
  displayName: 'SelectFolderDrive',

  selectFolder() {
    const { handleSelection } = this.props;

    createPicker( resp => {
      const { folderId, folderName } = resp;

      handleSelection( folderId, folderName );
    } );
  },

  render() {
    const { folderName } = this.props;

    const styleContainer = classnames( {
      control: true,
      'has-addons': !! folderName
    } );

    const styleInput = classnames( {
      input: true,
      'is-disabled': true,
      'is-dark': !! folderName
    } );

    const styleButton = classnames( {
      button: true,
      'is-dark': !! folderName
    } );

    const buttonText = ! folderName ? 'Seleccionar Carpeta' : 'Cambiar Carpeta';
    const buttonIcon = ! folderName ? 'fa fa-folder-open' : 'fa fa-folder';

    return (
      <InputContainer>
        <p className={ styleContainer }>
          <a
            className={ styleButton }
            onClick={ this.selectFolder }>
            <span className="icon is-small">
              <i className={ buttonIcon }></i>
            </span>
            <span>
              { buttonText }
            </span>
          </a>
          {
            folderName
            ? <input
                className={ styleInput }
                type="text"
                readOnly
                value={ folderName }/>
            : null
          }
        </p>
      </InputContainer>
    );
  }
} );
