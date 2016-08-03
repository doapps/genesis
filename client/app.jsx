import React from 'react';

import Landing from 'pages/landing';
import Sections from 'sections';
import { setUser } from 'lib/user';

const debug = require( 'debug' )( 'app:self' );

const App = React.createClass( {
  getInitialState() {
    return {
      user: null
    };
  },

  loginHandler( data ) {
    const { authorized, ...userData } = data;

    if ( ! authorized ) {
      return;
    }

    setUser( userData );
    this.setState( { user: userData } );
  },

  renderFlowSection() {
    const { user } = this.state;
    let Component;

    if ( ! user ) {
      Component = (
        <Landing loginHandler={ this.loginHandler } />
      );
    } else {
      Component = (
        <Sections />
      );
    }

    return Component;
  },

  render() {
    return this.renderFlowSection();
  }
} );

export default App;
