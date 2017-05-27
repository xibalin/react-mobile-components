import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import classname from 'classnames';
import _ from 'lodash';
import './index.scss';
export default class ListView extends Component{
  constructor(props){
    super(props);
    this.state = {
      data:props.data,
      onloadText:'正在加载中...',
      onloadShow:!props.data.length,
      refreshing:false,
      release:false,
      loading:false,
      releaseHeight:0,
      refreshText:'正在刷新',
      canLoad:true,
    };
  }
  componentWillReceiveProps(props){
    if (props.allLoad){
      this.setState({ onloadText:'没有更多结果了', canLoad:false });
      setTimeout(()=>{
        this.setState({ onloadShow:false, onloadText:'正在加载中...' });
      }, 1000);
    }
    if (!props.loading && this.state.refreshing){
      setTimeout(()=>{
        this.setState({
          refreshText: '刷新成功',
          release:false
        });
      },1000);
      setTimeout(()=> {
        this.setState({
          refreshing: false,
          loading: props.loading,
          canLoad: true
        });
      }, 2000);
    }
    this.setState({ data:props.data });
  }

  //  显示加载图
  loadingGif(){
    return (
      <div className="sk-circle">
        <div className="sk-circle1 sk-child"></div>
        <div className="sk-circle2 sk-child"></div>
        <div className="sk-circle3 sk-child"></div>
        <div className="sk-circle4 sk-child"></div>
        <div className="sk-circle5 sk-child"></div>
        <div className="sk-circle6 sk-child"></div>
        <div className="sk-circle7 sk-child"></div>
        <div className="sk-circle8 sk-child"></div>
        <div className="sk-circle9 sk-child"></div>
        <div className="sk-circle10 sk-child"></div>
        <div className="sk-circle11 sk-child"></div>
        <div className="sk-circle12 sk-child"></div>
      </div>
    );
  }
  //  滚动到底加载
  checkToEnd(){
    if (!this.props.loading){
      if (this.props.listH && this.refs.listCard.scrollTop >= (this.refs.listInner.offsetHeight - this.props.listH)){
        if (this.state.canLoad) {
          this.setState({ onloadShow:true });
          this.props.loadMore();
        }
      } else {
        return false;
      }
    }
  }
//  下拉刷新
  listTouchStart(e){
    e.stopPropagation();
    if (this.refs.listCard.scrollTop <= 0 && !this.state.refreshing){
      this.state.starty = e.targetTouches[0].pageY;
    } else {
      return false;
    }
  }

  listTouchMove(e){
    e.stopPropagation();
    this.state.endy = e.targetTouches[0].pageY;
    if (!this.state.loading && this.refs.listCard.scrollTop <= 0 && this.state.endy > this.state.starty && !this.state.refreshing){
      e.preventDefault();
      this.setState({
        release:true,
        refreshText:'正在刷新',
        loading:false,
        releaseHeight:this.state.releaseHeight + 0.1,
      });
    } else {
      return false;
    }
  }

  refreshing(e){
    e.stopPropagation();
    if (!this.state.refreshing && this.state.releaseHeight > 0){
      this.state.refreshing = true;
      this.setState({ release:false, releaseHeight:0 ,loading:true });
      this.props.reFresh();
    } else {
      return false;
    }
  }

  render(){
    let { release, loading, refreshText, onloadShow, onloadText, releaseHeight, data} = this.state
    return (
      <div
        ref="listCard"
        className="listCard"
        onScroll={()=>{ this.checkToEnd(); }}
        onTouchStart={(e)=>{ this.listTouchStart(e); }}
        onTouchMove={(e)=>{ this.listTouchMove(e); }}
        onTouchEnd={(e)=>{ this.refreshing(e); }}
        style={{ height:this.props.listH, transformOrigin : `left top 0px`, transform:`translate3d(0,${releaseHeight}rem,0) scale(1)` }}
      >
        {release ? <p className="listview-release">松开刷新</p> : null}
        <ReactCSSTransitionGroup transitionName="loadingShow" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
          {loading ?
            <div className="listview-loading">
              {refreshText === '正在刷新' ?
                this.loadingGif() : null
              }
              <span>{refreshText}</span>
            </div> : null
          }
        </ReactCSSTransitionGroup>
        <div ref="listInner" className={classname({ flex:this.props.flex })}>
          {
            data.length?
              _.map(data, (data, index)=>(
                React.cloneElement(this.props.children, { key:index, lvkey:index, ...data, height:this.props.itemH })
              )) : this.props.empty
          }
          {
            onloadShow ? <p className="listview-noresult">{onloadText}</p> : null
          }
        </div>

      </div>
    );
  }

}

ListView.propTypes = {
  data: PropTypes.array.isRequired,
  listH: PropTypes.number.isRequired,
  loadMore: PropTypes.func.isRequired,
  reFresh: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  allLoad: PropTypes.bool.isRequired
}