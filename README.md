# webpack3.0
## vue + 多页面
- 入口文件 entry.js
- 页面 title 配置文件 pages.js

## 特性更新
- Scope Hoisting 合并多个模块的包裹函数,即连接所有闭包到一个闭包里，放入一个函数.速度变快,体积变小
- 可使用happypack插件多核构建项目
- NamedModulesPlugin  开启 HMR 的时候使用该插件会显示模块的相对路径

## 注意点
- 热更新(HMR)不能和filename[chunkhash]同时使用,filename[hash]则 所有文件共享一个hash, 导致改动任意 js 也会影响 vendor 文件 hash 更改.
- 使用CommonsChunkPlugin分割 vendor, 由于上面的问题,导致js 文件改变时, vendor hash 也改变.


## 问题 
- 多页面[hmr]更新时, 控制台报错.  vue.js:597 [Vue warn]: Cannot find element: #app
- 使用DllPlugin和DllReferencePlugin分割代码,引用 vendor 失败. Vue库仍然被单独打进每个页面