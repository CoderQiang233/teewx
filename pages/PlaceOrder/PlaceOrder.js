// pages/PlaceOrder/PlaceOrder.js

const app = getApp()
var basepath = app.basePath;
var imagepath = app.imagepath;
const { $Toast } = require('../../iview/base/index');
var util= require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: '',
    imagepath: imagepath,
    address: { consignee_name:'请选择收货地址'},
    memberBalance:0,
    total:0,
    balance_pay:0,
    cash_pay:0,
    totalBefore:0,
    balanceChecked:false
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
    this.getMemberBalance();
  },
  // 获取用户余额信息
  getMemberBalance(){
    let that = this;
    wx.request({
      url: basepath + '?service=Member.GetMemberBalance',
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
            memberBalance: res.data.data.info
          })
        }
      }
    })
  },
  // 用户使用余额按钮
  onBalanceChange: function (event){
    this.setData({ balanceChecked: event.detail });
    let balance = this.data.memberBalance;
    let total = this.data.total;
    wx.showLoading({
      title: '请稍等',
    })
    if (event.detail){
      if(balance<total){
        let cash_pay =util.numSub(total,balance)
        this.setData({
          balance_pay: balance,
          cash_pay: cash_pay
        })
        wx.hideLoading();
        
      }else{
        this.setData({
          balance_pay: total,
          cash_pay: 0
        })
        wx.hideLoading();
        
      }
    }else{
      
      this.setData({
        cash_pay: total,
        balance_pay:0
      })
      wx.hideLoading();
    }
  },
  //获取商品信息及数量
  getShop() {
    let product = wx.getStorageSync('product')
    this.setData({
      product: product,
      total: product.market_price * product.count,
      cash_pay: product.market_price * product.count,
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
      let session3rd = wx.getStorageSync('session');
     
      let products = {
        product_id: that.data.product.product_id,
        name: that.data.product.name,
        quantity: that.data.product.count,
        price: that.data.product.market_price,
        total: that.data.product.market_price * that.data.product.count,
        first_picture: that.data.product.first_picture,
      }
      // 获取商品推荐人

      if (wx.getStorageSync('promoter')) {
        let promoter = JSON.parse(wx.getStorageSync('promoter'));
        if (promoter.product == that.data.product.product_id){
          products.promoter = promoter.promoterId;
        }
      }
      if(this.data.cash_pay==0){
        wx.request({
          url: basepath + '?service=Pay.AddOrderZero&XDEBUG_SESSION_START=18357',
          method: "post",
          data:

            {
              products: JSON.stringify(products),
              shipping_address: address,
              receiver_name: that.data.address.consignee_name,
              receiver_phone: that.data.address.consignee_phone,
              total: that.data.total,
              session3rd: session3rd,
              province_name: that.data.address.province,
              balance_pay: that.data.balance_pay,
              cash_pay: that.data.cash_pay
            },
          dataType: 'json',
          header: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            console.log(res);
            if (res.data.data.code) {
              wx.navigateTo({
                url: '/pages/PayResult/PayResult?result=1&pay_id=' + res.data.data.pay_id,
              })
            } else {

            }

          }
        })
      }else{
        wx.request({
          url: basepath + '?service=Pay.AddOrder&XDEBUG_SESSION_START=18357',
          method: "post",
          data:

            {
              products: JSON.stringify(products),
              shipping_address: address,
              receiver_name: that.data.address.consignee_name,
              receiver_phone: that.data.address.consignee_phone,
              total: that.data.total,
              session3rd: session3rd,
              province_name: that.data.address.province,
              balance_pay: that.data.balance_pay,
              cash_pay: that.data.cash_pay
            },
          dataType: 'json',
          header: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            console.log(res);
            if (res.data.data.code) {
              that.wxpay(res.data.data.info, res.data.data.pay_id);
            } else {

            }

          }
        })
      }
      
    }
  },
  //调起微信支付
wxpay(rs,pay_id){
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
        wx.removeStorageSync('address')
        wx.removeStorageSync('product')
        wx.removeStorageSync('promoter')
        
          wx.navigateTo({
            url: '/pages/PayResult/PayResult?result=1&pay_id=' + pay_id,
          })
      }
    },
    'fail': function (rs) {
      wx.hideLoading();
        wx.navigateTo({
          url: '/pages/PayResult/PayResult?result=0&pay_id=' + pay_id,
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