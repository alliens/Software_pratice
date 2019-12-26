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
  },

  submit: function (event) {
    wx.cloud.callFunction({
      name: 'getid',
      complete: res => {
        var openid = res.result.openId;
        id = openid
        console.log("The id is：" + id)
        db.collection('user').where({
          // 判断登录者的openid是否存在在数据库中
          openid: id
        }).get({
          //查询成功
          success: res => {
            if (res.data.length != 0) {
              wx.switchTab({
                url: '../booking/booking',
              })
            } else {
              wx.showModal({
                title: '您尚未注册',
                content: '请先登录后再注册',
                cancelText: '取消',
                confirmText: '确认',
                confirmColor: '#63B8FF',
                success: function (res) {
                  if (res.cancel) {

                  } else {
                    wx.switchTab({
                      url: '../personal/personal',
                    })
                  }
                }
              })
            }
          },
        })
      }
    })
  },

  call: function (event) {
    wx.makePhoneCall({
      phoneNumber: '010-80104061',
    })
  },
  navigate: function (e) {
    wx.openLocation({
      latitude: 40.2526140000,
      longitude: 116.1456410000,
      name: "北京化工大学昌平新校区校医院",
      scale: 15
    })
  },

  onLoad: function () {
    wx.cloud.callFunction({
      name: 'getid',
      complete: res => {
        console.log('Index openid: ', res.result.openId)
        var openid = res.result.openId;
        id = openid
      }
    })
  },
  Tohelp: function (e) {
    wx.navigateTo({
      url: '../help/help',
    })
  }
})
