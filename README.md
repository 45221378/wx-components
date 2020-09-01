# circle
微信小程序-圆形进度条组件

### 旧版本

#### 旧版本通过 const ctx = wx.createCanvasContext(el, this)进行渲染，现在市面上，包括echart.js插件，目前都是使用的此方法。

##### 此方法有几个问题，优化难度比较大，需要注意

````
1.  z-index层级太高，一些定制化的需求无法满足,
    比如可以拖拽的movable-view的层级要比canvas高，比如video组件等等......
2.  生成的canvas无法放入 scroll-view 标签中，在ios手机上面进行滑动的时候，会脱离文档流。
````

    以上两点都有放弃此方法的想法，更加不用提，优化以及渲染速度等......


### 新版本

#### 新版本通过 canvas.getContext('2d') 进行渲染，此方法在真机测试中，层级可以通过z-index进行覆盖。



体验请看
![Image text](https://github.com/45221378/circle/blob/master/images/wx.jpg)
