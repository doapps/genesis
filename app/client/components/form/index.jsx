import React from 'react';
import classnames from 'classnames';

export const TextInput = React.createClass( {
  getDefaultProps() {
    return {
      isCorrect: false,
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
  render() {
    return (
      <p className="control">
        <label className="checkbox">
          <input type="checkbox"/> Android
        </label>&nbsp;
        <label className="checkbox">
          <input type="checkbox"/> iOS
        </label>&nbsp;
        <label className="checkbox">
          <input type="checkbox"/> Web
        </label>
      </p>
    );
  }
} );

export const Step = React.createClass( {
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
  render() {
    return (
      <div className="hero-buttons">
        <a className="button is-info is-large">
          <span className="icon is-medium">
            <i className="fa fa-gears"></i>
          </span>
          <span>Construir</span>
        </a>
      </div>
    );
  }
} );
