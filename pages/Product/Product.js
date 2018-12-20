// pages/product/product.js
const app = getApp()
var basepath = app.basePath;
var imagepath = app.imagepath;
const WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 100,
    imagepath: imagepath,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    product: {},
    count: 1,
    user:false,
    is_promoter:0
  },
//点击立即购买
  goToOrderSubmit(){
    if(this.data.user==false){
      wx.showModal({
        title: '请先登陆',
        content: '点击确定跳转登陆页',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          } else if (res.cancel) {
            return
          }
        }
      })
    }else{
    let product = this.data.product;
    product.count=this.data.count;
    wx.setStorageSync('product', product);
    wx.navigateTo({
      url: '/pages/PlaceOrder/PlaceOrder',
    })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var promoterId = 409;
    console.log(options);
    if (options.id) {
      this.setData({
        id: options.id
      })
      if (options.promoterId){
       var promoter={
         'product': options.id,
         'promoterId': options.promoterId
       }
        wx.setStorage({
          key: "promoter",
          data: JSON.stringify(promoter)
        })
      }
    }

    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.checkUser();
    this.getProduct();

  },
  //查看用户是否已经注册
  checkUser(){
    var that = this;
    wx.request({
      url: basepath + '?service=Login.Index',
      dataType: 'json',
      method:'post',
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
            is_promoter: rs.data.data.info.is_promoter,
            member_id:rs.data.data.info.id
          })
        }else{
          that.setData({
            user: false
          })
        }
      }
    })
  },
  //获取商品信息
  getProduct() {
    var that = this;
    wx.request({
      url: basepath + '?service=Product.GetProudct',
      dataType: 'json',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "id": this.data.id
      },
      success: function(rs) {
        console.log(rs.data.data.info);
        if (rs.data.data.code == 1) {
          that.setData({
            product: rs.data.data.info
          })
          WxParse.wxParse('article', 'html', rs.data.data.info.detail, that, 5);
        }
      }
    })
  },

  //商品数量修改方法
  handleChange: function({
    detail
  }) {
    this.setData({
      count: detail.value
    })
  },

  // 点击推广按钮
  goToPromotion:function(){
    console.log(123)
    if(this.data.user){
      if(this.data.is_promoter==1){
// 用户为推客
        console.log(233)
        this.onShareAppMessage;
      }else{
// 用户非推客
        wx.navigateTo({
          url: '/pages/PromotionRules/PromotionRules',
        })
      }
    }else{
      // 用户未注册
      wx.navigateTo({
        url: '/pages/PromotionRules/PromotionRules',
      })
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    if(this.data.user){
      if(this.data.is_promoter==1){
        return {
          title: this.data.product.name,
          path: '/pages/Product/Product?id=' + this.data.product.product_id +'&promoterId='+this.data.member_id
        }
      }else{
        return {
          title: this.data.product.name,
          path: '/pages/Product/Product?id=' + this.data.product.product_id 
        }
      }
      
    }else{
      return {
        title: this.data.product.name,
        path: '/pages/Product/Product?id=' + this.data.product.product_id
      }
    }
      
  },


})