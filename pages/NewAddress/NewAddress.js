// pages/NewAddress/NewAddress.js
const app = getApp()
var basepath = app.basePath;
const {
  $Toast
} = require('../../iview/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['北京市', '北京市', '东城区'],
    Name:"",
    Phone:'',
    AddressDetail:'',
    status:0,
    type:1,//1是新增2是修改
    member_id:0,
    addressid:'',
    switch1:false,
    wxaddress:'',
  
  },
  
  //点击保存按钮
  commite() {
    this.checkInput().then((res)=>{
      if(res){
        if(this.data.type==1){
          this.insertAddress();
        } 
        if(this.data.type==2){
         this.updataAddress();
        }
      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.type){
      this.setData({
        type: options.type,
      })
    }
    if (options.addressid){
      this.setData({
        type: 2,
        addressid: options.addressid,
      })
    }
    if (options.wxaddress){
      console.log(JSON.parse(options.wxaddress));
      let wxaddress = JSON.parse(options.wxaddress);
      this.setData({
        type: 1,
        region: [wxaddress.provinceName, wxaddress.cityName, wxaddress.countyName],
        Name: wxaddress.userName,
        Phone: wxaddress.telNumber,
        AddressDetail: wxaddress.detailInfo,
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
    this.getUserId();
    if(this.data.addressid!=''){
      this.getaddress();
    }

  },
  //收货人姓名
  setName(e){
    this.setData({
      Name: e.detail.value
    })
  },
  //手机号
  setPhone(e) {
    this.setData({
     Phone: e.detail.value
    })
  },
  //详细地址
  setAddressDetail(e) {
    this.setData({
      AddressDetail: e.detail.value
    })
  },

  //获取用户id
  getUserId() {
    var that = this
    let session = wx.getStorageSync('session');
    wx.request({
      url: basepath,
      data: {
        service: 'login.Index',
        session3rd: session
      },
      dataType: 'json',
      method: 'POST',
      header: {
        'Content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        let info = res.data.data.info;
        if(res.data.data.code==1){
          that.setData({
            member_id: info.id,
          })
        }
      }
    })
  },

  //省市区选择器选择方法
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  //默认地址开关
  onChange(e) {
    this.setData({
      switch1: e.detail.value,
      status: e.detail.value==true?1:0,
    })
  },
  //验证方法
  checkInput(){
    return new Promise((res, rej)=>{
      let result=true;
      if(this.data.Name.length==0){
        $Toast({
          content: '请填写收货人姓名',
          type: 'warning',
          mask:false,
        });
        result=false;
      }
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(this.data.Phone)) {
        $Toast({
          content: '请填写正确的手机号',
          type: 'warning',
          mask: false,
        });
        result = false;
      }
      if (this.data.AddressDetail.length == 0) {
        $Toast({
          content: '请填写详细收货地址',
          type: 'warning',
          mask: false,
        });
        result = false;
      }
      res(result);
    })
  },
  //新增地址接口调用
  insertAddress(){
    var that=this;
    var data=that.data;
    wx.request({
      url: basepath,
      data: {
        service: 'MyAddresss.insertMyAddresss',
        session3rd: wx.getStorageSync('session'),
        consignee_name: data.Name,
        address:data.AddressDetail,
        consignee_phone:data.Phone,
        member_id:data.member_id,
        city: data.region['1'],
        county: data.region['2'],
        province:data.region['0'],
        state: data.status,

      },
      dataType: 'json',
      method: 'POST',
      header: {
        'Content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res)
        if(res.data.data.code==1){
          wx.redirectTo({
            url: '/pages/AddressList/AddressList',
          })
        }

      }
    })
  },
  //获取地址信息
  getaddress(){
    var that = this;
    var data = that.data;
    wx.request({
      url: basepath,
      data: {
        service: 'MyAddresss.findAddressById',
        id: data.addressid
      },
      dataType: 'json',
      method: 'POST',
      header: {
        'Content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res)
        let info=res.data.data.info;
        if (res.data.data.code == 1) {
          that.setData({
            region: [info.province, info.city, info.county],
            Name: info.consignee_name,
            Phone: info.consignee_phone,
            AddressDetail: info.address,
            switch1: info.state==1?true:false,
          })
        }

      }
    })
  },
  //修改地址接口调用
  updataAddress(){
    var that = this;
    var data = that.data;
    wx.request({
      url: basepath,
      data: {
        service: 'MyAddresss.updateAddressById',
        id:data.addressid,
        consignee_name: data.Name,
        address: data.AddressDetail,
        consignee_phone: data.Phone,
        member_id: data.member_id,
        city: data.region['1'],
        county: data.region['2'],
        province: data.region['0'],
        state: data.status,

      },
      dataType: 'json',
      method: 'POST',
      header: {
        'Content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.data.code == 1) {
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },
  //一键导入微信地址
  chooseWxAddress(){
    let that=this;
    wx.chooseAddress({
      success(res) {
        let wxaddress=res;
        that.setData({
          type: 1,
          region: [wxaddress.provinceName, wxaddress.cityName, wxaddress.countyName],
          Name: wxaddress.userName,
          Phone: wxaddress.telNumber,
          AddressDetail: wxaddress.detailInfo,
        })
      }
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