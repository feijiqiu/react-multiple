### [资料来源](http://imshuai.com/create-react-app-multiple-entry-points/)
#### 1. 创建新项目
``` 
    yarn create react-app antd-demo-ts --scripts-version=react-scripts-ts
```
### 2. eject 导出配置目录
``` 
    yarn run eject 
```
### 3. 修改webpack配置支持多入口
```angular2html
    
```
https://www.processon.com/

生命周期
1. constructor
2. componentWillMount
> 1、组件刚经历constructor,初始完数据
  2、组件还未进入render，组件还未渲染完成，dom还未渲染
  3、componentWillMount 一般用的比较少，更多的是用在服务端渲染，
  不推荐 写请求
  
3、componentDidMount 组件渲染完成
> 组件第一次渲染完成，此时dom节点已经生成，
    可以在这里调用ajax请求，返回数据setState后组件会重新渲染
    
4. componentWillReceiveProps (nextProps)
> 1.nextProps
  通过对比nextProps和this.props，将nextProps setState为当前组件的state，从而重新渲染组件
  2. 某种情况下 可在 组件中调用，
