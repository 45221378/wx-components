// component/circle.js
Component({
  /**
   * 组件的属性列表
   */
  data: {
    step: 1, //用来算圆的弧度0-2
    size: 200, //画板大小
    screenWidth: 750, //实际设备的宽度

  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    draw: { //画板元素名称id
      type: String,
      value: 'draw'
    },
    per: { //百分比 通过此值转换成step
      type: String,
      value: '0'
    },
    r: { //半径
      type: String,
      value: '50'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    load() {
      const query = wx.createSelectorQuery().in(this)
      query.select('#' + this.data.draw)
        .fields({
          node: true,
          size: true
        })
        .exec(this.init.bind(this))

    },
    init(res) {
      this.setData({})
      const canvas = res[0].node
      const ctx = canvas.getContext('2d')

      const dpr = wx.getSystemInfoSync().pixelRatio
      canvas.width = res[0].width * dpr
      canvas.height = res[0].height * dpr
      ctx.scale(dpr, dpr)

      const r = Number(this.data.r); //圆形半径
      let rpx = (this.data.screenWidth / 750) * r;
      let step = (2 * Number(this.data.per)) / 100;
      console.log(r)
      console.log(rpx)
      console.log(this.data.screenWidth)
      console.log(this.data.per)
      console.log(this.data.size)


      ctx.lineWidth = 4;
      ctx.strokeStyle = '#eee';
      ctx.setLineCap = 'round';
      ctx.arc(rpx, rpx, rpx - 4, 0, 2 * Math.PI, false); //设置一个原点(53,53)，半径为50的圆的路径到当前路径
      ctx.stroke(); //对当前路径进行描边
      //这部分是蓝色部分
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#369cfd';
      ctx.setLineCap = 'round';
      ctx.beginPath(); //开始一个新的路径
      ctx.arc(rpx, rpx, rpx - 4, -Math.PI, step * Math.PI - Math.PI, false);
      ctx.stroke(); //对当前路径进行描边
    }
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {

    },
    hide: function () {},
    resize: function () {},
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      const _this = this;
      //获取屏幕宽度
      wx.getSystemInfo({
        success: function (res) {
          const r = Number(_this.data.r); //圆形半径
          let rpx = (res.windowWidth / 750) * r;
          _this.setData({
            screenWidth: res.windowWidth,
            rpx,
            size: rpx * 2
          });
        },
      });
      _this.load()
    }
  },
  ready() {

  },
})