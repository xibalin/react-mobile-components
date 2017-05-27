import React from 'react';
import _ from 'lodash';

import './index.scss';

export default (props) => {
    const {value, className, clickable, ...rest} = props;
    const stars = _.map(_.range(5), (star, index) => {
        let _class = '';
        if (value - 1 >= index) {
            _class = 'iconfont icon-starhover';
        } else {
            _class = 'iconfont icon-starnormal';
        }
        return [ clickable
          ? <i className={_class} key={index} onClick={() => {props.setStar(index+1)}}/>
          : <i className={_class} key={index}/>
        ]
    });
    return (
      <div className='fe-star'>
          { stars }
      </div>
    )
}
