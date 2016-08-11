import React from 'react';
import classnames from 'classnames';
import omit from 'lodash/omit';

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
      'is-success': isCorrect,
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

  render() {
    const { isWorkingInProgress, isWorkingDone } = this.props;
    let styleButton = classnames( {
      button: true,
      'is-info': ! isWorkingDone,
      'is-large': true,
      'is-loading': isWorkingInProgress,
      'is-disabled': isWorkingInProgress
    } );

    styleButton = isWorkingDone ? `${ styleButton } is-disabled` : styleButton;

    return (
      <div className="hero-buttons">
        <a onClick={ this.props.onClick } className={ styleButton }>
          <span className="icon is-medium">
            <i className="fa fa-gears"></i>
          </span>
          <span>
            {
              isWorkingDone
              ? 'Completed'
              : 'Build'
            }
          </span>
        </a>
      </div>
    );
  }
} );
