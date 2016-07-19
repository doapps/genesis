import React from 'react';

import Folder from './folder';
import File from './file';

const debug = require( 'debug' )( 'app:components:directory-tree:decorators' );

const Loading = () => {
  return (
    <div>
      loading...
    </div>
  );
};

const Header = ( props ) => {
  let nodeType;
  const { node, active } = props;

  if ( props.node.type === 'blob' ) {
    nodeType = <File active={ active } name={ node.name } />;
  } else {
    nodeType = <Folder active={ active } name={ node.name } />;
  }

  return nodeType;
};

Header.propTypes = {
  node: React.PropTypes.object.isRequired
};

class Container extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {
    const { decorators, onClick, active, node } = this.props;

    return (
      <div
        ref="clickable"
        onClick={ onClick }>
        <decorators.Header
          node={ node }
          active={ active } />
      </div>
    );
  }
}

Container.propTypes = {
  decorators: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired,
  animations: React.PropTypes.oneOfType( [ React.PropTypes.object, React.PropTypes.bool ] ).isRequired,
  node: React.PropTypes.object.isRequired
};

export default {
  Loading,
  Header,
  Container
};
