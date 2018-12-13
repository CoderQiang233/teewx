//index.js
//获取应用实例
const app = getApp()
var basepath = app.basePath;
var imagepath = app.imagepath;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imagepath: imagepath,
    banner:[],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    var _this=this;
    wx.request({
      url: basepath + '?service=IndexPage.GetBanner', 
      method: 'POST',
      dataType: 'json',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        service: 'IndexPage.GetBanner',
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        _this.setData({
          banner: res.data.data.list
        })
      }

      

    })
    var session = wx.getStorageSync('session');
    wx.request({
      url: basepath + '?service=Login.Index',
      method: 'POST',
      dataType: 'json',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "session3rd": session,
      },
      success(res) {
        // _this.setData({
        //   banner: res.data.data.list
        // })
      }



    })
    // 获取首页布局
    wx.request({
      url: basepath, //仅为示例，并非真实的接口地址,
      data: {
        service: 'IndexPage.GetModules',
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        _this.setData({
          indexModules: res.data.data.list
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
