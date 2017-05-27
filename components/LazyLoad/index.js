import React, { Component } from 'react';
import classname from 'classnames';
import './index.scss';
export default class LazyLoad extends Component{
  constructor(props){
    super(props);
    this.state = {
      src:null,
      ref:Symbol('lazyload')
    };
  }

  render(){
    let { src, ref } = this.state;
    return (
      <div className={classname("lazyload-con",{'none':!src})} ref={ref}>
        <img src={src} alt="img"/>
      </div>
    )
  }

  checkInView = ()=>{
    let { src } = this.props;
    let pos = this.refs[this.state.ref].getBoundingClientRect();
    let target_pos = this.state.target.getBoundingClientRect();
    let insideHieght = this.state.target.offsetHeight - this.refs[this.state.ref].offsetHeight/2;
    if(pos.top - target_pos.top < insideHieght){
      let image = new Image();
      image.src = src;
      image.onload = ()=>{
        this.setState({src:src});
      };
      this.state.target.removeEventListener('scroll',this.checkInView);
    }
  }

  componentDidMount = async ()=>{
    let { container }= this.props;
    if (container){
      let target = document.querySelector(this.props.container);
      await this.setState({target});
      await this.state.target.addEventListener('scroll',this.checkInView);
      await this.checkInView()
    }
  }
}