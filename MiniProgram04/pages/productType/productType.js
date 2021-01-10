// pages/productType/productType.js
var http=require('../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],//分类的数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('进入产品分类页',options);
    var num=parseInt(options.itemId);
    http('get','/api/foods/list/type',{type:num-1},'',(res)=>{
      console.log(res);
      this.setData({
        list:res.data
      })
       
     },(error)=>{
       console.log(error);
     })
  },

  //点击进入详情
  productDetail:function(e){
    wx.navigateTo({
      url: '../productDetail/productDetail?itemId='+e.currentTarget.dataset.id,
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