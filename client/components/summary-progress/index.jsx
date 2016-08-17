import React from 'react';
import result from 'lodash/result';

import { buildConstants } from 'lib/project-builder/build-status-constants';

const SummaryProgress = React.createClass( {
  displayName: 'SummaryProgress',

  getStatusIcon( status ) {
    let icon;

    switch ( status ) {
      case buildConstants.LOADING:
        icon = 'fa fa-spinner fa-pulse fa-3x fa-fw';
        break;
      case buildConstants.DONE:
        icon = 'fa fa-check';
        break;
      case buildConstants.ERROR:
        icon = 'fa fa-times';
        break;
    }

    return icon;
  },

  render() {
    return (
      <div className="columns">
        <div className="column"></div>
        <div className="column">
          <div className="has-text-centered">
            <ul>
              {
                this.props.itemStatus.map( ( item, idx ) =>
                  <li key={ idx }>
                    <span className="icon is-small">
                      <i className={ this.getStatusIcon( item.status ) }></i>
                    </span>&nbsp;{ item.name }
                    {
                      result( item, 'data.doneURL' )
                      ? <span>
                          &nbsp;
                          <a target="_blank" href={ item.data.doneURL }>
                            <span className="icon is-small">
                            <i className="fa fa-external-link"></i></span>
                          </a>
                        </span>
                      : null
                    }
                  </li>
                )
              }
            </ul>
          </div>
        </div>
        <div className="column"></div>
      </div>
    );
  }
} );

export default SummaryProgress;
