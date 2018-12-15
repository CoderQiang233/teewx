// components/categoryProducts/categoryProducts.js
const app = getApp()
var basepath = app.basePath;
var imagepath = app.imagepath;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    setting: null,
    text: String,
    imgsrc: String,
    products:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    imagepath
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoProduct:function(e){
      console.log(e.currentTarget.dataset.product_id)
    }
  }
})
