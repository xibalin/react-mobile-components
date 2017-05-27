import 'babel-polyfill'
import React,{Component} from 'react';
import {render} from 'react-dom';
import {PreviewImage,Tabs,TabPane,Star,Toast,ListView,DatePicker,CityPicker,SelectPickers,Stepper,ConfirmBox,InputItem,ListItem,CodeButton} from 'components';
import ClassItem from './components/ClassItem';
import request from 'utils/request';
import '../static/style/fonts/iconfont.css';

import './index.scss';

class Index extends Component{
  constructor(props){
    super(props);
    this.state = {
      title:'组件库',
      loading:false,
      allLoad:false,
      classes:[],
      count:10,
      listH:400,
      phone:'18819466864',
      disable:true
    }
  }

  componentDidMount(){
    this.loadMoreData();
  }

  sendCode(){
    request().get(`/customer/sms/${this.state.phone}`).end((error,res)=>{
      if (res.status_code === 200){
        ConfirmBox.show({
          title:'提示',
          content:'验证码发送成功'
        });
      }
    });
  }

  loadMoreData = async (page)=>{
    let count = page || this.state.count;
    let query = {
      count
    };
    await this.setState({loading:true});
    await request('/v2').get('/movie/top250').query(query).end((err,data)=>{
      if(!err){
        let classes = data.subjects;
        let allLoad = !Boolean(classes.length);
        this.setState({
          classes,
          count: count + 10,
          loading:false,
          allLoad
        });
      }
    })
  }

  render(){
    let { classes, loading, allLoad, listH } = this.state;
    return(
      <div className="demo-index" style={{width:'100%',height:'100%'}}>
        <p>{this.state.title}</p>
        <Tabs defaultActiveKey={0}>
          <TabPane tab="UI" key={0}>
            <div>
              <ListItem
                toLeft="3rem"
                handleClick={()=>{ConfirmBox.show({
                  title:'确定删除？',
                  content:'删错了我不负责任哇',
                  cancelText:'不玩了',
                  onOk:()=>{alert('删除成功')}})}}
              ><span>显示确认框</span></ListItem>

              <p className="title-listview">ListView</p>
              <ListView
                data={classes}
                listH={listH}
                loadMore={this.loadMoreData}
                reFresh={()=>{ this.loadMoreData(10); }}
                loading={loading}
                allLoad={allLoad}
              >
                <ClassItem />
              </ListView>

              <ListItem
                handleClick={()=>{Toast.loading('loading',2000)}}
              ><span>显示loadingToast</span></ListItem>

              <ListItem
                handleClick={()=>{CityPicker.show({value:this.state.city,title:'请选择',onChange:(city)=>{this.setState({city})}})}}
              ><span>{this.state.city||'选择城市'}</span></ListItem>

              <ListItem
                handleClick={()=>{DatePicker.show({range:true,value:this.state.date,title:'请选择',onChange:(date)=>{this.setState({date})}})}}
              ><span>{this.state.date||'选择时间'}</span></ListItem>

              <ListItem
                handleClick={()=>{SelectPickers.show({
                  value:this.state.selects,
                  data:{
                    pot_type:['全部','上装','下装','压力罐','普通罐','铝罐','不锈钢','碳钢','内涂罐','其它'],
                    bridge_type:['全部','单桥','2桥','3桥','4桥','5桥','6桥','其它' ]
                  },
                  onChange:(selects)=>{this.setState({selects:selects.join()})}
                })}}
              ><span>{this.state.selects||'显示多选Picker'}</span></ListItem>

              <ListItem>
                <span>步进器{this.state.stepperValue||0}</span>
                <Stepper value="0" onChange={(stepperValue)=>{this.setState({stepperValue})}}/>
              </ListItem>

              <ListItem>
                <span>星级评价{this.state.starValue||0}</span>
                <Star value={this.state.starValue||0} clickable setStar={(starValue)=>{this.setState({starValue})}}/>
              </ListItem>

              <InputItem
                value={this.state.phone}
                handleInput={(phone)=>{this.setState({
                  phone,
                  disable:!/^[1][358][0-9]{9}$/.test(phone)
                })}}
                type="number"
                pattern="/d*"
                placeholder="手机号码"
                toLeft="1.5rem"
              ><span>InputItem</span></InputItem>

              <ListItem>
                <span>验证码发送按钮</span>
                <CodeButton
                  unique="login"
                  handleClick={()=>{ this.sendCode(); }}
                  disable={this.state.disable}
                />
              </ListItem>

              <ListItem>
                <span>图片预览组件</span>
                <img src="https://s3.cn-north-1.amazonaws.com.cn/lcavatar/b46ef40c-e22e-4ecf-a599-cace9fba839a_40x40.png" onClick={()=>{PreviewImage.show("https://s3.cn-north-1.amazonaws.com.cn/lcavatar/b46ef40c-e22e-4ecf-a599-cace9fba839a_40x40.png")}}/>
              </ListItem>

            </div>
          </TabPane>
          <TabPane key={1} tab="文档">
            <div>
              自己看readme
            </div>
          </TabPane>
        </Tabs>

      </div>
    )
  }

}

render(<Index/>,document.getElementById('content'));