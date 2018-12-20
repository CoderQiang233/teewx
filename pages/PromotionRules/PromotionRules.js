// pages/PromotionRules/PromotionRules.js
const app = getApp()
var basepath = app.basePath;
var imagepath = app.imagepath;
import Toast from '../../vant/toast/toast';
import Dialog from '../../vant/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagepath: imagepath,
    user: false,
    is_promoter:0
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
    this.checkUser();

  },
  //查看用户是否已经注册
  checkUser() {
    var that = this;
    wx.request({
      url: basepath + '?service=Login.Index',
      dataType: 'json',
      method: 'post',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        session3rd: wx.getStorageSync('session')
      },
      success: function (rs) {
        console.log(rs);
        if (rs.data.data.code == 1) {
          that.setData({
            user: true,
            is_promoter: rs.data.data.info.is_promoter
          })
        } else {
          that.setData({
            user: false
          })
        }
      }
    })
  },
  // 立即加入
  joinPromotion:function(){
    if(this.data.user){
      if(this.data.is_promoter==0){
        var that = this;
        wx.request({
          url: basepath + '?service=Member.JoinPromotion',
          dataType: 'json',
          method: 'post',
          header: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            session3rd: wx.getStorageSync('session')
          },
          success: function (rs) {
            console.log(rs);
            if (rs.data.data.code == 1) {
              Dialog.alert({
                title: '加入成功',
                message: '恭喜您成功加入推客俱乐部，现在您可以推广商品赚取佣金啦！'
              }).then(() => {
                wx.navigateBack({
                  delta: 1
                })
              });
              
            } else {
              
            }
          }
        })
      }
    }else{
      wx.navigateTo({
        url: '/pages/login/login?from=promotion',
      })
    }
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