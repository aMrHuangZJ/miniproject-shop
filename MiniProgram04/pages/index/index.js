// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:0,//选中下标
    bannerArr:[],//轮播图数据
    list:[],//首页的列表信息
  },
  // 轮播自动播放修改的时候触发
  swiperChange:function(e){
    this.setData({
      currentIndex:e.detail.current
    })
  },
  //页面列表跳转
  indexDetail:function(e){
    //获取当前点击的元素的值，点击的唯一标识id
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../indexDetail/indexDetail?itemId='+e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    //进入页面，请求轮播数据，获取小程序API网络接口
    wx.request({
      url: 'http://iwenwiki.com:3002/api/banner',
      success:res=>{
        if(res.data.status==200){
         // console.log(res.data.data);
          this.setData({
            bannerArr:res.data.data
          })         
        }
      }
    })
//获取页面下一部分的推荐信息
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: 'http://iwenwiki.com:3002/api/indexlist',
      success:res=>{
        wx.hideLoading();
        if(res.data.status==200){
         // console.log(res.data.data);
          this.setData({
            list:res.data.data
          })         
        }
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