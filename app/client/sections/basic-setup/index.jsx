import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import Main from 'components/main';
import { Step, TextInput, CheckBox } from 'components/form';
import { TitleSection, SubtitleSection } from 'components/section';
import NavigationButtons from 'components/navigation';

const BasicSetupSection = React.createClass( {
  displayName: 'BasicSetupSection',

  mixins: [ LinkedStateMixin ],

  propTypes: {
    storedEmail: React.PropTypes.string,
    onSave: React.PropTypes.func,
    onCancel: React.PropTypes.func,
    onDelete: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      storedEmail: null
    };
  },

  render() {
    return (
      <Main>
        <TitleSection/>
        <SubtitleSection/>
        <Step>
          <TextInput placeholder="Proyecto Nuevo"/>
        </Step>
        <Step>
          <TextInput placeholder="proyecto-nuevo"/>
        </Step>
        <Step>
          <CheckBox/>
        </Step>
        <br/>
        <NavigationButtons/>
      </Main>
    );
  }
} );

export default BasicSetupSection;
