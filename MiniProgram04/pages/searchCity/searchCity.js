// pages/searchCity/searchCity.js
var http=require('../../utils/http.js');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotCity:[],//热门城市
    longitude:"113.214520",
    latitude:"23.099994"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取热门城市
    http('get','/api/hot/city',{},'',res=>{
      console.log(res);
      this.setData({
        hotCity:res.data
      })
    })
  },
  // 点击定位，获取当前的经纬度显示所在城市
  getLocation:function(){
    //小程序的API获取当前的位置
    wx.getLocation({
      success:(res)=>{
        console.log(res);
        var latitude = res.latitude;
        var longitude = res.longitude;
        // this.setData({
        //   latitude:latitude,
        //   longitude:longitude
        // })
        //显示经纬度位置 城市
        wx.request({
          url: 'http://iwenwiki.com:3002/api/lbs/location',
          data:{
            latitude:latitude,
            longitude:longitude
          },
          success:result=>{
            console.log(result.data.result.ad_info.city);
            var cityName = result.data.result.ad_info.city.slice(0,2);
            
            app.globalData.cityName = cityName;
            //数据存储到本地，下次进入可以直接获取本地数据
            wx.setStorageSync('cityName', cityName)
            console.log(app);
            wx.switchTab({
              url: '../food/food',
            })
          }
        })
      }
    })
  },
  //点击城市按钮，切换当前城市，跳转页面
  selectCity:function(e){
    var cityName=e.currentTarget.dataset.name;
    app.globalData.cityName=cityName;
    wx.setStorageSync('cityName', cityName);
    wx.switchTab({
      url: '../food/food',
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