// pages/upload/upload.js
wx.cloud.init()
var app = getApp()
var day = ""
var time = ""
var doctorId = ""
var id = ''
var timeArr = []
var pass
var mid
var sclnum = ""
var sclname = ""
var out = 0
var ph_path = ""
const db = wx.cloud.database({
  //这个是环境ID不是环境名称
  env: 'buct-medicine-65f74a'
})
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var feedback_content=options.content
    // this.setData({
    //   feedback_content:feedback_content
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

  //上传图片
  chuantupian() {
    let that = this;
    let timestamp = (new Date()).valueOf();
    wx.chooseImage({
      success: chooseResult => {
        wx.showLoading({
          title: '上传中。。。',
        })
        ph_path = chooseResult.tempFilePaths[0]
        console.log(ph_path)
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
        //debugger
        // 将图片上传至云存储空间

      },
    })
  },

  shangchuan() {
    let that = this;
    let timestamp = (new Date()).valueOf();
    console.log(ph_path)
    //console.log(yj)
    wx.cloud.callFunction({
      name: 'add_yj',
      data: {
        num: timestamp,
        yj:"hello"
      },
      //用户新建成功
      success: res => {
        wx.showToast({
          title: '新建成功',
        }),
          this.setData({
            result: JSON.stringify(res.result)
          })
        this.onLoad()
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '修改失败',
        })
        console.error('[云函数] [sum] 调用失败：', err)
      }
    })
    wx.cloud.uploadFile({
      // 指定上传到的云路径
      cloudPath: timestamp + '.png',
      // 指定要上传的文件的小程序临时文件路径
      filePath: ph_path,
      // 成功回调
      success: res => {
        console.log('上传成功', res)
        wx.hideLoading()
        wx.showToast({
          title: '上传图片成功',
        })
        if (res.fileID) {
          that.setData({
            zhaopian: '图片如下',
            imgUrl: res.fileID
          })
        }

      },
    })
    //debugger
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