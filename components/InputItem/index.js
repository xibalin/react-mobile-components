import React,{Component} from 'react';
import classnames from 'classnames';
import './index.scss';

class InputItem extends Component{
  constructor(props){
    super(props);
    this.state={text:props.value||''}
  }
  handleInput(e){
    this.setState({text:e.target.value});
    this.props.handleInput(e.target.value);
  }
  componentWillReceiveProps(props){
      this.setState({text:props.value||''});
  }
  render(){
    return (
    <div className={classnames("InputItem",this.props.class)}>
      <div>
        {this.props.children}
        <input
          value={this.state.text}
          type={this.props.type}
          pattern={this.props.pattern || ''}
          readOnly={this.props.readOnly}
          onChange={(e)=>{this.handleInput(e)}}
          placeholder={this.props.placeholder}
        />
      </div>
      <div className="list-item-line" style={{left:this.props.toLeft}}></div>
    </div>
    )
  }
}

export default InputItem;