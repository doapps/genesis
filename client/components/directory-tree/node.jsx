import React from 'react';
import { VelocityTransitionGroup } from 'velocity-react';

import NodeHeader from './header';

const _map = ( children, mapper ) => {
  if ( ! children ) {
    return [];
  }

  if ( ! Array.isArray( children ) ) {
    children = [ children ];
  }

  return children.map( mapper );
};

class TreeNode extends React.Component {
  constructor( props ) {
    super( props );
    this.onClick = this.onClick.bind( this );
  }

  onClick() {
    let toggled = ! this.props.node.toggled;
    let onToggle = this.props.onToggle;
    if ( onToggle ) {
      onToggle( this.props.node, toggled );
    }
  }

  animations() {
    const props = this.props;

    if ( props.animations === false ) {
      return false;
    }
    let anim = Object.assign( {}, props.animations, props.node.animations );

    return {
      toggle: anim.toggle( this.props ),
      drawer: anim.drawer( this.props )
    };
  }

  decorators() {
    // Merge Any Node Based Decorators Into The Pack
    const props = this.props;
    let nodeDecorators = props.node.decorators || {};

    return Object.assign( {}, props.decorators, nodeDecorators );
  }

  render() {
    const decorators = this.decorators();
    const animations = this.animations();

    return (
      <li ref="topLevel">
        { this.renderHeader( decorators, animations ) }
        { this.renderDrawer( decorators, animations ) }
      </li>
    );
  }

  renderDrawer( decorators, animations ) {
    const toggled = this.props.node.toggled;

    if ( ! animations && ! toggled ) {
      return null;
    }
    if ( ! animations && toggled ) {
      return this.renderChildren( decorators, animations );
    }
    return (
      <VelocityTransitionGroup { ...animations.drawer } ref="velocity">
        { toggled
          ? this.renderChildren( decorators, animations )
          : null
        }
      </VelocityTransitionGroup>
    );
  }

  renderHeader( decorators, animations ) {
    return (
      <NodeHeader
        decorators={ decorators }
        animations={ animations }
        node={ Object.assign( {}, this.props.node ) }
        onClick={ this.onClick }
      />
    );
  }

  renderChildren( decorators ) {
    if ( this.props.node.loading ) {
      return this.renderLoading( decorators );
    }

    return (
      <ul ref="subtree">
        {
          _map( this.props.node.children, ( child, index ) =>
            <TreeNode
              { ...this._eventBubbles() }
              key={ child.id || index }
              node={ child }
              decorators={ this.props.decorators }
              animations={ this.props.animations } />
          )
        }
      </ul>
    );
  }

  renderLoading( decorators ) {
    return (
      <ul>
        <li>
          <decorators.Loading />
        </li>
      </ul>
    );
  }

  _eventBubbles() {
    return { onToggle: this.props.onToggle };
  }
}

TreeNode.propTypes = {
  node: React.PropTypes.object.isRequired,
  decorators: React.PropTypes.object.isRequired,
  animations: React.PropTypes.oneOfType( [ React.PropTypes.object, React.PropTypes.bool ] ).isRequired,
  onToggle: React.PropTypes.func
};

export default TreeNode;
