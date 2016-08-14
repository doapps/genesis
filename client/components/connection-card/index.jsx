import React from 'react';
import classnames from 'classnames';

const ConnectionCard = React.createClass( {
  getInitialState() {
    return {
      isWorking: false,
    }
  },

  onClickConnection() {
    this.props.onClick();
    this.setState( { isWorking: true } );
  },

  renderButtonConnect() {
    const { isWorking } = this.state;

    const buttonStyle = classnames( {
      button: true,
      'is-info': true,
      'is-disabled': isWorking,
      'is-loading': isWorking,
    } );

    return (
      <button
        className={ buttonStyle }
        onClick={ this.onClickConnection }>
        Connect
      </button>
    );
  },

  renderTagInfoConnected() {
    const infoText = `Logged as ${ this.props.infoLogged.username }`;

    return (
      <span className="tag is-dark is-medium">
        <i className="fa fa-check"></i>&nbsp;
          { infoText }
      </span>
    );
  },

  render() {
    const {
      title,
      description,
      iconClass,
      infoLogged
    } = this.props;

    return (
      <div className="columns">
        <div className="column">
          <div className="box">
            <article className="media">
              <div className="media-content">
                <div className="content">
                  <p className="title">
                    <span className="icon is-medium">
                      <i className={ iconClass }></i>
                    </span>&nbsp;{ title }
                    <small>&nbsp;{ description }</small>
                  </p>
                </div>
              </div>
              <div className="media-right">
                {
                  infoLogged
                  ? this.renderTagInfoConnected()
                  : this.renderButtonConnect()
                }
              </div>
            </article>
          </div>
        </div>
      </div>
    );
  }
} );

export default ConnectionCard;
