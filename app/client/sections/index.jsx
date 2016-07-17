import React from 'react';

import Masterbar from 'components/masterbar';
import Footer from 'components/footer';
import BasicSetupSection from 'sections/basic-setup';
import ProjectStructureSection from 'sections/project-structure';
import IntegrationsSetupSection from 'sections/integrations-setup';
import BuildProjectSection from 'sections/build-project';
import { slugify } from 'lib/form-helpers';

const debug = require( 'debug' )( 'app:sections' );

const steps = [
  'basic-setup',
  'project-structure',
  'integrations-setup',
  'build-project'
];

const Builder = React.createClass( {
  displayName: 'Builder',

  getInitialState() {
    return {
      projectName: null,
      projectNamespace: null,
      targetAndroidCheckbox: false,
      targetIosCheckbox: false,
      targetWebCheckbox: false
    };
  },

  updateProjectName( event ) {
    const nameText = event.target.value;
    let newState = {
      projectName: nameText
    };

    if ( ! this.state.projectNamespace ) {
      const namespaceText = slugify( name );

      newState.projectNamespace = namespaceText;
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

  checkTarget( target ) {
    this.setState( {
      [ target ]: ! this.state[ target ]
    } );
  },

  goToNextStep() {
    debug( 'next step' );
  },

  render() {
    return (
      <div>
        <Masterbar/>
        <BasicSetupSection
          updateProjectName={ this.updateProjectName }
          updateProjectNamespace={ this.updateProjectNamespace }
          checkTarget={ this.checkTarget }
          goToNextStep={ this.goToNextStep } />
        <Footer/>
      </div>
    );
  }
} );

export default Builder;
