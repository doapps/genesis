import React from 'react';

import { StepDivision, StepTitle } from 'components/step';

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
  render() {
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
              </div>
            </div>
          </header>
        </div>
        <div className="hero-foot">
          <nav className="tabs">
            <div className="container">
              <ul>
                <li className="is-active">
                  <StepTitle title="Basic Setup"/>
                </li>
                <li>
                  <StepDivision />
                </li>
                <li>
                  <StepTitle title="Project Structures"/>
                </li>
                <li>
                  <StepDivision />
                </li>
                <li>
                  <StepTitle title="Integrations Setup"/>
                </li>
                <li>
                  <StepDivision />
                </li>
                <li>
                  <StepTitle title="Build Project"/>
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
