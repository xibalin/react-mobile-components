import province_arr from './district-data';
import _ from 'lodash';

export default {

  getProvince(num){
    let item = _.find(province_arr,{value:num});
    if(item){
      return item.label
    }
  },

  getAllProvince(){
    return _.map(province_arr,(item)=>(
      item.label
    ))
  },

  getCity(province_num,city_num){
    let item = _.find(province_arr,{value:province_num});
    if(item){
      let city_item = _.find(item.children,{value:city_num});
      if(city_item) return city_item.label;
    }
    return '';
  },

  getAllCity(province_num){
    let item = _.find(province_arr,{value:province_num});
    if(item){
      return _.map(item.children,(city)=>(
        city.label
      ))
    }
    return [];
  },

  getZone(province_num,city_num,zone_num){
    let item = _.find(province_arr,{value:province_num});
    if(item){
      let city_item = _.find(item.children,{value:city_num});
      if(city_item){
        let zone_item = _.find(city_item.children,{value:zone_num});
        if(zone_item){
          return zone_item.label
        }
      }
    }
    return '';
  },

  getAllZone(province_num,city_num){
    let item = _.find(province_arr,{value:province_num});
    if(item){
      let city_item = _.find(item.children,{value:city_num});
      if(city_item){
        return _.map(city_item.children,(zone)=>(zone.label));
      }
    }
    return [];
  },

  getValue(){
    let item = _.find(province_arr,{label:arguments[0]});
    if(arguments.length==1){
      if(item){
        return item.value;
      }
    }else{
      let city_item = _.find(item.children,{label:arguments[1]});
      if(city_item){
        return city_item.value;
      }
    }
    return '';
  }
}