import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Picker from '../Picker';
import method from 'utils/methods';
import './index.scss';
function generateNumberArray(begin, end) {
  let array = [];
  for (let i = begin; i <= end; i++) {
    array.push((i < 10 ? '0' : '') + i);
  }
  return array;
}
export default class DatePicker{
  static show(obj){
    if(!obj||(!obj instanceof Object)){
      console.warn('arguments must be a object')
    }else{
      method.destroy(['DatePickerEle']);
      let div = document.createElement('div');
      div.setAttribute('id','DatePickerEle');
      document.body.appendChild(div);
      ReactDOM.render(<DatePickerElement
        range={obj.range}
        value={obj.value}
        title={obj.title||''}
        onChange={(data)=>{typeof obj.onChange == 'function' &&obj.onChange(data)}}
      />, div);
    }
  }
}

class DatePickerElement extends Component {
  constructor(props) {
    super(props);
    let year,month,day,dateArr = props.value&&props.value.split('-');
    year = props.value?dateArr[0]:(new Date().getFullYear()).toString();
    month = props.value?dateArr[1]:(new Date().getMonth()+1<10?`0${new Date().getMonth()+1}`:new Date().getMonth()+1).toString();
    day = props.value?dateArr[2].split(' ')[0]:(new Date().getDate()<10?`0${new Date().getDate()}`:new Date().getDate()).toString();
    this.state = {
      isPickerShow: false,
      valueGroups: {year,month,day},
      optionGroups: {
        year: generateNumberArray(2016, 2050),
        month: generateNumberArray(1, 12),
        day: generateNumberArray(1, 31),
      }
    };
  }


  handleChange (name, value){
    this.setState(({valueGroups, optionGroups}) => {
      const nextState = {
        valueGroups: {
          ...valueGroups,
          [name]: value
        }
      };
      if (name === 'year' && valueGroups.month === '02') {
        if (parseInt(value) % 4 === 0) {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 29)
          };
        } else {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 28)
          };
        }
      } else if (name === 'month') {
        if (value === '02') {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 28)
          };
        } else if (['01', '03', '05', '07', '08', '10', '12'].indexOf(value) > -1 &&
          ['01', '03', '05', '07', '08', '10', '12'].indexOf(valueGroups.month) < 0) {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 31)
          };
        } else if (['01', '03', '05', '07', '08', '10', '12'].indexOf(value) < 0 &&
          ['01', '03', '05', '07', '08', '10', '12'].indexOf(valueGroups.month) > -1) {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 30)
          };
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
    let date = dateObj.year+'-'+dateObj.month+'-'+dateObj.day;
    if(this.props.range){
      date += ' '+dateObj.range;
    }
    this.togglePicker();
    this.props.onChange && this.props.onChange(date);
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
    if(this.props.range){
      this.setState({
        valueGroups: {
          year: '2016',
          month: '08',
          day: '12',
          range:'上午'
        },
        optionGroups: {
          year: generateNumberArray(2016, 2050),
          month: generateNumberArray(1, 12),
          day: generateNumberArray(1, 31),
          range:['上午','下午','不限']
        }
      })
    }

    setTimeout(()=>{this.setState({isPickerShow:true})},0)

  }
}