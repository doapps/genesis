import React from 'react';

import Masterbar from 'components/masterbar';
import Footer from 'components/footer';
import BasicSetupSection from 'sections/basic-setup';
import ProjectStructureSection from 'sections/project-structure';
import IntegrationsSetupSection from 'sections/integrations-setup';
import BuildProjectSection from 'sections/build-project';
import { slugify } from 'lib/form-helpers';

const Builder = React.createClass( {
  displayName: 'Builder',

  getInitialState: function() {
    return {
      projectName: null,
      projectNamespace: null
    };
  },

  updateProjectName( event ) {
    const nameText = event.target.value;
    let newState = {
      projectName: nameText
    };

    if ( ! this.state.projectNamespace ) {
      const namespaceText = slugify( name );

      newState.projectNamespace: namespaceText;
    }

    this.setState( newState );
  },

  updateProjectNamespace( event ) {
    const namespaceText = event.target.value;

    // TODO: formatting validation

    this.setState( {
      projectNamespace: namespaceText
    } );
  },

  render() {
    return (
      <div>
        <Masterbar/>
        <BasicSetupSection
          updateProjectName={ this.updateFieldState.bind( null, 'projectName' ) }
          updateProjectNamespace={ this.updateFieldState.bind( null, 'projectNamespace' ) }/>
        <Footer/>
      </div>
    );
  }
} );

export default Builder;
