import React from 'react';

import { getUser } from 'lib/user';
import { StepDivision, StepTitle } from 'components/step';

const debug = require( 'debug' )( 'app:components:masterbar' );

const Logo = React.createClass( {
  render() {
    return (
      <span className="icon">
        <i className="fa fa-diamond"></i>
      </span>
    );
  }
} );

const Masterbar = React.createClass( {
  getInitialState() {
    return {
      user: getUser()
    };
  },

  renderUserLabel() {
    const { name, email } = this.state.user;

    return (
      <div className="nav-item">
        { name }&nbsp;<small>({ email })</small>
      </div>
    );
  },

  render() {
    const { currentStep } = this.props;

    return (
      <section className="hero is-dark">
        <div className="hero-head">
          <header className="nav">
            <div className="container">
              <div className="nav-left">
              </div>
              <div className="nav-center">
                <a className="nav-item" href="#">
                  <Logo/>
                </a>
              </div>
              <div className="nav-right nav-menu">
                { this.renderUserLabel() }
              </div>
            </div>
          </header>
        </div>
        <div className="hero-foot">
          <nav className="tabs">
            <div className="container">
              <ul>
                <li className="is-active">
                  <StepTitle
                    isActive={ currentStep === 0 }
                    title="Basic Setup" />
                </li>
                <li>
                  <StepDivision />
                </li>
                <li>
                  <StepTitle
                    isActive={ currentStep === 1 }
                    title="Project Structures" />
                </li>
                <li>
                  <StepDivision />
                </li>
                <li>
                  <StepTitle
                    isActive={ currentStep === 2 }
                    title="Integrations Setup" />
                </li>
                <li>
                  <StepDivision />
                </li>
                <li>
                  <StepTitle
                    isActive={ currentStep === 3 }
                    title="Build Project" />
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </section>
    );
  }
} );

export default Masterbar;
