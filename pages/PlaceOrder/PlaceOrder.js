// pages/PlaceOrder/PlaceOrder.js

const app = getApp()
var basepath = app.basePath;
var imagepath = app.imagepath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:'',
    imagepath: imagepath,
    address:'',
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
    this.getShop();
    this.getUserAddress();
  },

  //获取商品信息及数量
  getShop(){
    this.setData({
      product: wx.getStorageSync('product'),
    })
  },
  //获取用户收货地址
  getUserAddress() {
    let address = wx.getStorageSync('address')
    if (address) {
      console.log(address);
      this.setData({

      })
    } else {
      // wx.request({
      //   url: '',
      // })
    }

  },
  //通过session获取

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