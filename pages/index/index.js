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
        XDEBUG_SESSION_START:12886
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
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
