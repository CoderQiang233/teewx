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
    userinfo:'',

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
  },
  //推广订单按钮
  ToPromotionOrder(){
    wx.navigateTo({
      url: '/pages/PromotionOrder/PromotionOrder',
    })
  },
 //推广规则按钮
  ToRules(){
    wx.navigateTo({
      url: '/pages/PromotionRules/PromotionRules',
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