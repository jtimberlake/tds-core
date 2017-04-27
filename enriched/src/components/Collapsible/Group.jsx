import React, { Component, PropTypes, Children } from 'react';
import classNames from 'classnames';

class Group extends Component {

  constructor(props){
    super(props);
    const { activeKeys } = this.props;
    this.state = { currentActiveKeys: activeKeys };
  }

  componentWillReceiveProps(nextprops) {
    if (JSON.stringify(nextprops.activeKeys.sort()) !== JSON.stringify(this.props.activeKeys.sort())) {
      this.setState({
        currentActiveKeys: nextprops.activeKeys
      });
    }
  }

  onPanelClick(panelKey) {
    return () => {
      if (!this.props.disabledKeys.includes(panelKey)) {
        let activeKeys = this.state.currentActiveKeys;
        if(activeKeys.includes(panelKey)){
          this.setState({currentActiveKeys: activeKeys.filter(activeKey => activeKey !== panelKey)});
        } else {
          if(this.props.accordion) {
            this.setState({currentActiveKeys: [panelKey]});
          } else {
            this.setState({currentActiveKeys: activeKeys.concat([panelKey])});
          }
        }
        if(this.props.onChange){
          this.props.onChange.call(this, panelKey);
        }
      }
    };
  }


  getPanels() {
    const activeKeys = this.state.currentActiveKeys;
    const newChildren = [];

    Children.forEach(this.props.children, (child, index) => {
      if (!child) return;
      // If there is no key provide, use the panel order as default key
      const panelKey = child.props.panelKey || String(index);
      const header = child.props.header;
      const isFirst = (index === 0);
      const isDisabled = this.props.disabledKeys.indexOf(panelKey) > -1;
      let isActive = activeKeys.indexOf(panelKey) > -1;

      const props = {
        key: index,
        panelKey,
        header,
        isActive,
        isDisabled,
        children: child.props.children,
        onPanelClick: this.onPanelClick(panelKey).bind(this),
        isFirst
      };
      newChildren.push(React.cloneElement(child, props));
    });

    return newChildren;
  }

  render() {
    const { className } = this.props;
    const collapseGroupClassName = classNames('collapsible-group', className);
    return (
      <div className={collapseGroupClassName}>{ this.getPanels() }</div>
    );
  }
}

Group.propTypes = {
  className: PropTypes.string,
  activeKeys: PropTypes.array,
  disabledKeys: PropTypes.array,
  accordion: PropTypes.bool,
  children: PropTypes.node,
  onChange: PropTypes.func
};

Group.defaultProps = {
  accordion: false,
  activeKeys: [],
  disabledKeys: []
};

export default Group;
