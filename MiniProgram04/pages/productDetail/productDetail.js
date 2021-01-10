// pages/productDetail/productDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productInfo:{},//页面的 数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    // 请求接口
    wx.request({
      url: 'http://iwenwiki.com:3002/api/foods/list/detail',
      data:{
        id:options.itemId
      },
      success:res=>{
        console.log("数据",res.data);
        this.setData({          
          productInfo:res.data.data[0]
        })
      }
    })
  },
  //加入购物车
  addShop:function(){
    console.log('添加数据到购物车');
    var productInfo=this.data.productInfo;
    wx.request({
      url: 'http://iwenwiki.com:3002/api/cart/add',
      data:{
        name:productInfo.name,
        pic:productInfo.pic,
        num:1,
        info:productInfo.description,
        price:productInfo.price
      },
      success:res=>{
        console.log('添加数据',res.data);
        if(res.data.status==200){
          wx.showToast({
            title: '添加成功',
            icon:'none'
          })
        }
      }
    })
  },
  //点击进入购物车
  goShop:function(){
    wx.switchTab({
      url: '../myCart/myCart',
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