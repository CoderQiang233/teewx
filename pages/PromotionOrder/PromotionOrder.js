const app = getApp()
var basepath = app.basePath;
var imagepath = app.imagepath;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderlist:[],
    imagepath:imagepath,
    loading:true,
    show:true,
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
    this.setData({
      loading:true
    })
    this.getOrder();
  },

  //获取用户推广订单
  getOrder(){
    let that=this;
    wx.request({
      url: basepath + '?service=PromotionCenter.GetOrder',
      dataType: 'json',
      method: 'post',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        session: wx.getStorageSync('session')
      },
      success: function (rs) {
        that.setData({
          loading: false,
          show:true,
        })
        let code=rs.data.data.code;
        let info=rs.data.data.info;
        if(code==1){
          that.setData({
            orderlist:info,
            show: false,
          })
        }else{
          that.setData({
            show: true,
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