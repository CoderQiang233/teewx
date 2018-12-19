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
    userinfo: { balance: 0, PromotionMoney: 0, consumptionMoney:0},

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
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    this.getMoneyInfo();
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
  //获取用户推广金
  getMoneyInfo(){
    let that=this;
    wx.request({
      url: basepath + '?service=PromotionCenter.GetInfo',
      method: "post",
      data: {
        session: wx.getStorageSync("session")
      },
      dataType: 'json',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        wx.hideLoading();
        console.log(res);
        let code = res.data.data.code
        let info = res.data.data.info
        if (code == 1) {
          info.balance = parseFloat(info.balance);
          
          that.setData({
            userinfo: res.data.data.info
          })
        }
      }
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