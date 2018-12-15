// pages/phonetest/phonetest.js
const { $Toast } = require('../../iview/base/index');
const app = getApp()
var basepath = app.basePath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonenum:'',
    code:'',
    disable:false,
    getcode:'获取验证码',
  },
  
  getBtn: function (options) {

    console.log(basepath)
    var that = this;

    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(this.data.phonenum)) {
      console.log("假的")
      $Toast({
        content: '手机号不正确',
        type: 'error'
      });
    }else{
      wx.request({
        url: basepath, // 仅为示例，并非真实的接口地址
        data: {
          service: 'login.SendSms',
          phone: that.data.phonenum
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data)
          if (res.data.data.code) {
            
          }
        }
      })


      var currentTime = 3;
      that.setData({
        disable: true,
        getcode: currentTime + '秒'

      })
      console.log(currentTime)
      var interval = setInterval(function () {
        that.setData({
          getcode: (currentTime - 1) + '秒'
        })
        currentTime--;
        console.log(currentTime)
        if (currentTime == 0) {
          clearInterval(interval)
          that.setData({
            getcode: '重新获取',
            disable: false,
          })
        }
      }, 1000)
    }
  },
  tel_input:function(e){
    console.log(e.detail.cursor)
    this.setData({
      phonenum:e.detail.value
    })
  },
  tel_code: function (e) {
    console.log(e.detail.cursor)
    this.setData({
      code: e.detail.value
    })
  },
  commite:function(){
    var that=this;
    console.log(this.data.phonenum)
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(this.data.phonenum)) {
      console.log("假的")
      $Toast({
        content: '手机号不正确',
        type: 'error'
      });
    } else{
      if (this.data.code.length == 0) {
        $Toast({
          content: '验证码不正确',
          type: 'error'
        });
      }else{
        wx.request({
          url: basepath, // 仅为示例，并非真实的接口地址
          dataType: 'json',
          method: 'POST',
          data: {
            service: "Login.CheckCode",
            phone: that.data.phonenum,
            vcode: that.data.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success(res) {
            console.log(res.data)
            if(res.data.data.code ==0){
              $Toast({
                content: '验证码不正确',
                type: 'error'
              });
            }
            if(res.data.data ==1){
              wx.request({
                url: basepath, // 仅为示例，并非真实的接口地址
                dataType: 'json',
                method: 'POST',
                data: {
                  service: 'Login.UserRegister',
                  nickName: wx.getStorageSync('userMessage').nickName,
                  phone:that.data.phonenum,
                  headPortrait: wx.getStorageSync('userMessage').avatarUrl,
                  session3rd: wx.getStorageSync('session')
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                success(res) {
                  console.log(res.data)
                  if(res.data.data.code==1){
                    console.log("跳转操作")
                    wx.navigateBack({
                       delta:2
                    })
                  }
                }
              })
            }
          }
        })
     }
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getStorage({
    //   key: 'session',
    //   success: function (res) {
    //    console.log(res)
        
    //     wx.request({
    //       url: basepath, // 仅为示例，并非真实的接口地址
    //       data: {
    //         service: 'login.Index',
    //         session3rd: wx.getStorageSync("session") 
    //       },
    //       dataType: 'json',
    //       method: 'POST',
    //       header: {
    //         'Content-type': 'application/x-www-form-urlencoded' // 默认值
    //       },
    //       success(res) {
    //         console.log(res)
    //       }
    //     })
    //    }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})