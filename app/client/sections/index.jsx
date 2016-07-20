import React from 'react';

import Masterbar from 'components/masterbar';
import Footer from 'components/footer';
import BasicSetupSection from 'sections/basic-setup';
import ProjectStructureSection from 'sections/project-structure';
import IntegrationsSetupSection from 'sections/integrations-setup';
import BuildProjectSection from 'sections/build-project';
import { slugify } from 'lib/form-helpers';
import GithubTreeActions from 'lib/github-tree/actions';
import GithubTreeStore from 'lib/github-tree/store';

const debug = require( 'debug' )( 'app:sections' );

const oversteps = [
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
      targetWebCheckbox: false,
      projectTree: null
    };
  },

  componentDidMount() {
    GithubTreeActions.buildRepositoryTree();
    GithubTreeStore.on( 'change', this.updateProjectTree );
  },

  componentWillUnmount() {
    GithubTreeStore.removeListener( 'change', this.updateProjectTree );
  },

  updateProjectTree() {
    const tree = GithubTreeStore.getProjectStructure();

    this.setState( { projectTree: tree } );
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

  renderStep1() {
    return (
      <BasicSetupSection
        updateProjectName={ this.updateProjectName }
        updateProjectNamespace={ this.updateProjectNamespace }
        checkTarget={ this.checkTarget }
        goToNextStep={ this.goToNextStep } />
    );
  },

  renderStep2() {
    return (
      <ProjectStructureSection
        projectTree={ this.state.projectTree } />
    );
  },

  renderStep3() {
    return (
      <IntegrationsSetupSection />
    );
  },

  getProjectData() {
    const data = [
      {
        title: 'Nombre del proyecto',
        value: this.state.projectName
      },
      {
        title: 'Nombre identificador',
        value: this.state.projectNamespace
      },
      {
        title: 'Dispositivos',
        value: [ 'ios', 'android' ]
      },
      {
        title: 'Canal en slack',
        value: this.state.projectNamespace
      },
      {
        title: 'Repositorios',
        value: [ 'projecto-nuevo', 'prohect-dos' ]
      }
    ];

    return data;
  },

  buildProjectHandler() {
    debug( 'BUILDING!....' );
  },

  renderStep4() {
    return (
      <BuildProjectSection
        data={ this.getProjectData() }
        buildProjectHandler={ this.buildProjectHandler } />
    );
  },

  render() {
    return (
      <div>
        <Masterbar/>
        { this.renderStep1() }
        <Footer/>
      </div>
    );
  }
} );

export default Builder;
