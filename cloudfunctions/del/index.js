//index.js
//获取应用实例
const app = getApp()
var id = ''
wx.cloud.init();
const db = wx.cloud.database({
  //这个是环境ID不是环境名称
  env: 'buct-medicine-65f74a'
})
Page({

  data: {
    result: '',
    canIUseClipboard: wx.canIUse('setClipboardData'),
    openId: ''
  },
  submit: function (event) {
    wx.cloud.callFunction({
      name: 'getid',
      complete: res => {
        console.log('openid: ', res.result.openId)
        var openid = res.result.openId;
        id = openid
        // 获得试用者的用户id
        //console.log(id)
        db.collection('openid').where({
          // 判断登录者的openid是否存在在数据库中
          openid: id
        }).get({
          //查询成功
          success: res => {
            wx.switchTab({
              url: '../booking/booking',
            })
          },
          fail: res => {
            wx.switchTab({
              url: '../personal/personal',
            })
          }
        })
      }
    })
  },

  call: function (event) {
    wx.makePhoneCall({
      phoneNumber: '010-80104061',
    })
  },

  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getid',
      complete: res => {
        console.log('openid: ', res.result.openId)
        var openid = res.result.openId;
        that.setData({
          openid: openid
        })
        id = openid
      }
    })
  },

  onLoad: function () {
    wx.cloud.callFunction({
      name: 'getid',
      complete: res => {
        console.log('Index openid: ', res.result.openId)
        var openid = res.result.openId;
        id = openid
        // 获得试用者的用户id
        //console.log(id)
      }
    })
  }
})
