import React from 'react';

import Main from 'components/main';
import { TitleSection, SubtitleSection } from 'components/section';
import NavigationButtons from 'components/navigation';
import { BuildButton } from 'components/form';

const debug = require( 'debug' )( 'app:sections:build-project' );

const BuildProjectSection = React.createClass( {
  renderConfirmationText() {
    return (
      <p>
        <strong>Confirme</strong> estos datos para proceder a construir la estructura del proyecto.
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
          onClick={ this.props.buildProjectHandler } />
        <NavigationButtons
          onClickPrevious={ this.props.goToPreviousStep } />
      </Main>
    );
  }
} );

export default BuildProjectSection;
