//index.js
//获取应用实例
const app = getApp()
var basepath = app.basePath;
const {
  $Message
} = require('../../iview/base/index');


Page({
  data: {
    visible2: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  handleClose2() {
    this.setData({
      visible2: false
    });
  },
  handlephonetest2() {
    wx.redirectTo({
      url: '../phonetest/phonetest',
    })
  },

  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })

        console.log(res.userInfo)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
   
    wx.setStorageSync('userMessage', e.detail.userInfo)
    var that =this;
    
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      // visible2: true,
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
    if (e.detail.errMsg == 'getUserInfo:ok') {
      let _this = this;
      // wx.getStorageSync('session')
      wx.getStorage({
        key: 'session',
        success: function(res) {
          let session3rd = res.data;
          console.log(res)  
          wx.request({
            url: basepath, // 仅为示例，并非真实的接口地址
            data: {
              service: 'login.Index',
              session3rd: session3rd
            },
            dataType: 'json',
            method: 'POST',
            header: {
              'Content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success(res) {
              console.log(res)
              // if(res.data.data.code ==0){
              //   //第一次进入，需要弹出手机验证
              //    that.setData({
              //      visible2: true
              //    })
              // }else{
              //   console.log("老用户登录，")
              // }
              wx.navigateTo({
                
              
                url: '../PhoneVerification/PhoneVerification',
              })
            }
          })
        }
      })
    }
    console.log(this.data.userInfo)
  }
})