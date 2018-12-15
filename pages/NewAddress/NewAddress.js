// pages/NewAddress/NewAddress.js
const app = getApp()
var basepath = app.basePath;
const { $Toast } = require('../../iview/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //收货地址
    region: ['北京市', '北京市', '东城区'],
    switch1: 0,
    name:'',
    phone:'',
    address:'',
    detailAddress:'',
    status:0,
    userid:'',
    openid:'',
    //修改是1  插入是0
    write:0,
    session3rd:'',
    //用户id
    menberid:''
  },
  //获取收货人姓名
  name_input:function(e){
 
   this.data.name =e.detail.value;
    console.log(this.data.name);
  },
  //获取手机号
  tel_input: function (e) {

    this.data.phone = e.detail.value;
    console.log(this.data.phone);
  },
  //获得详细地址
  detailAddress_input:function(e){
     this.data.detailAddress=e.detail.value
    console.log(this.data.detailAddress);
  },
  //点击保存按钮
  commite(){
    console.log(this.data.region[1])
    //验证填写信息
  
    if (this.data.name.length == 0) {
      console.log("请输入姓名")
      $Toast({
        content: '姓名输入错误',
        type: 'warning'
      });
      return
    }   
    if (this.data.phone.length != 11) {
      console.log("手机号输入错误")
      $Toast({
        content: '手机号错误',
        type: 'warning'
      });
      return
    }
    if (this.data.detailAddress.length == 0) {
      console.log("详细地址错误")
      $Toast({
        content: '详细地址错误',
        type: 'warning'
      });
      return
    } 
    // 发起请求存入数据库
    //插入新地址 
   if(this.data.write == 0){
     console.log("插入地址")
     wx.request({
       url: basepath, // 仅为示例，并非真实的接口地址
       data: {
         service: 'MyAddresss.InsertMyAddresss',
         consignee_name: this.data.name,
         address: this.data.detailAddress,
         consignee_phone: this.data.phone,
         member_id: this.data.userid,
         openid: this.data.openid,
         city: this.data.region[1],
         county: this.data.region[2],
         province: this.data.region[0],
         state: this.data.status,
         session3rd:this.data.session3rd,
       },
       dataType: 'json',
       method: 'POST',
       header: {
         'content-type': 'application/x-www-form-urlencoded'
       },
       success(res) {
         console.log(res.data)
         if(res.data.data.code ==1){
          //  wx.setStorageSync("id", data)
           wx.navigateBack({

           })
           
         }else{ 
           $Toast({
             content: '保存失败，请检查填写是否正确',
             type: 'warning'
           });
         }
        
         
       }
     })
   }else{
     console.log("修改地址")
     wx.request({
       url: basepath, // 仅为示例，并非真实的接口地址
       data: {
         service: 'MyAddresss.UpdateAddressById',
         id: this.data.menberid,
         consignee_name: this.data.name,
         address: this.data.detailAddress,
         consignee_phone: this.data.phone,
         member_id: this.data.userid,
         city: this.data.region[1],
         county: this.data.region[2],
         province: this.data.region[0],
         state: this.data.status
       },
       dataType: 'json',
       method: 'POST',
       header: {
         'content-type': 'application/x-www-form-urlencoded'
       },
       success(res) {
         console.log(res.data)
         if (res.data.ret == 400) {
           $Toast({
             content: '保存失败，请检查填写是否正确',
             type: 'warning'
           });
         } else {
           wx.navigateBack({
             id:1
           })
         }
       }
     })
   }
    // if()
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.write = options.title
    console.log(options)
    this.data.menberid = options.addressid
    console.log(this.data.menberid)
    
   //获取用户的openid
   var that =this
    wx.getStorage({
      key: 'session',
      success: function (res) {
        that.setData({
          session3rd :res.data
        })
         
        console.log(res)
        wx.request({
          url: basepath, // 仅为示例，并非真实的接口地址
          data: {
            service: 'login.Index',
            session3rd: res.data
          },
          dataType: 'json',
          method: 'POST',
          header: {
            'Content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success(res) {
            console.log(res)
            that.data.userid = res.data.data.info.id;
            that.data.openid = res.data.data.info.openid
          }
        })
      }
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
    var that =this
    const detail = event.detail;
    this.setData({
      'switch1': detail.value
    })
    console.log(this.data.switch1)
    if (this.data.switch1){
      that.data.status =1
      console.log(this.data.status)
    }else{
      that.data.status=0
      console.log(this.data.status)
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