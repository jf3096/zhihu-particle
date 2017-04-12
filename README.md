# Zhihu-Particle
[![NPM](https://nodei.co/npm/zhihu-particle.png)](https://www.npmjs.com/package/zhihu-particle)

## 简介
由于群友的号召，清明时节得空，所以仿[知乎登录](https://www.zhihu.com)页面，基于canvas实现了一个粒子（Particle）随机运动的动画效果。
为了方便大家使用，也为提供了react和vue知乎登录页的完整实现。<b>小手抖一抖，点赞有木有</b>，喜欢可以点个赞当做收藏吧。
## Demo
[知乎Particle Demo](https://jf3096.github.io/zhihu-particle/)

## Demo源码
[知乎React Demo源码](https://github.com/jf3096/zhihu-particle/tree/master/demo/zhihu-react) <br />
[知乎Vue Demo源码](https://github.com/jf3096/zhihu-particle/tree/master/demo/zhihu-vue) <br />
[知乎Inferno Demo源码 - For Fun Only](https://github.com/jf3096/zhihu-particle/tree/master/demo/zhihu-inferno)

## 独立包
[react-particle](https://github.com/jf3096/react-particle) 
 
## 安装
```shell
npm i zhihu-particle --save #使用npm安装
```

```shell
yarn add zhihu-particle #使用yarn安装
```

## 基本使用
在CommonJS环境下：
```javascript
    import Particle from 'zhihu-particle';
    new Particle(document.getElementById('canvas-wrapper'));
```

简单来说，在CommonJS下引入Particle类后，传入一个DOM节点作为第一个参数即可完成创建，一句话实现知乎效果。

## API说明

```javascript
    import Particle from 'zhihu-particle'; //Particle为当前库的Class， 可用于多次实例化
    new Particle(<Html Dom Element>,<ParticleOption>);
```

#### Html Dom Element
当前参数为即将插入的Html Dom容器，或简单来说可以认为是一个Div。例如

```javascript
    document.getElementById('#canvasWrapper');
```

为了可拓展，Zhihu-Particle所创建的canvas会插入指定的Div中，<b>canvas的大小会自动跟随该Div大小变化而变化，所以指定的Div请自行设置大小</b>。
这样做的目的是可以让用户更加自定义的选择动画区域而不必全屏，同时也自动实现了响应式。详细可以参考本库的[知乎React Demo](https://github.com/jf3096/zhihu-particle/tree/master/demo/zhihu)。

#### ParticleOption
当前参数为粒子选项，可选，有默认的配置。

context属性 | 类型 | 例子 | 说明
---------- | ---- | ----- | ------------------
`atomColor` | `string` | `#eeeeee` | 原子颜色，默认值为`#E4E5E6`
`interactive` | `boolean` | true | 是否允许鼠标点击交互，默认值为true
`density` | `number`或`string` | `medium` | 密度，取值范围为1000~50000, `low`, `high`, `medium`。<br />这里可以理解成atoms数量=canvas宽*canvas高/密度。<br />这样的设计是为了在全站响应式的情况下，小屏幕会生成相应少的原子，大屏幕则会生成较多的原子，所以更符合日常需求。
`velocity` | `number`或`string` | .8 | 原子移动速度，取值范围为0~1，`fast`，`slow`，`none`，`medium`，默认为`medium`

## 效果图
![zhihu-particle](./git-img/zhihu-particle.gif)

## 兼容性
任何支持Canvas的浏览器，如常见的：
> IE9+

> Firefox

> Chrome

> Safari
