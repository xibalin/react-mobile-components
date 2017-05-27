import React, { Component } from 'react';
import { LazyLoad } from '../../../lib'
import './index.scss';

export default class ClassItem extends Component {
  render() {
    const {
      original_title,
      subtype,
      year,
      title,
      images
    } = this.props;

    return (
      <div className="item">
        <div className="pic">
          <div>
            <LazyLoad src={images.small} container=".listCard"/>
          </div>
        </div>
        <div className="info">
          <div className="hd">
            <span className="title">{title}</span>
          </div>
          <div className="bd">
            <p className="">
              {subtype}
              {year}
            </p>
          </div>
        </div>
      </div>
    );
  }
}