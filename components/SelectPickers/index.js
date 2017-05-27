import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Picker from '../Picker';
import method from 'utils/methods';
import './index.scss';
export default class SelectPickers{
  static show(obj){
    if(!obj||(!obj instanceof Object)){
      console.warn('arguments must be a object')
    }else{
      method.destroy(['SelectPickersEle']);
      let div = document.createElement('div');
      div.setAttribute('id','SelectPickersEle');
      document.body.appendChild(div);
      ReactDOM.render(<SelectPickersElement
        value={obj.value}
        data={obj.data||{}}
        onChange={(data)=>{typeof obj.onChange == 'function' &&obj.onChange(data)}}
      />, div);
    }
  }
}
class SelectPickersElement extends Component {
  constructor(props) {
    super(props);
    let data = this.props.data,obj = {},keys = Object.keys(data);
    _.each(keys,(item,index)=>{
      obj[item] = data[item][0];
      if(props.value){
        obj[item] = props.value.split(',')[index]
      }
    });

    this.state = {
      isPickerShow: false,
      valueGroups: obj,
      optionGroups: data

    };
  }

  handleChange (name, value){
    this.setState({
      valueGroups:{
        ...this.state.valueGroups,
        [name]:value
      }
    })
  };

  togglePicker(){
    this.setState({isPickerShow:!this.state.isPickerShow});
  };

  confirm(){
    let dataObj = this.state.valueGroups,arr = [],keys = Object.keys(dataObj);
    _.each(keys,(item)=>{
      arr.push(dataObj[item]);
    });
    this.togglePicker();
    this.props.onChange(arr);
  }

  render() {
    const {isPickerShow, optionGroups, valueGroups} = this.state;
    const maskStyle = {
      display: isPickerShow ? 'block' : 'none'
    };
    const pickerModalClass = `picker-modal${isPickerShow ? ' picker-modal-toggle' : ''}`;
    return (
      <div className="picker-modal-container">
        <div className="picker-modal-mask" style={maskStyle} onClick={()=>{this.togglePicker()}}></div>
        <div className={pickerModalClass}>
          <header>
            <div className="select-title" onClick={()=>{this.togglePicker()}}>取消</div>
            <a href="javascript:;" onClick={()=>{this.confirm()}}>确定</a>
          </header>
          <Picker
            optionGroups={optionGroups}
            valueGroups={valueGroups}
            onChange={this.handleChange.bind(this)} />
        </div>
      </div>
    );
  }

  componentDidMount(){
    setTimeout(()=>{this.setState({isPickerShow:true})},0)
  }

}