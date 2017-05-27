import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import methods from 'utils/methods';
import './index.scss';

export default class PreviewImage{
  static show(src){
    let div = document.createElement('div');
    div.setAttribute('id','PreviewImageEle');
    document.body.appendChild(div);
    ReactDOM.render(<PreviewImagedElement
      src={src}
      onShow={()=>{methods.destroy(['PreviewImageEle'])}}
    />,div)
  }
}

class PreviewImagedElement extends Component{
  constructor(props){
    super(props);
    this.state = {
      src:require('components/PreviewImage/image/toast-loading.gif'),
      loading:true
    }
  }

  render(){
    return(
      <div className="fe-previewImage-con" onClick={()=>{this.props.onShow()}}>
        <div className="mask"></div>
        <img src={this.state.src} className={this.state.loading?'':'preview'}/>
      </div>
    )
  }

  componentDidMount(){
    let image = new Image();
    image.src = this.props.src;
    image.onload = ()=>{
      this.setState({loading:false,src:this.props.src})
    }
  }
}