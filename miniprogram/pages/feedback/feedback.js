// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: ['不能打开小程序','小程序闪退','卡顿投诉','界面加载','界面异常', '其他异常']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  upload:function (e){

    var index = e.currentTarget.dataset.id
    var feedback_content=this.data.itemList[index]
    this.setData({
      feedback_content:feedback_content
    })
    wx.navigateTo({
      url: '../upload/upload?content='+feedback_content,
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