# cms project front-end

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# 使用生产环境配置构建项目，构建好的文件会输出到 "dist" 目录
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
***

## 目录结构

    ├── index.html                      入口页面
    ├── build                           构建脚本目录
    │   ├── build.js                        生产环境构建脚本
    │   ├── dev-client.js                   开发服务器热重载脚本，主要用来实现开发阶段的页面自动刷新
    │   ├── dev-server.js                   运行本地开发服务器
    │   ├── utils.js                        构建相关工具方法
    │   ├── webpack.base.conf.js            wabpack基础配置
    │   ├── webpack.dev.conf.js             wabpack开发环境配置
    │   └── webpack.prod.conf.js            wabpack生产环境配置
    ├── dist                            构建完成的文件目录，第一次执行npm run build 会自动创建此目录
    │   ├── index.html                      首页（唯一的html文件）
    │   └── static                          存放js和css文件
    │       ├── js                              js文件目录
    │       └── css                             css文件目录
    ├── config                          项目配置
    │   ├── dev.env.js                      开发环境变量
    │   ├── index.js                        项目配置文件
    │   └── prod.env.js                     生产环境变量
    ├── package.json                    npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
    ├── src                             项目源码目录    
    │   ├── main.js                         入口js文件
    │   ├── app.vue                         根组件
    │   ├── components                      公共组件目录
    │   │   └── Home
    │   ├── assets                          资源目录，这里的资源会被wabpack构建
    │   │   ├── images
    │   │   ├── js
    │   │   └── css
    │   └── routes                          前端路由
    │       └── index.js
    ├── static                          纯静态资源，不会被wabpack构建。
    └── test                            测试文件目录
        └── unit                            单元测试
            ├── index.js                        入口脚本
            ├── karma.conf.js                   karma配置文件
            └── specs                           单测case目录
                └── Hello.spec.js

***

## 页面布局
* 内容管理主页面分为#home_header和#home_content上下两部分;
* #home_content采用display:flex;高度设置为100%;宽度设置为100%；
* #home_content分为左侧导航和右侧主体内容,左侧导航设置为固定宽度，右侧主体内容设置为flex:1（填充剩余宽度）；
* #home_content左侧导航和右侧主体内容各设置了overflow:auto属性，当内容高度超过页面高度时，会在所在的单独模块内出现滚动条；
* 网站整体采用响应式布局,所以在编写单独板块样式时，应尽量使用百分比来定义宽度。
***

## 管理npm模块：
```bash
#添加模块: 
npm install <packageName> --save  

#删除模块：
npm uninstall <packageName>
```
***

## 工具和框架
### webpack 2.x
* 官网：https://webpack.github.io/
* 英文文档：https://webpack.js.org/
* 中文文档：http://www.css88.com/doc/webpack2/guides/development/

### vue 2.x
* 官网：https://cn.vuejs.org/
* 中文文档：https://cn.vuejs.org/v2/guide/