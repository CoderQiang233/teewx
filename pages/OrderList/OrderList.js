// pages/OrderList/OrderList.js
const app = getApp()
var imagepath =app.imagepath;
var basepath = app.basePath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    message:[],
    imagepath:imagepath
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.setData({
      current: options.current,
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
    this.getAllorderList(this.data.current)

  
  },
  getAllorderList(current){
  
    var that = this
    console.log(this.data.current)
    if (this.data.current == "all") {
      wx.request({
        url: basepath, // 仅为示例，并非真实的接口地址
        data: {
          service: 'ProductOrder.GetOrderBySession',
          session3rd: wx.getStorageSync('session'),
        },
        dataType: 'json',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          console.log(res.data, "我是全部的列表")
         
          that.setData({
            message: res.data.data.info
          })

        }
      })
    } else {      //各状态的订单列表
      wx.request({
        url: basepath, // 仅为示例，并非真实的接口地址
        data: {
          service: 'ProductOrder.GetOrderBySession',
          session3rd: wx.getStorageSync('session'),
          status: that.data.current
        },
        dataType: 'json',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          console.log(res.data, "我是第" + that.data.current)
          that.setData({
            message: res.data.data.info,

          })

        }
      })
    }

  },
  //tab点击方法
  handleChange({ detail }) {
    console.log(detail)
    this.setData({
      current: detail.key
    });
    this.getAllorderList(this.data.current)
  },
  //获取用户订单
  getUserOredr(){
    
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