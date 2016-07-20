import React from 'react';
import classnames from 'classnames';

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
    const { isCorrect, placeholder } = this.props;

    const styleInput = classnames( {
      input: true,
      'is-medium': true,
      'is-success': isCorrect
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
          { ...this.props } />
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
    return (
      <div className="hero-buttons">
        <a onClick={ this.props.onClick } className="button is-info is-large">
          <span className="icon is-medium">
            <i className="fa fa-gears"></i>
          </span>
          <span>Build</span>
        </a>
      </div>
    );
  }
} );
