import React from 'react';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import pickBy from 'lodash/pickBy';
import intersection from 'lodash/intersection';
import keys from 'lodash/keys';

import Masterbar from 'components/masterbar';
import Footer from 'components/footer';
import BasicSetupSection from 'sections/basic-setup';
import ProjectStructureSection from 'sections/project-structure';
import IntegrationsSetupSection from 'sections/integrations-setup';
import BuildProjectSection from 'sections/build-project';
import GithubTreeActions from 'lib/github-tree/actions';
import GithubTreeStore from 'lib/github-tree/store';
import BuilderMethods from 'lib/builder-methods';
import { slugify } from 'lib/form-helpers';

const debug = require( 'debug' )( 'app:sections' );

const targetsData = [
  {
    title: 'Android',
    namespace: 'android',
    selectDefaultSource: [ 'api' ],
    type: 'list',
    targetSync: 'ios',
    scopes: [
      {
        value: 'default',
        title: 'Default'
      }
    ]
  },
  {
    title: 'iOS',
    namespace: 'ios',
    selectDefaultSource: [ 'api' ],
    type: 'list',
    targetSync: 'android',
    scopes: [
      {
        value: 'default',
        title: 'Default'
      }
    ]
  },
  {
    title: 'Web',
    namespace: 'web',
    selectDefaultSource: [ 'api', 'runtime' ],
    type: 'select',
    scopes: [
      {
        value: 'app',
        title: 'App',
        defaultSelect: false
      },
      {
        value: 'admin',
        title: 'Admin',
        defaultSelect: true
      }
    ]
  }
];

const backendSources = [
  {
    value: 'api',
    title: 'API'
  },
  {
    value: 'mail',
    title: 'Mail'
  },
  {
    value: 'runtime',
    title: 'Runtime'
  }
];

const macroTargets = {
  mobile: [ 'android', 'ios' ],
  web: [ 'web' ]
};

