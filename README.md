# coderh_app

## 项目介绍

本项目基于 React-native（0.73.6）开发并实践，后续会逐步完善这个项目，并添加上常用库和常用功能。**目前仅支持 Android 版本**

> 请在使用前阅读该 README 文件，以达到最好的使用效果

> 由于 react-native 版本为 0.73.6 官方`不再推荐使用 chrome 远程来进行调试`，推荐使用 fliper ，内部通过设置，已`假还原`了 0.68 的 debug 菜单栏，目前仍然推荐使用 `react-native-debugger` 来监控网络请求

## 所使用技术栈

目前所使用库为 `ahooks`,`antd/rn`,`axios`,`dayjs`,`redux` 等常见库

### 组件

## 使用指南

Node 版本应`18.0.0`以上，推荐使用`yarn`来安装依赖，初次启动因`外网下载插件较慢`或`项目启动失败`，请`代理开启后`耐心等候。

Java 版本为`Java 17`

启动项目之前，请确保以下已准备完善

1. 项目依赖已安装完成
2. reactNative 开发环境已准备完善
3. 如使用模拟器或真机，`adb devices` 有存在的设备

如发现在模拟器中打开项目闪退，请保证打包的 `app` 名称不包含中文

目录介绍

已配置 module-resolver，无需使用..进行查询，请在各个目录下面默认导出

`assets` 项目资源，如图片和字体资源
`components` 项目组件，常用项目组件
`config` 项目命令，axios 和打包命令
`pages` 项目主要页面
`router` 项目路由区域
`store` 项目存储区域
`utils` 常用工具库

默认组件库 `rn.antd` 仓库

使用 echarts 组件库为 `@wuba/react-native-echarts`

storage 管理 `@react-native-async-storage/async-storage`

### 修改 App 版本号

如要升级发新版本的话，请在`app.json`中修改`verison`值，此项目已在 android/app/src/build.gradle 中进行封装

如要自定义封装 App 版本号，请修改文件中`versionName`值

如果要更新字体和图标样式，请在`assets/fonts`中进行修改

本项目所使用 hooks 使用 ahooks 进行完善开发

## 实现功能

1. 登录页面
2. TabBar
3. react-native-splash-screen

## 声明

本项目仅用于自身学习开发记录！
