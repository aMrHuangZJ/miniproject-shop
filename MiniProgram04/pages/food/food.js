// pages/food/food.js
// 引入模块
var productData=require('../../utils/productData.js');
var http=require('../../utils/http.js');
var app=getApp();

//console.log(productData);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location:"上海",
    productType:productData,
    list:[],//列表数据
    num:1,//请求页面的数据的page页码
    isShow:false,//控制“点击加载更多”按钮
    moreInfo:'',//加载更多提示信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //进入页面获取当前食疗坊的列表数据
   // console.log(http);

   //进入页面获取本地存储，查看是否有之前选择的 城市，没有就默认
   var cityName=wx.getStorageSync('cityName');
   if(cityName){
     this.setData({
       location:cityName
     })
   }

   //封装网络请求
// 参数:method(请求类型)  url  params（请求携带参数） message（信息弹框内容）  success  fail
   http('get',
   '/api/foods/list',
   {
    city:this.data.location,
    page:this.data.num
   },
   '数据加载中',
   (res)=>{
    // console.log(res.data.result);
     this.setData({
       list:res.data.result
     })
   },
   function(error){
     console.log(error);
   })
   //-------------------------
    // wx.request({
    //   url: 'http://iwenwiki.com:3002/api/foods/list',
    //   data:{
    //     city:this.data.location,
    //     page:this.data.num
    //   },
    //   success:res=>{
    //     if(res.data.status==200){
    //       //console.log(res.data.data.result);
    //       this.setData({
    //         list:res.data.data.result,
    //         isShow:true
    //       })
    //     }
    //   }
    // })
    //--------------------
  },

  //点击产品分类进入对应的产品分类的列表信息展示
  productType:function(e){
    // console.log(e);
    wx.navigateTo({
      url: '../productType/productType?itemId='+e.currentTarget.dataset.mark,
    })
  },

  // 点击列表信息进入列表产品详情页
  productDetail:function(e){
   // console.log(e.currentTarget.dataset.id);
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
    console.log('页面显示');
    console.log(app);
    //重新修改data 
   if(app.globalData.cityName){//全局有值
     this.setData({
       location: app.globalData.cityName,
       num: 1
     })
     //获取全局的变量的切换城市数据
     //再次请求对应的城市的页面数据
     wx.request({
       url: 'http://iwenwiki.com:3002/api/foods/list',
       data: {
         city: app.globalData.cityName,
         page: 1
       },
       success: res => {
         if (res.data.status == 200) {
           console.log(res.data.data.result);
           this.setData({
             list: res.data.data.result,
             isShow: true
           })
         }
       }
     })

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
    //下拉刷新信息，需要配置json文件，开启下拉
    console.log('下拉刷新')
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //下拉到底部，加载更多数据
   // console.log('下拉到底部')
    this.data.num++;
    http('get',
    '/api/foods/list',
    {
      city:this.data.location,
      page:this.data.num
     },
     '数据加载中',
     (res)=>{
       //console.log(res.data.result);
       this.setData({
         list:res.data.result
       })
     },
     (error)=>{
       console.log(error);
       this.setData({
          moreInfo:'我是有底线的'
        })
     })
    //-------------------------
    // wx.request({
    //   url: 'http://iwenwiki.com:3002/api/foods/list',
    //   data:{
    //     city:this.data.location,
    //     page:this.data.num
    //   },
    //   success:res=>{
    //     console.log(res.data);
    //     if(res.data.status==200){
    //       this.setData({
    //         list:this.data.list.concat(res.data.data.result)
    //       })
    //     }else{
    //       //否则说明当前的接口没有数据
          
    //       this.setData({
          
    //         moreInfo:'我是有底线的'
    //       })
    //     }
    //   }
    // })
    //-----------------------
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})