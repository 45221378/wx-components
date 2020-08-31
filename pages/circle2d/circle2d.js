const app = getApp()

Page({
  data: {
    x: 460,
    y: 480,
    list:[]
  },

  onLoad: function () {
    setTimeout(()=>{
      this.setData({
        list : [50,60,15,80,30,25]
      })
    },100)
  },
})