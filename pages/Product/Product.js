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
  },

  goToOrderSubmit(){
    let product = this.data.product;
    product.count=this.data.count;
    wx.setStorageSync('product', product);
    wx.navigateTo({
      url: '/pages/PlaceOrder/PlaceOrder',
    })
  },

  orderPay(e) {
    if (e.detail.errMsg != 'getUserInfo:ok') {
      return;
    }

    wx.showLoading({
      title: '下单中...',
      mask: true,
    })
    let that = this;
    console.log(that.data.address)
    if (!that.data.address) {
      wx.showToast({
        title: '请添加收货地址!',
        icon: 'none',
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '../me/me',
        })
      }, 2000);
      return false;
    }

    wx.getStorage({
      key: 'session',
      success: function(res) {
        let session3rd = res.data;
        console.log(that.data);
        wx.request({
          url: basepath + '?service=ProductOrder.orderPay&XDEBUG_SESSION_START=17019',
          method: 'POST',
          dataType: 'json',
          header: {
            'Content-type': 'application/x-www-form-urlencoded'
          },

          data: {
            "session3rd": session3rd,
            "commodityName": that.data.product.name,
            "commodityPrice": that.data.level == 1 ? that.data.product.market_price : that.data.product.agent_price,
            "commodityNum": that.data.count,
            "membersId": that.data.member.id,
            "shippingAddress": that.data.address.address,
            "province_code": that.data.address.map_code,
            "province_name": that.data.address.province,
            "product_id": that.data.product.id,
          },
          success: function(rs) {
            if (rs.data.data.code == 1) {
              wx.hideLoading();

              wx.requestPayment({
                'timeStamp': rs.data.data.info.timeStamp,
                'nonceStr': rs.data.data.info.nonceStr,
                'package': rs.data.data.info.package,
                'signType': 'MD5',
                'paySign': rs.data.data.info.paySign,
                'success': function(rs) {
                  console.log(rs)

                  if (rs.errMsg == 'requestPayment:ok') {
                    wx.navigateTo({
                      url: '../me/me',
                    })
                  }
                },
                'fail': function(rs) {
                  if (rs.errMsg == 'requestPayment:fail cancel') {} else {
                    wx.showToast({
                      title: '支付失败!',
                    })
                  }
                }
              })

            } else if (rs.data.data.code == 2) {
              wx.showToast({
                title: '库存不足!',
              })
            } else {
              wx.showToast({
                title: '生成订单失败!',
              })
            }
          },

        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log(options);
    if (options.id) {
      this.setData({
        id: options.id
      })
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

    this.getProduct();

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

  },


})