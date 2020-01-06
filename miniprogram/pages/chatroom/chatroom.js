// pages/chatroom/chatroom.js
Page({

  /**
  * 页面的初始数据
  */
  data: {
    //设置标记点
  //   markers: [
  //     {
  //       iconPath: "/images/icon/location.png",
  //       id: 4,
  //       latitude: 40.2526140000,
  //       longitude: 116.1456410000,
  //       width: 30,
  //       height: 30
  //     }
  //   ],
  //   //当前定位位置
  //   latitude: '',
  //   longitude: '',
  },
  navigate: function (e) {
    wx.openLocation({
      latitude: 40.2526140000,
      longitude: 116.1456410000,
      name: "北京化工大学昌平新校区校医院",
      scale: 15
    })
  },
  navigate2: function (e) {
    wx.openLocation({
      latitude: 39.9717142400,
      longitude: 116.4202791500, 
      name: "北京化工大学东校区校医院",
      scale: 15
    })
  },
  onLoad() {
    //获取当前位置
    // wx.getLocation({
    //   type: 'gcj02',
    //   success: (res) => {
    //     console.log(res)
    //     this.setData({
    //       latitude: 40.2526140000,
    //       longitude: 116.1456410000
    //     })
    //   }
    // })
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