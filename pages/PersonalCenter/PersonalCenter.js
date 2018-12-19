// pages/PersonalCenter/PersonalCenter.js
const app = getApp()
var basepath = app.basePath;
var imagepath = app.imagepath;
import Dialog from '../../vant/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basepath: basepath,
    userinfo: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getUserInfo();
  
  },
  //onshow时候请求用户信息
  getUserInfo() {
    var session3rd = wx.getStorageSync('session');
    let that = this;
    wx.request({
      url: basepath,
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
        if (res.data.data.code == 0) {
          Dialog.confirm({
            title: '请登录',
            confirmButtonText: '登录'
          }).then(() => {
            wx.navigateTo({
              url: '../login/login',
            })
          }).catch(() => {
            wx.switchTab({
              url: '/pages/index/index'
            })
          });
        } else if (res.data.data.code == 1) {
          let info = res.data.data.info;
          that.setData({
            userinfo: info,
          })
        }

      }
    })
  },
  //查看全部订单跳转订单列表页
  ToOderList() {

    wx.navigateTo({
      url: '/pages/OrderList/OrderList?current=all'
    })
  },

  //订单不同状态按钮
  ToOderList2(e) {
    wx.navigateTo({
      url: '/pages/OrderList/OrderList?current=' + e.currentTarget.dataset.current,
    })
  },
  //我的地址按钮
  ToMyAddress() {
    wx.navigateTo({
      url: '/pages/AddressList/AddressList',
    })
  },
  //推广中心按钮
  ToMyAddress() {
    wx.navigateTo({
      url: '/pages/PopularizeCenter/PopularizeCenter',
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})