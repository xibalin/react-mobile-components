import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Picker from '../Picker';
import handle from './handle-data';
import method from 'utils/methods';
import './index.scss';

export default class CityPicker{
  static show(obj){
    if(!obj||(!obj instanceof Object)){
      console.warn('arguments must be a object')
    }else{
      method.destroy(['CityPickerEle']);
      let div = document.createElement('div');
      let id=document.createAttribute("id");
      id.value='CityPickerEle';
      div.setAttributeNode(id);
      document.body.appendChild(div);
      ReactDOM.render(<CityPickerElement
        value={obj.value}
        title={obj.title||'选择城市'}
        onChange={(data)=>{typeof obj.onChange == 'function' &&obj.onChange(data)}}
      />, div);
    }
  }
}

class CityPickerElement extends Component {
  constructor(props) {
    super(props);
    let valueGroups,optionGroups,valueArr;
    if(!props.value){
      valueGroups = {
        province: handle.getProvince('440000'),
        city: handle.getCity('440000','440100'),
        zone: handle.getZone('440000','440100','440113')
      };
      optionGroups = {
        province: handle.getAllProvince(),
        city: handle.getAllCity('440000'),
        zone: handle.getAllZone('440000','440100'),
      }
    }else{
      valueArr = props.value.split(' ');
      let province_value = handle.getValue(valueArr[0]);
      let cityarr = handle.getAllCity(province_value);
      let city_value = handle.getValue(valueArr[0],valueArr[1]);
      let zonearr = handle.getAllZone(province_value,city_value);
      if(zonearr.length == 0) zonearr = [''];
      valueGroups = {
        province: valueArr[0],
        city: valueArr[1],
        zone: valueArr[2]||''
      };
      optionGroups = {
        province: handle.getAllProvince(),
        city: cityarr,
        zone: zonearr,
      }

    }
    this.state = {
      isPickerShow: false,
      valueGroups: valueGroups,
      optionGroups: optionGroups
    };
  }

  handleChange (name, value){
    this.setState(({valueGroups, optionGroups}) => {
      let nextState = {
        valueGroups: {
          ...valueGroups,
          [name]: value
        }
      };
      if(name == 'province'){
        let province_value = handle.getValue(nextState.valueGroups[name]);
        let cityarr = handle.getAllCity(province_value);
        let city_value = handle.getValue(nextState.valueGroups[name],cityarr[0]);
        let zonearr = handle.getAllZone(province_value,city_value);
        if(zonearr.length == 0) zonearr = [''];
        nextState.optionGroups = {
          ...optionGroups,
          city:cityarr,
          zone:zonearr
        };
        nextState.valueGroups = {
          province:value,
          city:cityarr[0],
          zone:zonearr[0]
        }
      }else{
        if(name == 'city'){
          let province_value = handle.getValue(nextState.valueGroups.province);
          let city_value = handle.getValue(nextState.valueGroups.province,nextState.valueGroups[name]);
          let zonearr = handle.getAllZone(province_value,city_value);
          if(zonearr.length == 0) zonearr = [''];
          nextState.optionGroups = {
            ...optionGroups,
            zone:zonearr
          };
          nextState.valueGroups = {
            province:valueGroups.province,
            city:value,
            zone:zonearr[0]
          }
        }
      }
      return nextState;
    });
  };

  togglePicker(){
    this.setState({isPickerShow:!this.state.isPickerShow});
  };

  confirm(){
    let dateObj = this.state.valueGroups;
    let address = dateObj.province+' '+dateObj.city+' '+dateObj.zone;
    this.togglePicker();
    this.props.onChange && this.props.onChange(address);
  }

  render() {
    const {optionGroups, valueGroups} = this.state;
    const isPickerShow = this.state.isPickerShow;
    const maskStyle = {
      display: isPickerShow ? 'block' : 'none'
    };
    const pickerModalClass = `picker-modal${isPickerShow ? ' picker-modal-toggle' : ''}`;

    return (
      <div className="picker-modal-container">
        <div className="picker-modal-mask" style={maskStyle} onClick={()=>{this.togglePicker()}}></div>
        <div className={pickerModalClass}>
          <header>
            <div className="title">{this.props.title}</div>
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