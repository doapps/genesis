import React from 'react';

import Main from 'components/main';
import { TitleSection, SubtitleSection } from 'components/section';
import { BuildButton } from 'components/form';

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
                  { ! Array.isArray( section.value ) ? ( section.value = [ section.value ] ) : null }
                  {
                    section.value.map( ( value, index_j ) =>
                      <li key={ index_j }>
                        { value }
                      </li>
                    )
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
          A continuacion, se listan los modulos a construir
        </SubtitleSection>
        { this.renderSummary() }
        <BuildButton
          onClick={ this.props.buildProjectHandler } />
      </Main>
    );
  }
} );

export default BuildProjectSection;
