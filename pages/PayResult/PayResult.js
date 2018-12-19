// pages/PayResult/PayResult.js
const app = getApp()
var basepath = app.basePath;
var imagepath = app.imagepath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PayStatus:1,
    pay_id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      pay_id: options.pay_id
    })
    if (options.result==1){
      this.setData({
        PayStatus:1,
      })
    } else if (options.result==0){
      this.setData({
        PayStatus:0,
      })
    }
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
  //查看订单
  toOrderList(){
    wx.navigateTo({
      url: '/pages/OrderList/OrderList',
    })
  },
  //返回首页
  toIndex() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  //重新支付
  Repayment(){
    // wx.navigateTo({
    //   url: '/pages/PlaceOrder/PlaceOrder',
    // })
    let _this=this;
    let session3rd = wx.getStorageSync('session');
    
    wx.request({
      url: basepath + '?service=Pay.RePay&XDEBUG_SESSION_START=18357',
      method: "post",
      data:

        {
          pay_id: _this.data.pay_id,
          session3rd: session3rd,
        },
      dataType: 'json',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res);
        if (res.data.data.code) {
          _this.wxpay(res.data.data.info);
        } else {

        }

      }
    })
  },
  //调起微信支付
  wxpay(rs) {
    wx.requestPayment({
      'timeStamp': rs.timeStamp,
      'nonceStr': rs.nonceStr,
      'package': rs.package,
      'signType': 'MD5',
      'paySign': rs.paySign,
      'success': function (rs) {
        console.log(rs)
        if (rs.errMsg == 'requestPayment:ok') {
          wx.hideLoading();
          wx.navigateTo({
            url: '/pages/PayResult/PayResult?result=1',
          })
        }
      },
      'fail': function (rs) {
        wx.hideLoading();
      },
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