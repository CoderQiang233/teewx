// pages/OrderDetail/OrderDetail.js
const app = getApp()
var imagepath = app.imagepath;
var basepath = app.basePath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pay_id:'',
    product:'',
    imagepath:imagepath
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.pay_id){
      this.setData({
        pay_id: options.pay_id,
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
    this.getOrderDetail();
  },
  //通过pay_id获取订单信息
  getOrderDetail(){
    let that=this;
    wx.request({
      url: basepath, 
      data: {
        service: 'ProductOrder.OrderByPayID',
        pay_id: that.data.pay_id,
      },
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res);
        if (res.data.data.code==1){
          that.setData({
            product: res.data.data.info
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