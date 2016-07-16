import React from 'react';

const ConnectionCard = React.createClass( {
  render() {
    return (
      <div className="column is-one-third">
        <div className="box">
          <article className="media">
            <div className="media-content">
              <div className="content">
                <p className="title">
                  <span className="icon is-medium">
                    <i className="fa fa-slack"></i>
                  </span>
                  Slack
                  <small>for chat group</small>
                </p>
              </div>
            </div>
            <div className="media-right">
              <button className="button is-success is-outlined">Connect</button>
            </div>
          </article>
        </div>
      </div>
    );
  }
} );

export default ConnectionCard;
