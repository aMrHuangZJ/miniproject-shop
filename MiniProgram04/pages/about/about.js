// 调用全局变量
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:true,
    nickName:'',//昵称
    avatarUrl:'',//头像
  },
  //点击获取用户信息
  getUserInfo:function(e){
    console.log(e);
    this.setData({
      isShow:false,
      nickName:e.detail.userInfo.nickName,
      avatarUrl:e.detail.userInfo.avatarUrl
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //进入页面先获取全局的变量是否有用户信息
    console.log(app.globalData);
    if(app.globalData.userInfo){
      console.log('全局变量用户信息存在');
      this.setData({
        nickName:app.globalData.userInfo.nickName,
        avatarUrl:app.globalData.userInfo.avatarUrl,
        isShow:false
      })
    }else{
      //由于getUserInfo是网络请求，可能会在Page.onLoad之后才返回
              //所以此处加入callback以防止这种情况
      app.userInfoReadyCallback=re=>{
        console.log('userInfoReadyCallback获取数据')
        this.setData({
          isShow:false,
          nickName:resizeBy.nickName,//昵称
          avatarUrl:res.avatarUrl,//头像
        })
      }
    }
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