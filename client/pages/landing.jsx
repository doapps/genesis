import React from 'react';

import Footer from 'components/footer';
import { prepareAuth } from 'lib/integrations/google-drive';

const debug = require( 'debug' )( 'app:pages:landing' );

const Landing = React.createClass( {
  componentDidMount() {
    prepareAuth( this.props.loginHandler );
  },

  onClickLogin() {
    debug( 'click login' );
  },

  renderGithubBadges() {
    return (
      <span>
        <iframe src="https://ghbtns.com/github-btn.html?user=doapps&amp;repo=genesis&amp;type=star&amp;count=true&amp;size=large" frameBorder="0" scrolling="0" width="150px" height="30px"></iframe>
        <iframe src="https://ghbtns.com/github-btn.html?user=doapps&amp;repo=genesis&amp;type=fork&amp;count=false&amp;size=large" frameBorder="0" scrolling="0" width="80px" height="30px"></iframe>
      </span>
    );
  },

  renderMainSection() {
    return (
      <section className="hero is-dark is-medium has-text-centered">
        <div className="hero-body">
          <div className="container">
            <p>
              <img src="https://raw.githubusercontent.com/doapps/genesis/master/static-files/logo-light.png" alt="Genesis"/>
            </p>
            <br/>
            <h1 className="title">Genesis</h1>
            <h2 className="subtitle">
              A modern project <strong>builder</strong>
              <br/>
              <small>for Google Drive</small>
            </h2>
            <br/>
            <p className="hero-buttons">
              <a
                id="gdrive-button-login"
                onClick={ this.onClickLogin }>
                <img src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png" />
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
