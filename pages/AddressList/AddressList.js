// pages/AddressList/AddressList.js
const app = getApp()
var basepath = app.basePath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[],
    id:'',
    show:'none',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(this.data.id)

    wx.request({
      url: basepath, // 仅为示例，并非真实的接口地址
      data: {
        service: 'MyAddresss.FindAddressBysession3rd',
        session3rd: wx.getStorageSync('session')
      },
      dataType: 'json',
      method: 'POST',
      header: {
        'Content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res)

        that.setData({
          address: res.data.data.info
        })
      }
    })
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