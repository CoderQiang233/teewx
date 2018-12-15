// pages/PayResult/PayResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PayStatus:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
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
  Repayment(){
    wx.navigateTo({
      url: '/pages/PlaceOrder/PlaceOrder',
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