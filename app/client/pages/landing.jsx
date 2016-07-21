import React from 'react';

import Footer from 'components/footer';

const Landing = React.createClass( {
  renderMainSection() {
    return (
      <section className="hero is-dark is-medium has-text-centered">
        <div className="hero-body">
          <div className="container">
            <p>
              <img style={ { height: '150px' } } src="http://www.doapps.me/images/logo-doapps.png" alt="Genesis"/>
            </p>
            <br/>
            <h1 className="title">Genesis</h1>
            <h2 className="subtitle">
              A modern project <strong>builder</strong>
              <br/>
              <small>for Google Drive</small>
            </h2>
            <iframe src="https://ghbtns.com/github-btn.html?user=doapps&amp;repo=genesis&amp;type=star&amp;count=true&amp;size=large" frameBorder="0" scrolling="0" width="150px" height="30px"></iframe>
            <iframe src="https://ghbtns.com/github-btn.html?user=doapps&amp;repo=genesis&amp;type=fork&amp;count=false&amp;size=large" frameBorder="0" scrolling="0" width="80px" height="30px"></iframe>
            <p className="hero-buttons">
              <a className="button is-info is-large">
                <span className="icon">
                  <i className="fa fa-sign-in"></i>
                </span>
                <span>Login</span>
              </a>
            </p>
          </div>
        </div>
      </section>
    );
  },

  render() {
    return (
      <div>
        { this.renderMainSection() }
        <Footer/>
      </div>
    );
  }
} );

export default Landing;
