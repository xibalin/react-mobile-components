## 公用组件
### Toast(轻提示) api:
    * 三种模式：Toast.success,Toast.fail,Toast.loading,
    * 参数：第一个参数是文本内容(必填)，第二个是消失时间，不定义就不消失
    * 例：Toast.loading('loading',1000);

### SelectPickers(普通选择器) api：
    * value:激活的值
    * data:需要选择的数据，必须是一维数组，元素只能数字或字符串
    * onChange:内部数据变化时发生的回调，被选中的数据通过参数回传
    * 例：SelectPickers.show({value:'',data:{data1:[],data2:[]},onChange:()=>{}})

### CityPicker,DatePicker(城市、时间选择器，无需传入数据) api:
    * title: 字符串，选择器的标题
    * value:激活的值
    * onChange:内部数据变化时发生的回调，被选中的数据通过参数回传,
    * DatePicker中额外提供range属性，设置是否显示时间段的选择
    * 例：CityPicker.show({title:'',value:'',onChange:()=>{}})

### ListView(无限滚动) api:
    * empty:无数据时的页面，无默认，要自己写，例(<p>暂无数据</p>)
    * flex:数据是否一行显示两个，
    * listH:容器高度,
    * data:需要渲染的数据，若要进行删除等数据操作，必填，
    * loadMore:滚动到底时触发的事件
    * reFresh:下拉刷新时触发的事件
    * loading:是否正在加载数据
    * allLoad:列表数据是否不再加载

### InputItem(输入框) api:
    * toLeft:底部border离左边的距离，如'1.5rem'
    * handleInput:内容变化时出现的回调，
    * value:input框的value值，
    * type:input框的type，如text,password,number等，
    * pattern:input框的pattern值
    * readOnly:boolean值，设定是否只读，
    * placeholder:input框的placeholder值，
    * 子组件：可嵌入其他组件，例(<inputItem><CodeButton/></inputItem>)

### ListItem(列表项) api:
    * toLeft:底部border离左边的距离，如'1.5rem'
    * type:iconfont的classname ,如icon-truck,无需额外写iconfont,可不填
    * children:内容
    * handleClick:响应点击事件
    * noright:是否显示右边箭头

### ConfirmBox(确认提示框) api:
    * setConfirm:点击确定后的响应
    * title:标题

### CodeButton(验证码发送按钮) api:
    * unique:必填，每个按钮的唯一性标识，如login，register等
    * handleClick:点击后触发的事件
    * disable:是否可点击

### Star(星级评价) api:
    * value：激活的星星数量，
    * setStar:设置value,
    * clickable:是否可点击

### PreviewImage(图片预览) api:
    * 使用示例：PreviewImage.show(url)；

### LazyLoad(图片懒加载) api:
    * src:进行懒加载的图片url,
    * container:父级容器标识，如'#con','.con'