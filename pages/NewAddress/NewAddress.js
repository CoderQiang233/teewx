// pages/NewAddress/NewAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['北京市', '北京市', '东城区'],
    switch1: 0,
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

  //省市区选择器选择方法
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(e)
    this.setData({
      region: e.detail.value
    })
  },
  //默认地址开关
  onChange(event) {
    const detail = event.detail;
    this.setData({
      'switch1': detail.value
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