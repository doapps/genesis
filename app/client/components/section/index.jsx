import React from 'react';

export const TitleSection = React.createClass( {
  render() {
    return (
      <h3 className="title">
        { this.props.children }
      </h3>
    );
  }
} );

export const SubtitleSection = React.createClass( {
  render() {
    return (
      <div className="content">
        <p>
          { this.props.children }
        </p>
      </div>
    );
  }
} );
