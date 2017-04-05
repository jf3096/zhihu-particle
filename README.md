# Zhihu-Particle
[![NPM](https://nodei.co/npm/partical.png)](https://www.npmjs.com/package/partical)

## 简介
由于群友的号召，清明时节得空，所以仿知乎登录页面，基于canvas实现了一个粒子（Particle）随机运动的动画效果。

## Demo
[知乎React Demo](https://github.com/jf3096/zhihu-particle/tree/master/demo/zhihu)

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

> options

context属性 | 类型 | 例子 | 说明
---------- | ---- | ----- | ------------------
`atomColor` | `string` | `#eeeeee` | 原子颜色，默认值为#e4e5e6`
`interactive` | `boolean` | true | 是否允许鼠标点击交互，默认值为true
`density` | `number`或`string` | ‘medium’ | 密度，取值范围为1000~50000, ‘low’, ‘high’, ‘medium’。<br />这里可以理解成atoms数量=canvas宽*canvas高/密度。<br />这样的设计是为了在全站响应式的情况下，小屏幕会生成相应少的原子，大屏幕则会生成较多的原子，所以更符合日常需求。
`velocity` | `number` | .8 | 加速度

## 效果图
![zhihu-particle](./git-img/zhihu-particle.gif)

## 兼容性
> IE9+

> Firefox

> Chrome

> Safari