import React from 'react';

export const TextInput = React.createClass( {
  render() {
    return (
      <p className="control has-icon has-icon-right">
        <input
          className="input is-medium is-success"
          type="text"
          placeholder={ this.props.placeholder } />
        <i className="fa fa-check"></i>
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
  render() {
    return (
      <article className="media is-large">
        <div className="media-number">1</div>
        <div className="media-content">
          <p className="title is-5">
            <strong>Ingrese</strong> el nombre del proyecto:
          </p>
          { this.props.children }
          <div className="content">
            con este nombre se crearán todas las carpetas y repositorios
          </div>
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