const Builder = React.createClass( {
  displayName: 'Builder',

  getInitialState() {
    return Object.assign( {
      projectName: '',
      projectNamespace: '',
      projectTree: null,
      currentStep: 0,
      buildingProject: false,
      buildingDoneURL: '',
      rootFolderId: '',
      templatesFolderId: '',
      gitlabCredentials: null,
      targetsData: this.getTargetsAndScopes(),
      backendSources: this.getBackendSources()
    },
    this.getTargetStatesForCheckbox(),
    this.getScopeStatesForSelect(),
    this.getBackendSourceStates() );
  },

  getTargetStatesForCheckbox() {
    let states = {};

    targetsData.forEach( target => {
      states[ this.getCheckboxState( target.namespace ) ] = false
    } );

    return states;
  },

  getCheckboxState( namespace ) {
    return `item-${ namespace }-checkbox`;
  },

  getSelectItemState( value ) {
    return `item-${ value }-select`;
  },

  getTagItemState( value ) {
    return `item-${ value }-tag`;
  },

  getTargetsAndScopes() {
    return targetsData;
  },

  getBackendSources() {
    return backendSources;
  },

  getScopeStatesForSelect() {
    let states = {};

    targetsData.forEach( target => {
      if ( target.type === 'select' ) {
        target.scopes.forEach( scope => {
          states[ this.getSelectItemState( scope.value ) ] = scope.defaultSelect
        } );
      }
    } );

    return states;
  },

  getBackendSourceStates() {
    let states = {};

    backendSources.forEach( source => {
      states[ this.getTagItemState( source.value ) ] = false
    } );

    return states;
  },

  componentDidMount() {
    GithubTreeActions.getAndParseRepositoryTree();
    GithubTreeStore.on( 'change', this.updateProjectTree );
  },

  componentWillUnmount() {
    GithubTreeStore.removeListener( 'change', this.updateProjectTree );
  },

  updateProjectTree() {
    const tree = GithubTreeStore.getProjectTree();

    this.setState( { projectTree: tree } );
  },

  updateProjectName( event ) {
    const nameText = event.target.value;
    let newState = {
      projectName: nameText
    };

    const namespaceText = slugify( nameText );
    newState.projectNamespace = namespaceText;

    this.setState( newState );
  },

  updateProjectNamespace( event ) {
    const namespaceText = event.target.value;

    // TODO: formatting validation

    this.setState( {
      projectNamespace: namespaceText
    } );
  },

  checkTarget( targetNamespace ) {
    const checkboxState = this.getCheckboxState( targetNamespace );
    const selectSource = find( this.state.targetsData, { namespace: targetNamespace } ).selectDefaultSource;
    const state = {
      [ checkboxState ]: ! this.state[ checkboxState ]
    };

    if ( selectSource && selectSource.length > 0 && ! this.state[ checkboxState ] ) {
      selectSource.forEach( source => state[ this.getTagItemState( source ) ] = true )
    }

    this.setState( state );
  },

  addScope( indexTarget ) {
    const targetDataUpdated = Array.from( this.state.targetsData );
    const newScope = { value: '' };
    let syncTargetIndex;

    targetDataUpdated[ indexTarget ].scopes.push( newScope );
    syncTargetIndex = findIndex( targetDataUpdated, { namespace: targetDataUpdated[ indexTarget ].targetSync } );

    if ( !!~syncTargetIndex ) {
      targetDataUpdated[ syncTargetIndex ].scopes.push( newScope );
    }

    this.setState( {
      targetsData: targetDataUpdated
    } );
  },

  removeScope( indexTarget, indexScope ) {
    const targetDataUpdated = Array.from( this.state.targetsData );
    let syncTargetIndex;

    targetDataUpdated[ indexTarget ].scopes.splice( indexScope, 1 );

    if ( targetDataUpdated[ indexTarget ].scopes.length === 1 && ! targetDataUpdated[ indexTarget ].scopes[ 0 ].value ) {
      targetDataUpdated[ indexTarget ].scopes[ 0 ].value = 'default';
    }

    syncTargetIndex = findIndex( targetDataUpdated, { namespace: targetDataUpdated[ indexTarget ].targetSync } );

    if ( !!~syncTargetIndex ) {
      targetDataUpdated[ syncTargetIndex ].scopes.splice( indexScope, 1 );
    }

    this.setState( {
      targetsData: targetDataUpdated
    } );
  },

  onChangeScopeValue( indexTarget, indexScope, event ) {
    const targetDataUpdated = Array.from( this.state.targetsData );
    const newValue = event.target.value.toLowerCase().trim();
    let syncTargetIndex;

    targetDataUpdated[ indexTarget ].scopes[ indexScope ].value = newValue;
    syncTargetIndex = findIndex( targetDataUpdated, { namespace: targetDataUpdated[ indexTarget ].targetSync } );

    if ( !!~syncTargetIndex ) {
      targetDataUpdated[ syncTargetIndex ].scopes[ indexScope ].value = newValue;
    }

    this.setState( {
      targetsData: targetDataUpdated
    } );
  },

  checkIfTargetSelected( namespace ) {
    return this.state[ this.getCheckboxState( namespace ) ];
  },

  checkIfScopeSelected( value ) {
    return this.state[ this.getSelectItemState( value ) ];
  },

  checkIfSourceSelected( value ) {
    return this.state[ this.getTagItemState( value ) ];
  },

  checkIfAreSelectedScopes() {
    let result = false;

    this.state.targetsData.forEach( target => {
      if ( target.type === 'select' ) {
        result = target.scopes.some( scope => this.state[ this.getSelectItemState( scope.value ) ] );
      }
    } );

    return result;
  },

  selectScope( value ) {
    this.setState( {
      [ this.getSelectItemState( value ) ]: true
    } );
  },

  deselectScope( value ) {
    this.setState( {
      [ this.getSelectItemState( value ) ]: false
    } );
  },

  selectSource( value ) {
    this.setState( {
      [ this.getTagItemState( value ) ]: true
    } );
  },

  deselectSource( value ) {
    this.setState( {
      [ this.getTagItemState( value ) ]: false
    } );
  },

  setFolderId( prop, id ) {
    this.setState( { [ prop ]: id } );
  },

  renderStep1() {
    return (
      <BasicSetupSection
        updateProjectName={ this.updateProjectName }
        updateProjectNamespace={ this.updateProjectNamespace }
        projectName={ this.state.projectName }
        projectNamespace={ this.state.projectNamespace }
        addScope={ this.addScope }
        removeScope={ this.removeScope }
        onChangeScopeValue={ this.onChangeScopeValue }
        checkIfTargetSelected={ this.checkIfTargetSelected }
        checkIfScopeSelected={ this.checkIfScopeSelected }
        selectScope={ this.selectScope }
        deselectScope={ this.deselectScope }
        checkIfAreSelectedScopes={ this.checkIfAreSelectedScopes }
        targets={ this.state.targetsData }
        checkTarget={ this.checkTarget }
        backendSources={ this.state.backendSources }
        checkIfSourceSelected={ this.checkIfSourceSelected }
        deselectSource={ this.deselectSource }
        selectSource={ this.selectSource }
        goToNextStep={ this.goToNextStep }
        setRootFolderId={ this.setFolderId.bind( null, 'rootFolderId' ) }
        setTemplatesFolderId={ this.setFolderId.bind( null, 'templatesFolderId' ) } />
    );
  },

  renderStep2() {
    return (
      <ProjectStructureSection
        projectTree={ this.state.projectTree }
        projectNamespace={ this.state.projectNamespace }
        goToNextStep={ this.goToNextStep }
        goToPreviousStep={ this.goToPreviousStep } />
    );
  },

  renderStep3() {
    return (
      <IntegrationsSetupSection
        goToNextStep={ this.goToNextStep }
        goToPreviousStep={ this.goToPreviousStep }
        handleCrendentials={ this.handleCrendentials.bind( null, 'gitlabCredentials' ) }
        gitlabCredentials={ this.state.gitlabCredentials } />
    );
  },

  renderStep4() {
    return (
      <BuildProjectSection
        data={ this.getProjectData() }
        buildProjectHandler={ this.buildProjectHandler }
        buildingDoneURL={ this.state.buildingDoneURL }
        buildingProject={ this.state.buildingProject }
        goToPreviousStep={ this.goToPreviousStep } />
    );
  },

  handleCrendentials( prop, username, token ) {
    const data = { username, token };
    this.setState( { [ prop ]: data } );
  },

  getOversteps() {
    const oversteps = [
      this.renderStep1, // basic-setup
      this.renderStep2, // project-structure
      this.renderStep3, // integrations-setup
      this.renderStep4  // build-project
    ];

    return oversteps;
  },

  getProjectName() {
    return [ this.state.projectName ];
  },

  getProjectNamespace() {
    return [ this.state.projectNamespace ];
  },

  getAvailableTargets() {
    let availableTargets = [];

    this.state.targetsData.forEach( target => {
      if ( this.checkIfTargetSelected( target.namespace ) ) {
        availableTargets.push( { title: target.title, namespace: target.namespace } );
      }
    } );

    return propFilter => availableTargets.map( prop => prop[ propFilter ] );
  },

  getAvailableMacrotargets() {
    const availableTargets = this.getAvailableTargets()( 'namespace' );
    const objAvailableMacrotargets = pickBy(
      macroTargets, targets => intersection( targets, availableTargets ).length
    );
    const availableMacrotargets = keys( objAvailableMacrotargets );

    return availableMacrotargets;
  },

  getAvailableScopes() {
    let availableScopes = [];

    this.state.targetsData.forEach( target => {
      if ( this.checkIfTargetSelected( target.namespace ) ) {
        target.scopes.forEach( scope => availableScopes.push( scope.value ) );
      }
    } );

    return availableScopes;
  },

  getSlackChannel() {
    const channelName = this.state.projectNamespace;

    return [ channelName ];
  },

  getTrelloBoard() {
    const boardName = this.state.projectNamespace;

    return [ boardName ];
  },

  getRepoName( target = false, module = false ) {
    return `${ this.state.projectNamespace }${ module ? `-${ module }` : '' }${ target ? `-${ target }` : '' }`;
  },

  getRepositories() {
    const listRepos = [];

    // For targets and scopes
    this.state.targetsData.forEach( target => {
      if ( this.checkIfTargetSelected( target.namespace ) ) {
        let { scopes, type } = find( this.state.targetsData, { namespace: target.namespace } );

        if ( type === 'list' && scopes.length === 1 ) {
          listRepos.push( this.getRepoName( target.namespace ) );
        } else if ( type === 'select' ) {
          scopes.forEach( scope => {
            this.checkIfScopeSelected( scope.value )
            ? listRepos.push( this.getRepoName( target.namespace, scope.value ) )
            : null
          } );
        } else {
          scopes.forEach( scope =>
            listRepos.push( this.getRepoName( target.namespace, scope.value ) )
          );
        }
      }
    } );

    // For sources
    this.state.backendSources.forEach( source => {
      if ( this.checkIfSourceSelected( source.value ) ) {
        listRepos.push( this.getRepoName( source.value ) );
      }
    } );

    return listRepos;
  },

  getProjectData() {
    const data = [
      {
        title: 'Nombre del proyecto',
        value: this.getProjectName()
      },
      {
        title: 'Nombre identificador',
        value: this.getProjectNamespace()
      },
      {
        title: 'Dispositivos',
        value: this.getAvailableTargets()( 'title' )
      },
      {
        title: 'Canal privado en Slack',
        value: this.getSlackChannel()
      },
      {
        title: 'Board en Trello',
        value: this.getTrelloBoard()
      },
      {
        title: 'Repositorios en Gitlab',
        value: this.getRepositories()
      }
    ];

    return data;
  },

  buildProjectHandler() {
    const projectStructure = GithubTreeStore.getProjectStructure();
    const environment = Object.assign( {}, projectStructure, {
      projectName: this.state.projectName,
      projectNamespace: this.state.projectNamespace,
      rootFolderId: this.state.rootFolderId,
      templatesFolderId: this.state.templatesFolderId,
      scopes: this.getAvailableScopes(),
      targets: this.getAvailableTargets()( 'namespace' ),
      macrotargets: this.getAvailableMacrotargets(),
      repositories: this.getRepositories(),
      gitlabToken: this.state.gitlabCredentials.token
    } );

    this.setState( { buildingProject: true } );

    BuilderMethods.buildProject( environment, ( error, payloadResult ) => {
      debug( 'payloadResult', payloadResult );
      const { folderId } = payloadResult;

      this.setState( {
        buildingDoneURL: folderId,
        buildingProject: false
      } );
    } );
  },

  renderCurrentStep() {
    const { currentStep } = this.state;
    const oversteps = this.getOversteps();
    const renderCurrentStepHandler = oversteps[ currentStep ];

    return renderCurrentStepHandler();
  },

  goToNextStep() {
    this.setState( {
      currentStep: this.state.currentStep + 1
    } );
  },

  goToPreviousStep() {
    this.setState( {
      currentStep: this.state.currentStep - 1
    } );
  },

  render() {
    return (
      <div>
        <Masterbar currentStep={ this.state.currentStep } />
        { this.renderCurrentStep() }
        <Footer />
      </div>
    );
  }
} );

export default Builder;
