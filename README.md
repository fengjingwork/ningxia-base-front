# dna-business-front

> 宁夏门户项目

* ### 项目说明：

#### *1. 项目发布*

```bash
本项目打包路径前缀为/business/
项目发布在根目录下新建business文件夹
```

#### *2.登录信息存储*

```bash
由于项目在系统设计中，采用嵌入式方案，所以登录信息存储一律以localStoage为主，用户信息键值userInfo
获取用户信息let userInfo = localStoage.getItem('userInfo');
```
#### *3.服务代理设置*

```bash
proxyTable: {   //服务代理设置
  '/api': {
    target: 'http://127.0.0.1：4800',  //目标接口域名
    changeOrigin: true,  //是否跨域
    pathRewrite: {
      '^/api/': '/'   //重写接口
    }
  }
}
```

#### *4.文件存储目录说明*

```bash
src
   |_assets         //项目静态文件目录
   | |_images       //图片资源
   | |_sass         //预加载css文件
   |_components     //项目模板
   |_http           //ajax请求（Promise处理）
   |_router         //路由配置
   |_themes         //组件样式库
   |_UI             //组件UI库
```
#### *5.项目开发*

```bash
⚪本地安装
  npm install
⚪本地开发
  npm run dev
⚪项目发布
  npm run build
```
