import React from 'react';

export const TitleSection = React.createClass( {
  render() {
    return (
      <h3 className="title">Configuración de los datos del proyecto</h3>
    );
  }
} );

export const SubtitleSection = React.createClass( {
  render() {
    return (
      <div className="content">
        <p>Ingrese la información básica para entender la naturaleza del <strong>proyecto</strong></p>
      </div>
    );
  }
} );
