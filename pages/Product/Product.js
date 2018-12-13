// pages/product/product.js
const app = getApp()
var basepath = app.basePath;
const WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:1,
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    home_img: '/assets/images/home.png',
    product: {
      name: '福建安溪黑茶', price:888
    },
    level: '',
    count: 1,
    member: {
      productp:360
    },
    address: {},
  },
 
  handleChange: function ({ detail }) {
    this.setData({
      count: detail.value
    })
  },
  // tapName() {
  //   wx.navigateTo({
  //     url: "../securitycode/securitycode",
  //   })
  // },
  //购买
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
      success: function (res) {
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
          success: function (rs) {
            if (rs.data.data.code == 1) {
              wx.hideLoading();

              wx.requestPayment({
                'timeStamp': rs.data.data.info.timeStamp,
                'nonceStr': rs.data.data.info.nonceStr,
                'package': rs.data.data.info.package,
                'signType': 'MD5',
                'paySign': rs.data.data.info.paySign,
                'success': function (rs) {
                  console.log(rs)

                  if (rs.errMsg == 'requestPayment:ok') {
                    wx.navigateTo({
                      url: '../me/me',
                    })
                  }
                },
                'fail': function (rs) {
                  if (rs.errMsg == 'requestPayment:fail cancel') {
                  } else {
                    wx.showToast({
                      title: '支付失败!',
                    })
                  }
                }
              })

            } else if (rs.data.data.code == 2){
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
  onLoad: function (options) {

    console.log(options);
    if(options.id){
      this.setData({
        id: options.id
      })
    }
   

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  checkmember:function(){

    let _this = this;
    //获取会员信息
    wx.getStorage({
      key: 'session',
      success: function (res) {

        let session3rd = res.data;

        wx.request({
          url: basepath + '?service=Product.GetByOpenId',
          method: 'POST',
          dataType: 'json',
          header: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          data: { "session3rd": session3rd },
          success: function (rs) {
            console.log(rs)
            if (rs.data.data.code == 1 && rs.data.data.info) {
              _this.setData({
                level: rs.data.data.info.level,
                member: rs.data.data.info
              })

            }else{
              
                //没有查到会员信息的时候，查看时候有未完成订单
                wx.request({
                  url: basepath + '?service=Pay.findMemOrderBySession3rd',
                  method: 'POST',
                  dataType: 'json',
                  header: {
                    'Content-type': 'application/x-www-form-urlencoded'
                  },
                  data: {
                    "session3rd": session3rd
                  },
                  success(res) {
                    console.log(res);
                    if (res.data.data.code == 1) {
                      
                      wx.showModal({
                        title: '提示',
                        content: '您的注册订单尚未完成，是否立即完成？',
                        showCancel: false,
                        success: function (res) {
                          if (res.confirm) {
                            wx.redirectTo({
                              url: '/pages/paypage/paypage?info=' + JSON.stringify(res.data.data.info),
                            })
                          }
                        }
                      })

                    } else if (res.data.data.code == 0) {
                      wx.showModal({
                        title: '提示',
                        content: '是否立即注册为志梨国际会员？',
                        showCancel: false,
                        success: function (res) {
                          if (res.confirm) {
                            wx.redirectTo({
                              url: '/pages/register/register',
                            })
                          }
                        }
                      })
                    }
                  }
                })


                

            }
          }
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {


    this.checkmember();

    let _this = this;


    //获取商品信息
    wx.request({
      url: basepath + '?service=Product.GetById',
      dataType: 'json',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: { "id": this.data.id },
      success: function (rs) {
        console.log(rs);

        if (rs.data.data.code == 1) {

          _this.setData({
            product: rs.data.data.info
          })

          WxParse.wxParse('article', 'html', rs.data.data.info.detail, _this, 5);
        }


      }
    })
  


    //获取收货地址
    wx.getStorage({
      key: 'session',
      success: function (res) {

        let session3rd = res.data;

        wx.request({
          url: basepath + '?service=MyAddresss.GetMyAddresssBySession3rd',
          method: 'POST',
          dataType: 'json',
          header: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          data: { "session3rd": session3rd },
          success: function (rs) {
            console.log(rs);
            if (rs.data.data.code == 1) {

              _this.setData({
                address: rs.data.data.info
              })
            } else {
              _this.setData({
                address: false
              })
            }
          }
        })
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

  },


})