import React from 'react';

import Masterbar from 'components/masterbar';
import Footer from 'components/footer';
import BasicSetupSection from 'sections/basic-setup';
import ProjectStructureSection from 'sections/project-structure';
import IntegrationsSetupSection from 'sections/integrations-setup';
import BuildProjectSection from 'sections/build-project';

const Builder = React.createClass( {
  displayName: 'Builder',

  getInitialState: function() {
    return {
      projectName: null,
      projectNamespace: null
    };
  },

  updateProjectName( projectName ) {
    this.state( { projectName } );
  },

  updateProjectNamespace( projectNamespace ) {
    this.state( { projectNamespace } );
  },

  render() {
    return (
      <div>
        <Masterbar/>
        <BasicSetupSection
          updateProjectName={ this.updateProjectName }/>
        <Footer/>
      </div>
    );
  }
} );

export default Builder;
