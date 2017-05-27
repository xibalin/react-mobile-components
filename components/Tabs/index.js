import React,{Component} from 'react';
import classname from 'classnames';
import _ from 'lodash';
import './index.scss';
export class Tabs extends Component{
  constructor(props){
    super(props);
    this.state = {
      activeIndex: props.defaultActiveKey||0,
      flexWidth: 0
    }
  }

  getIndex(key) {
    return this.refs[`tab-bar-${key}`].tabIndex;
  }

  onTabClick(key) {
    this.setState({activeIndex: this.getIndex(key)});
    if(this.props.onChange){
      this.props.onChange(key);
    }
  }

  componentDidMount() {
    this.setState({
      flexWidth: this.refs['tab-bars'].offsetWidth /
      (this.props.maxTabs ? this.props.maxTabs : this.props.children.length),
      activeIndex: this.getIndex(this.props.defaultActiveKey)
    })
  }

  render(){
    let children = this.props.children;
    return (
      <div className="fe-tabs">
        {
          <div ref='tab-bars' className="tab-bars">
            {children instanceof Array&&_.map(children, (child, idx)=> (
              <div key={idx} tabIndex={idx} ref={`tab-bar-${child.key}`}
                   style={this.props.maxTabs ? {minWidth: `${100 / this.props.maxTabs}%`} : {}}
                   className={classname({active: idx == this.state.activeIndex})}
                   onClick={this.onTabClick.bind(this, child.key)}>{child.props.tab}</div>
            ))}
            <div className="bar-animated" style={{
              width: `${this.state.flexWidth}px`,
              transform: `translate3d(${this.state.flexWidth * this.state.activeIndex}px, 0px, 0px)`
            }}></div>
          </div>
        }
        {
          <div className="tab-content" style={{
            transform: `translateX(-${this.state.activeIndex * 100}%) translateZ(0px)`
          }}>
            {_.map(children, (child, idx)=> (
              React.cloneElement(child,{inactive:idx != this.state.activeIndex})
            ))}
          </div>
        }
      </div>
    )
  }

}

export class TabPane extends Component{

  render(){
    return (
      <div className={classname("tab-pane",{"tab-pane-inactive":this.props.inactive})}>{this.props.children}</div>
    )
  }
}