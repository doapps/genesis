import React from 'react';
import shallowEqual from 'shallowequal';
import deepEqual from 'deep-equal';

class NodeHeader extends React.Component {
  constructor( props ) {
    super( props );
  }

  shouldComponentUpdate( nextProps ) {
    const props = this.props;
    const nextPropKeys = Object.keys( nextProps );

    for ( let i = 0; i < nextPropKeys.length; i++ ) {
      const key = nextPropKeys[ i ];
      if ( key === 'animations' ) {
        continue;
      }
      const isEqual = shallowEqual( props[ key ], nextProps[ key ] );
      if ( ! isEqual ) {
        return true;
      }
    }

    return ! deepEqual( props.animations, nextProps.animations, { strict: true } );
  }

  render() {
    const { decorators } = this.props;
    const terminal = ! this.props.node.children;
    const active = this.props.node.active;

    return (
      <decorators.Container
        decorators={ decorators }
        active={ active }
        terminal={ terminal }
        onClick={ this.props.onClick }
        animations={ this.props.animations }
        node={ this.props.node }
      />
    );
  }
}

NodeHeader.propTypes = {
  decorators: React.PropTypes.object.isRequired,
  animations: React.PropTypes.oneOfType( [ React.PropTypes.object, React.PropTypes.bool ] ).isRequired,
  node: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func
};

export default NodeHeader;
