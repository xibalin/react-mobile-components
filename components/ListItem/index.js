import React,{Component} from 'react';
import classname from 'classnames';
import './index.scss';

export default class ListItem extends Component{
  render(){
    return (
      <div
        className={classname("list-item",this.props.class)}
        onClick={()=>{this.props.handleClick&&this.props.handleClick()}}
      >
        <div
          style={{paddingRight:this.props.noright?'1.5rem':'2.25rem'}}
        >
          <i className={classname('iconfont','blue',this.props.type)} style={{visibility:this.props.type?'visible':'hidden'}}></i>

          {this.props.children}
          <i className="iconfont icon-right" style={{visibility:this.props.noright?'hidden':'visible'}}></i>
        </div>
        <div className="list-item-line" style={{left:this.props.toLeft}}></div>
      </div>
    )
  }
}
