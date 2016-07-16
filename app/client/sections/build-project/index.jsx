import React from 'react';

import Main from 'components/main';
import { TitleSection, SubtitleSection } from 'components/section';
import { BuildButton } from 'components/form';
import NavigationButtons from 'components/navigation';

const BuildProjectSection = React.createClass( {
  render() {
    return (
      <Main>
        <TitleSection>
          Resumen
        </TitleSection>
        <SubtitleSection>
          A continuacion, se listan los modulos a construir
        </SubtitleSection>
        <div className="content">
          <ul>
            <li>
              <strong>Nombre del proyecto</strong>
              <ul>
                <li>Proyecto Nuevo</li>
              </ul>
            </li>
            <li>
              <strong>Nombre de identificación</strong>
              <ul>
                <li>proyecto-nuevo</li>
              </ul>
            </li>
            <li>
              <strong>Dispositivos</strong>
              <ul>
                <li>Android</li>
                <li>iOS</li>
                <li>Web</li>
              </ul>
            </li>
            <li>
              <strong>Canal en slack</strong>
              <ul>
                <li>proyecto-nuevo</li>
              </ul>
            </li>
            <li>
              <strong>Repositorios</strong>
              <ul>
                <li>proyecto-nuevo-android</li>
                <li>proyecto-nuevo-ios</li>
                <li>proyecto-nuevo-api</li>
              </ul>
            </li>
          </ul>
          <p>
            <strong>Confirme</strong> estos datos para proceder a construir la estructura del proyecto.
          </p>
        </div>
        <BuildButton/>
      </Main>
    );
  }
} );

export default BuildProjectSection;
