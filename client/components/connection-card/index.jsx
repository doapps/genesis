import React from 'react';
import classnames from 'classnames';

const ConnectionCard = React.createClass( {
  render() {
    const {
      title,
      description,
      iconClass,
      onClick,
      isConnected
    } = this.props;

    let textButton = 'Connect',
      iconConnected = null;

    const buttonStyle = classnames( {
      button: true,
      'is-success': isConnected,
      'is-info': ! isConnected,
      'is-outlined': ! isConnected,
      'is-disabled': isConnected
    } );

    if ( isConnected ) {
      textButton = 'Connected';
      iconConnected = <span className="icon">
                        <i className="fa fa-check"></i>
                      </span>;
    }

    return (
      <div className="column is-one-third">
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
              <button
                className={ buttonStyle }
                onClick={ onClick }>
                { iconConnected }
                { textButton }
              </button>
            </div>
          </article>
        </div>
      </div>
    );
  }
} );

export default ConnectionCard;
