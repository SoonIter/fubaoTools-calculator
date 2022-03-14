# 福报工具箱fubaotools

## 计算器

这是一个为完成课堂作业而生的项目，使用了electron + vue3 + vueRouter + vueX + vue-cli + sass

### v1.0 使用说明

下载release1.0版本压缩包，打开exe

1.按键说明 0-9 +-*÷对应小键盘 ，Enter对应 = ，BackSpace对应退格键

2.点击上方按钮切换模式，1.0版本中物理模式还为开发完成，可以使用小钉子pin到桌面顶部

### v1.0 功能实现与介绍

1. 模式切换，简单、数学、物理、金融、终端五种模式切换
2. 简单模式simple：采用中缀转后缀、后缀求值进行基本四则运算，并使用math.js采用字符串预处理的方式完成复杂运算
3. 数学模式math：使用mathjs库进行运算，支持三角函数、对数、指数、阶乘。
4. 终端模式terminal：使用mathjs进行函数、变量、基本运算，十分强大，支持变量、函数定义、矩阵运算。并存储历史数据在本地缓存中，可通过按钮删除本地存储。
5. 金融模式finance：使用vue的computed，和moneyjs 汇率转换，默认货币为 人民币

### 技术亮点

1.采用git+github进行代码托管和版本控制

2.electron桌面端多平台打包

3.模块化管理，包管理工具为npm+yarn，对使用次数较多函数进行模块封装，提高复用度

### UI设计和用户体验：

采用拟态玻璃的设计风格，透明的背景可以让用户获取更多信息，pinOnTop功能更加方便用户使用

## 项目启动

```
npm install
npm run electron:serve
```

# fubaotools——calculator

This is a project of my homework ——a calculator application. It is built with electron + vue3 + vueRouter + vueX.

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```
