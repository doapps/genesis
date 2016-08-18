import React from 'react';

import Main from 'components/main';
import SummaryProgress from 'components/summary-progress';
import { TitleSection, SubtitleSection } from 'components/section';
import NavigationButtons from 'components/navigation';
import { BuildButton } from 'components/form';
import { globalBuildConstants } from 'lib/project-builder/build-status-constants';

const debug = require( 'debug' )( 'app:sections:build-project' );

const BuildProjectSection = React.createClass( {
  renderConfirmationText() {
    return (
      <p>
        <strong>Confirme</strong> estos datos para que Genesis haga su trabajo.
      </p>
    );
  },

  renderSummary() {
    const { data } = this.props;

    return (
      <div className="content">
        <ul>
          {
            data.map( ( section, index_i ) =>
              <li key={ index_i }>
                <strong>{ section.title }</strong>
                <ul>
                  {
                    section.value.map( ( value, index_j ) => {
                      return (
                        <li key={ index_j }>
                          { value }
                        </li>
                      );
                    } )
                  }
                </ul>
              </li>
            )
          }
        </ul>
        { this.renderConfirmationText() }
      </div>
    );
  },

  render() {
    const {
      buildProjectHandler,
      goToPreviousStep,
      integrationsStatus,
      globalBuildStatus
    } = this.props;

    return (
      <Main>
        <TitleSection>
          Resumen
        </TitleSection>
        <SubtitleSection>
          A continuación, se listan los modulos a construir
        </SubtitleSection>
        { this.renderSummary() }
        <BuildButton
          statusButton={ globalBuildStatus }
          onClick={ buildProjectHandler } />
          {
            globalBuildStatus !== globalBuildConstants.IDLE
            ? <div>
                <br/>
                <SummaryProgress itemStatus={ integrationsStatus } />
              </div>
            : null
          }
        <NavigationButtons
          onClickPrevious={ goToPreviousStep } />
      </Main>
    );
  }
} );

export default BuildProjectSection;
