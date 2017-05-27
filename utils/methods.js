import _ from 'lodash';
import ReactDOM from 'react-dom';

const methods = {
  pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  },

  getObjByKey(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1');
    s = s.replace(/^\./, '');
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in o) {
        o = o[k];
      } else {
        return;
      }
    }
    return o;
  },

  device() {
    let _agent = navigator.userAgent;

    if(/Android/i.test(_agent)) {
      return 'android';
    } else if(/iPhone|iPad|iPod/i.test(_agent)) {
      return 'ios';
    } else if(/IEMobile/i.test(_agent)) {
      return 'wp';
    } else {
      return 'desktop';
    }
  },

  isInvalidForm(formObj, {include=[], exclude=[]}={}) {
    if (exclude.length > 0) {
      return _.some(Object.keys(formObj), (key, index)=> {
        return _.indexOf(exclude, key) == -1 && !methods.hasValue(formObj[key]);
      })
    } else if (include.length > 0) {
      return _.some(include, (key, index)=> {
        return !methods.hasValue(formObj[key]);
      })
    } else {
      return _.some(Object.keys(formObj), (key, index)=> {
        return !methods.hasValue(formObj[key]);
      })
    }
  },
  
  hasValue(data) {
    return Array.isArray(data) ? data.length > 0 : !!data;
  },
  
  getTimeout(num){
    let now = new Date().getTime(),
        last = new Date(num).getTime(),
        theTime = parseInt((now - last)/1000),
        theTime1 = 0,
        theTime2 = 0;
    if(theTime > 60) {
      theTime1 = parseInt(theTime/60);
      theTime = parseInt(theTime%60);
      if(theTime1 > 60) {
        theTime2 = parseInt(theTime1/60);
        theTime1 = parseInt(theTime1%60);
      }
    }
    var result = parseInt(theTime)+'秒';
    if(theTime1 > 0) {
      result = parseInt(theTime1)+'分钟';
    }
    if(theTime2 > 0) {
      result = parseInt(theTime2)+'小时';
    }
    if(parseInt(theTime2)>24){
      result = parseInt(parseInt(theTime2)/24)+'天';
    }
    return result;
  },

  destroy(id_arr){
    if(id_arr instanceof Array){
      _.each(id_arr,(item)=>{
        let id = document.getElementById(item);
        if(id){
          ReactDOM.unmountComponentAtNode(id);
          document.body.removeChild(id);
        }
      })
    }

  }
}

export default methods