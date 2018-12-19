// pages/PlaceOrder/PlaceOrder.js

const app = getApp()
var basepath = app.basePath;
var imagepath = app.imagepath;
const { $Toast } = require('../../iview/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: '',
    imagepath: imagepath,
    address: { consignee_name:'请选择收货地址'},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
     
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
    this.getShop();
    this.getUserAddress();
  },

  //获取商品信息及数量
  getShop() {
    this.setData({
      product: wx.getStorageSync('product'),
    })
  },
  //获取用户收货地址
  getUserAddress() {
    let address = wx.getStorageSync('address')
    if (address) {
      console.log(address);
      this.setData({
        address: address
      })
    } else {
      this.getAddressBySession();
    }

  },
  //通过session获取用户收货地址
  getAddressBySession() {
    let that = this;
    wx.request({
      url: basepath + '?service=MyAddresss.GetDefaultAddress',
      method: "post",
      data: {
        session3rd: wx.getStorageSync("session")
      },
      dataType: 'json',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res);
        let code = res.data.data.code
        if (code == 1) {
          that.setData({
            address: res.data.data.info
          })
        }
      }
    })
  },
  //选择收货地址
  checkAddress() {
    wx.navigateTo({
      url: '/pages/AddressList/AddressList',
    })
  },
  //提交订单
  submitOrder(){
    console.log(1);
    wx.showLoading({
      title: '订单提交中',
      mask:true
    })
    let that=this;
    if(!this.data.address){
      wx.hideLoading();
      $Toast({
        content: '请选择收货地址',
        type: 'warning'
      });
    }else{
      console.log(that.data.address);
      let address = that.data.address.province + that.data.address.city + that.data.address.county + that.data.address.address;
      let session3rd=wx.getStorageSync('session');
      wx.request({
        url: basepath + '?service=Pay.AddOrder',
        method: "post",
        data:
        
        {
          product:{
            product_id: that.data.product.product_id,
            name: that.data.product.name,
            quantity: that.data.product.count,
            price: that.data.product.market_price,
            total: that.data.product.market_price * that.data.product.count,
            first_picture: that.data.product.first_picture,
          }
        },
        dataType: 'json',
        header: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          console.log(res);
         
          that.wxpay(res);
        }
      })
    }
  },
  //调起微信支付
wxpay(rs){
  wx.requestPayment({
    'timeStamp': rs.data.data.info.timeStamp,
    'nonceStr': rs.data.data.info.nonceStr,
    'package': rs.data.data.info.package,
    'signType': 'MD5',
    'paySign': rs.data.data.info.paySign,
    'success': function (rs) {
      console.log(rs)
      if (rs.errMsg == 'requestPayment:ok') {
        wx.hideLoading();
        wx.clearStorageSync('address')
        wx.clearStorageSync('product')
          wx.navigateTo({
            url: '/pages/PayResult/PayResult?result=1',
          })
      }
    },
    'fail': function (rs) {
      wx.hideLoading();
        wx.navigateTo({
          url: '/pages/PayResult/PayResult?result=0',
        })
    },
  })
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

  }
})