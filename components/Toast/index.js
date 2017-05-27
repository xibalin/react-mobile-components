import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import './index.scss';

export default class Toast {
  //分别定义弹出三种toast的函数
  static success(str,time){
    this.destroyToast();
    this.showToast(str,'success');
    if(time){
      setTimeout(()=>{
        this.destroyToast();
      },time)
    }
  }
  static fail(str,time){
    this.destroyToast();
    this.showToast(str,'fail');
    if(time){
      setTimeout(()=>{
        this.destroyToast();
      },time)
    }
  }
  static loading(str,time){
    this.destroyToast();
    this.showToast(str,'loading');
    if(time){
      setTimeout(()=>{
        this.destroyToast();
      },time)
    }
  }
  static showToast(str,type){
    let div = document.createElement('div');
    let id=document.createAttribute("id");
    id.value='fetoastEle';
    div.setAttributeNode(id);
    document.body.appendChild(div);
    ReactDOM.render(<ToastElement text={str} upStyle={type} />, div);
  }
  static destroyToast(){
    let toastEle = document.getElementById('fetoastEle');
    if(toastEle){
      ReactDOM.unmountComponentAtNode(toastEle);
      document.body.removeChild(toastEle);
    }
  }
}

//定义toast组件的样式
class ToastElement extends Component{
  render() {
    let upStyle = this.props.upStyle;
    let toastImg = classNames({
      'toast-success': upStyle === 'success',
      'toast-fail': upStyle === 'fail',
      'toast-loading': upStyle === 'loading'
    });

    return(
      <div className="toast-root">
        <div className="toast-box">
          <div className={toastImg}></div>
          <p className="toast-text">{this.props.text}</p>
        </div>
      </div>
    )
  }

}