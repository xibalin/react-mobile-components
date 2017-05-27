import React,{Component} from 'react';
import './index.scss';

export default class Stepper extends Component{
  constructor(props){
    super(props);
    this.state = {
      num:Number(props.value)
    }
  }

  changeInput(e){
    this.setState({num:e.target.value});
    if(!isNaN(e.target.value)){
      this.props.onChange&&this.props.onChange(e.target.value);
    }
  }

  blurInput(e){
    let val = 0;
    if(!isNaN(e.target.value)){
      val = e.target.value>0?parseInt(e.target.value):0;

    }
    this.setState({num:val});
    this.props.onChange&&this.props.onChange(val);
  }

  stepup(type){
    let val = 1;
    if(type){
      val = this.state.num - 1;
    }else{
      val = this.state.num + 1;
    }
    if(val<0) val =0;
    this.setState({num:val});
    this.props.onChange&&this.props.onChange(val);
  }


  render(){
    return (
      <div className="fe-stepper">
        <span onClick={()=>{this.stepup('reduce')}}>-</span>
        <span onClick={()=>{this.stepup()}}>+</span>
        <div>
          <input
            type="number"
            value={this.state.num}
            onChange={(e)=>{this.changeInput(e)}}
            onBlur={(e)=>{this.blurInput(e)}}
          />
        </div>
      </div>
    )
  }
}
