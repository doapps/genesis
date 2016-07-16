import React from 'react';

import Masterbar from 'components/masterbar';
import Footer from 'components/footer';
import BasicSetupSection from 'sections/basic-setup';
import ProjectStructureSection from 'sections/project-structure';
import IntegrationsSetupSection from 'sections/integrations-setup';
import BuildProjectSection from 'sections/build-project';

const Builder = React.createClass( {
  render() {
    return (
      <div>
        <Masterbar/>
        <ProjectStructureSection/>
        <Footer/>
      </div>
    );
  }
} );

export default Builder;
