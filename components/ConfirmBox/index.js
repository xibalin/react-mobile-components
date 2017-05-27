import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import method from 'utils/methods';
import classname from 'classnames';
import './index.scss';

export default class Confirm {
  static show(obj){
    if(!obj||(!obj instanceof Object)){
      console.warn('arguments must be a object')
    }else{
      method.destroy(['feConfirmBox']);
      let container = document.createElement('div'),
        title = obj.title||'',
        content = obj.content||'',
        cancelText = obj.cancelText||'取消',
        submitText = obj.submitText||'确认',
        onOk = obj.onOk?()=>{obj.onOk();method.destroy()}:method.destroy,
        onCancel = obj.onCancel?()=>{obj.onCancel();method.destroy()}:method.destroy;
      container.setAttribute('id','feConfirmBox');
      document.body.appendChild(container);

      ReactDOM.render(
        <ConfirmBox
          title={title}
          bodyText={content}
          cancelText={cancelText}
          submitText={submitText}
          setConfirm={onOk}
          setCancel={onCancel}
          hide={()=>{method.destroy(['feConfirmBox'])}}
        />,
        container
      )
    }
  }
}

class ConfirmBox extends Component{
  constructor(){
    super();
    this.state = {
      modal:true,
      maskModal:true
    }
  }

  hide(confirm){
    switch (confirm){
      case 'ok' : this.props.setConfirm&&this.props.setConfirm();break;
      case 'cancel':this.props.setCancel&&this.props.setCancel();break;
    }
    this.setState({modal:true});
    setTimeout(()=>{this.props.hide();},500)
  }

  render(){
    return (
      <div className="fe-confirmBox">
        <div className="mask" onClick={()=>{this.hide()}}></div>
        <div className={classname("confirmMain",{modal:this.state.modal})}>
          <p><span>{this.props.title}</span><span>{this.props.bodyText}</span></p>
          <nav onClick={()=>{this.hide('cancel')}}>{this.props.cancelText}</nav>
          <nav onClick={()=>{this.hide('ok')}}>{this.props.submitText}</nav>
        </div>
      </div>
    )
  }

  componentDidMount(){
    setTimeout(()=>{this.setState({modal:false})},0)

  }

}