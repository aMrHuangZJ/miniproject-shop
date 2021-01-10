//网络请求封装
// 参数:method(请求类型)  url  params（请求携带参数
// message（信息弹框内容）  success  fail
function http(method,url,params,message,success,fail){
  if(message!=''){
    wx.showLoading({
      title: 'message',
    })
  }
  //请求
  wx.request({
    url: 'http://iwenwiki.com:3002'+url,
    method:method,
    data:params,
    success:res=>{
      if(res.data.status==200){
        //成功获取了数据
        success(res.data);
      }else{
        //没有数据
        fail(res.data);
      }
    },
    fail:function(res){
      fail(res.data);
    },
    complete:function(res){
      if(message!=''){
        wx.hideLoading();
      }
    }
  })
}

//暴露出去
module.exports=http;