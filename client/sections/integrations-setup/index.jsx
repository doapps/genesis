import React from 'react';

import Main from 'components/main';
import { TitleSection, SubtitleSection } from 'components/section';
import NavigationButtons from 'components/navigation';
import SlackIntegration from 'lib/integrations/slack';
import GitlabIntegration from 'lib/integrations/gitlab';
import TrelloIntegration from 'lib/integrations/trello';

const IntegrationsSetupSection = React.createClass( {
  displayName: 'IntegrationsSetupSection',

  render() {
    return (
      <Main>
        <TitleSection>
          Integraciones
        </TitleSection>
        <SubtitleSection>
          Seleccione las <strong>integraciones</strong> de la lista
        </SubtitleSection>
          <SlackIntegration
            handleCrendentials={ this.props.slackHandleCrendentials }
            credentials={ this.props.slackCredentials } />
          <GitlabIntegration
            handleCrendentials={ this.props.gitlabHandleCrendentials }
            credentials={ this.props.gitlabCredentials } />
          <TrelloIntegration
            handleCrendentials={ this.props.trelloHandleCrendentials }
            credentials={ this.props.trelloCredentials } />
        <br/>
        <NavigationButtons
          onClickNext={ this.props.goToNextStep }
          onClickPrevious={ this.props.goToPreviousStep } />
      </Main>
    );
  }
} );

export default IntegrationsSetupSection;
