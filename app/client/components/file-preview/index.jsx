import React from 'react';

const FilePreview = React.createClass( {
  render() {
    return (
      <div className="notification">
        <div className="content">
          <h1>Title</h1>
          <p>Paragraph</p>
          <h2>Subtitle</h2>
          <p>Paragraph</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
          <h3>SubSubtitle</h3>
          <p>Paragraph</p>
          <ol>
            <li>Number 1</li>
            <li>Number 2</li>
          </ol>
          <blockquote>quote</blockquote>
          <p>Paragraph</p>
        </div>
      </div>
    );
  }
} );

export default FilePreview;
