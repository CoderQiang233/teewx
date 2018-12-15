// pages/PersonalCenter/PersonalCenter.js
const app = getApp()
var basepath = app.basePath;
var imagepath = app.imagepath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basepath: basepath
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var session3rd = wx.getStorageSync('session');
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
        
        wx.redirectTo({
          url: '../login/login',
        })
      }
    })
  },
//查看全部订单跳转订单列表页
  ToOderList(){
    wx.navigateTo({
      url: '/pages/OrderList/OrderList',
    })
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