// pages/myCart/myCart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //selected:false,//列表的选项
    isTouchMove:false,
    startX:0,
    startY:0,//开始的坐标
    list:[],//购物车数据
    selectAllStatus:false,//全选
    selectButton:false,//结算
    totalPrice:0.00,//总价格
    num:0,//选中的选择框
  },
  //开始触发的事件，获取当前位置坐标点
  touchstart:function(e){
   // console.log('获取当前触发的x坐标点',e.changedTouches[0].clientX,e.changedTouches[0].clientY);
  this.setData({
    startX:e.changedTouches[0].clientX,
    startY:e.changedTouches[0].clientY
  })
  },
  //手指按下后 移动move事件
  touchmove:function(e){
   // console.log('移动move的坐标',e);
    //获取滑动的坐标点
    var list=this.data.list,//操作的元素list容器
    index=e.currentTarget.dataset.index,//当前的元素index
    startX=this.data.startX,
    startY=this.data.startY,//开始的坐标

    moveX=e.changedTouches[0].clientX,
    moveY=e.changedTouches[0].clientY;//滑动的坐标

    //判断moveX startY值的大小 左滑或者右滑
    for(var i=0;i<list.length;i++){
      //滑动之前把之前的删除都隐藏了，只显示当前滑块的删除
      list[i].isTouchMove=false;
    }
    if(moveX<startX){
      //console.log(list);
      list[index].isTouchMove=true;
    }else{
      list[index].isTouchMove=false;
    }
    //更新数据list
    this.setData({
      list:list
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // //调用购物车函数获取数据
    // this.getShop();
  },
  //获取购物车数据
  getShop:function(){
    wx.request({
      url: 'http://iwenwiki.com:3002/api/cart/list',
      success:res=>{
        console.log(res.data);
        if(res.data.status==200){
          var list=res.data.data.result;
          var num=0;
          // this.setData({
          //   list:res.data.data.result
          // })
          
          //判断全选按钮的状态
          var selectAllStatus=this.data.selectAllStatus;
          if(selectAllStatus){
            for(var i=0;i<list.length;i++){
              list[i].selected=true
            }
            //选中num
            num=list.length;
          }
          //渲染list
          this.setData({
            list:list,
            num:num
          })
           //价格更新
           this.goTotalPrice();
        }
      }
    })
  },
  //删除购物车
  remove:function(e){
    var id=e.currentTarget.dataset.id;
    wx.request({
      url: 'http://iwenwiki.com:3002/api/cart/delete',
      data:{
        id:id
      },
      success:res=>{
        console.log(res.data);
        if(res.data.status==200){
          wx.showToast({
            title: '删除成功',
            icon:'none'
          })
          //删除商品，刷新数据
          this.getShop();
        }
      }
    })
  },
  //总价格
  goTotalPrice:function(){
    //获取所有元素list，遍历所有购物车的选中商品数据，计算
    var list=this.data.list;
    var total=0;//总价格
    for(var i=0;i<list.length;i++){
      if(list[i].selected){
        total+=list[i].price*list[i].num
      }
    }
    //更改价格
    this.setData({
      totalPrice:total.toFixed(2)
    })
  },
  //点击选择元素
  selectedList:function(e){
    var index=e.currentTarget.dataset.index;
    var list=this.data.list;
    var num=this.data.num;
    //获取原来的selected状态
    var selected=list[index].selected;
    //获取后 取反，取反后赋值给当前的元素
    list[index].selected=!selected;

    //选中框  点击选中就num++
    if(list[index].selected){
      num++;
    }else{
      num--;
    }
    //更新list数据,选中状态和选中个数
    this.setData({
      list:list,
      num:num
    })
    //结算变亮，至少选择一个
    if(num>0){
      this.setData({
        selectButton:true
      })
    }else{
      this.setData({
        selectButton:false
      })
    }
    // console.log('选中个数：',num);
    //全选
    if(num==list.length){
      this.setData({
        selectAllStatus:true
      })
    }else{
      this.setData({
        selectAllStatus:false
      })
    }
    //计算价格
    this.goTotalPrice();
  },
  //7.全选------
  //selectAllStatus 点击全选按钮时候---控制selectAllStatus变量状态 所有的数据list一样的状态
  selectedAll:function(){
    //1.获取之前的全选的状态
    var selectAllStatus = !this.data.selectAllStatus;//点击对之前的全选取反
    var list=this.data.list;
    var num=this.data.num;
    var selectButton = this.data.selectButton;

    //2.控制所有的list选中框
    for(var i=0;i<list.length;i++){
      list[i].selected = selectAllStatus;
    }
    //3.如果选中--处理num 结算高亮
    if (selectAllStatus){
      num=list.length;
      selectButton=true
    }else{
      num=0;
      selectButton=false
    }
    //4.更新数据
    this.setData({
      list: list, 
      selectAllStatus: selectAllStatus,
      num:num,
      selectButton: selectButton
    })

  //价格
    this.goTotalPrice();
  },
  //增加购物车的数据
  addShop:function(e){
    //点击按钮，增加数据获取当前元素的index，获取当前num++
    var list=this.data.list;
    var index=e.currentTarget.dataset.index;
    var num=e.currentTarget.dataset.num;
    num++;
    //console.log(e);
    //增加后更新数据
    list[index].num=num;
    this.setData({
      list:list
    })
    //网络请求，修改数据库数据
    wx.request({
      url: 'http://iwenwiki.com:3002/api/cart/update',
      data:{
        id:e.currentTarget.dataset.id,
        num:num
      },
      success:res=>{
        console.log('增加:',res.data);
      }
    })
    //更改价格
    this.goTotalPrice();
  },
  //减少数量
  reduce:function(e){
     //点击按钮，减少数据获取当前元素的index，获取当前num--
     var list=this.data.list;
     var index=e.currentTarget.dataset.index;
     var num=e.currentTarget.dataset.num;
     num--;
     if(num<1){
       wx.showToast({
         title: '数量最少为1',
         icon:'none'
       })
     }
     //console.log(e);
     //减少后更新数据
     list[index].num=num;
     this.setData({
       list:list
     })
     //网络请求，修改数据库数据
    wx.request({
      url: 'http://iwenwiki.com:3002/api/cart/update',
      data:{
        id:e.currentTarget.dataset.id,
        num:num
      },
      success:res=>{
        console.log('减少:',res.data);
      }
    })
    //更改价格
    this.goTotalPrice();
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
    //调用购物车函数获取数据
    this.getShop();
    //全选
    this.setData({
      selectAllStatus:false,//全选
    selectButton:false,//结算
    totalPrice:0.00,//总价格
    num:0,//选中的选择框
    })
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