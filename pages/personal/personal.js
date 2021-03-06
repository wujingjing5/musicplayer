let startY = 0;//手指起始的目标
let moveY = 0;  //移动后的坐标
let moveDistance = 0; //移动的距离
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform:'translateY(0)',
    coverTransition:'',
    userInfo:{},
    recentPlayList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 读取用户的基本信息
    let userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
      this.setData({
        userInfo: JSON.parse(userInfo)
      })

      // 发送请求获取用户播放记录
      this.getUserRecentPlayList(this.data.userInfo.userId)
    }
  },

// 获取用户播放记录的功能函数
  async  getUserRecentPlayList(userId){
    let recentPlayListData = await request('/user/record', { uid: userId,type:0})
    this.setData({
      recentPlayList: recentPlayListData.allData.splice(0,10),
    })
  },

  // 手指事件
  handleTouchStart(event) { 
    // console.log(event);
    this.setData({
      coverTransition: ''
    })
    startY = event.touches[0].clientY;
  },
  handleTouchMove(event) {
    moveY = event.touches[0].clientY;
    moveDistance = moveY - startY;
    // console.log(moveDistance);
    if(moveDistance<=0){
      return;
    }
    if(moveDistance>=160){
      moveDistance = 160;
    }
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`,
    })
  },
  handleTouchEnd(event){
    // console.log('end');
    this.setData({
      coverTransform: "translateY(0)",
      coverTransition:'transform .5s linear'
    })
  },
  // 跳转到登录界面
  toLogin(){
    wx.navigateTo({
      url: '/pages/login/login',
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