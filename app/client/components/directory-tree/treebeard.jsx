import React from 'react';

import TreeNode from './node';
import defaultDecorators from './decorators';
import defaultAnimations from './themes/animations';

class TreeBeard extends React.Component {
  constructor( props ) {
    super( props );
  }
  render() {
    let data = this.props.data;
    // Support Multiple Root Nodes.
    // Its not formally a tree, but its a use-case.
    if ( ! Array.isArray( data ) ) {
      data = [ data ];
    }
    return (
      <ul ref="treeBase">
        {
          data.map( ( node, index ) =>
            <TreeNode
              key={ node.id || index }
              node={ node }
              onToggle={ this.props.onToggle }
              animations={ this.props.animations }
              decorators={ this.props.decorators } />
          )
        }
      </ul>
    );
  }
}

TreeBeard.propTypes = {
  data: React.PropTypes.oneOfType( [ React.PropTypes.object, React.PropTypes.array ] ).isRequired,
  animations: React.PropTypes.oneOfType( [ React.PropTypes.object, React.PropTypes.bool ] ),
  onToggle: React.PropTypes.func,
  decorators: React.PropTypes.object
};

TreeBeard.defaultProps = {
  animations: defaultAnimations,
  decorators: defaultDecorators
};

export default TreeBeard;
