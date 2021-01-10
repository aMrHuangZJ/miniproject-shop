//app.js
App({

  onLaunch:function(){
    //获取用户的当前设置，返回值中只会出现小程序已经向用户请求过的权限
    wx.getSetting({
      success:res=>{
        console.log(res.authSetting);
        if(res.authSetting['scope.userInfo']){
          console.log('之前已经授权了小程序');
          //获取用户信息
          wx.getUserInfo({
            success:data=>{
              console.log(data.userInfo);
              //存储到全局变量上
              this.globalData.userInfo=data.userInfo;

              //由于getUserInfo是网络请求，可能会在Page.onLoad之后才返回
              //所以此处加入callback以防止这种情况
              if(this.userInfoReadyCallback){
                console.log('进入函数')
                this.userInfoReadyCallback(data.userInfo)
              }
            }
          })
        }else{
          console.log('之前没有授权登录过')
        }
      }
    })
  },

  globalData:{
    cityName:'',//切换的城市的变量
    userInfo:'',//用户信息
  }
})