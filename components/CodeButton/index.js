import React, { Component } from 'react';
import classnames from 'classnames';
import './index.scss';
export default class CodeButton extends Component{
  constructor(props){
    super(props);
    this.state = {
      code:'',
      send: false,
      waitTime:0,
    };
  }

  componentDidMount(){
    if (this.refs.codebutton){
      localStorage[`${this.props.unique}startTime`] = localStorage[`${this.props.unique}startTime`] || 0;
      let date = new Date();
      let time = parseInt(date.getTime() - localStorage[`${this.props.unique}startTime`]) / 1000;
      if (time > 60){
        localStorage[`${this.props.unique}startTime`] = 0;
        this.state.send = false;
      } else {
        this.state.send = true;
      }
      localStorage[`${this.props.unique}waitTime`] = parseInt(60 - time);
      this.state.send && this.counting();
    }
    this.setState({
      send:localStorage[`${this.props.unique}waitTime`] > 0,
      waitTime:localStorage[`${this.props.unique}waitTime`]
    });
  }
  counting = ()=>{
    let timer = setInterval(() => {
      if (localStorage[`${this.props.unique}waitTime`] <= 0){
        localStorage[`${this.props.unique}waitTime`] = 0;
        clearInterval(timer);
        this.refs.codebutton && this.setState({ send:false });
      } else {
        this.refs.codebutton && this.setState({
          waitTime:localStorage[`${this.props.unique}waitTime`] - 1,
          send:true
        });
        localStorage[`${this.props.unique}waitTime`] --;
      }
    }, 1000);
  };

  handleClick(){
    this.props.handleClick();
    let date = new Date();
    localStorage[`${this.props.unique}waitTime`] = 60;
    localStorage[`${this.props.unique}startTime`] = date.getTime();
    this.state.waitTime = localStorage[`${this.props.unique}waitTime`];
    this.state.send = true;
    this.counting();
  }
  render(){
    let disable = this.state.send;
    let buttonClass = disable ? 'disable' : '';
    let buttonText = disable ? `${this.state.waitTime}s后重发` : '发送验证码';
    return (
      <button
        ref="codebutton"
        disabled={this.props.disable}
        className={classnames("codebutton", buttonClass)}
        onClick={()=>{ this.handleClick(); }}
      >{buttonText}</button>
    );
  }
}