//index.js
//获取应用实例
const app = getApp()
var id = ''
var next = ''
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

  // 点击预约
  submit: function(event) {
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
                success: function(res) {
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

  call: function(event) {
    wx.makePhoneCall({
      phoneNumber: '010-80104061',
    })
  },
  navigate: function(e) {
    wx.showActionSheet({
      itemList: ['昌平校区', '东校区'],
      success: function (res) {
        //console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          wx.openLocation({
            latitude: 40.2526140000,
            longitude: 116.1456410000,
            name: "北京化工大学昌平新校区校医院",
            scale: 15
          })
        } else {
          wx.openLocation({
            latitude: 39.9717142400,
            longitude: 116.4202791500,
            name: "北京化工大学东校区校医院",
            scale: 15
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  actioncnt: function() {
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success: function(res) {
        console.log(res.tapIndex)
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },

  // 隐藏窗口
  hidePopup() {
    this.popup.hidePopup();
  },
  hide() {
    this.popup.hide();
  },

  // 显示窗口
  showPopup() {
    this.popup.showPopup();
  },
 
  //取消事件
  _error() {
    console.log('你点击了取消');
    this.popup.hidePopup();
  },

  //确认事件
  _success() {
    console.log('你点击了确定');
    this.popup.hidePopup();
  },

  onReady: function() {
    //获得popup组件
    this.popup = this.selectComponent("#popup");
  },

  onLoad: function () {
    this.popup = this.selectComponent("#popup");
    wx.cloud.callFunction({
      name: 'getid',
      complete: res => {
        console.log('Index openid: ', res.result.openId)
        var openid = res.result.openId;
        id = openid
      }
    })
    
    wx.getSetting({
      success: res => {
        // 判断用户是否登录
        // 用户未登录
        if (!res.authSetting['scope.userInfo']) {
          //debugger
          console.log("Show the Pop up")
          this.showPopup()
          
        }
        else {
          console.log("Hide the Pop up")
          this.hide()
        }
      }
    })
  },
  bindgetUserInfo: function(e) {
    // app.globalData.userInfo = e.detail.userInfo

    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true,
    // })
    // wx.navigateBack({
    //   delta: 1
    // })
    debugger
    this.popup.bindgetUserInfo()
  },
  Tohelp: function(e) {
    wx.navigateTo({
      url: '../help/help',
    })
  },
  gerenBook: function(e) {
    // wx.navigateTo({
    //   url: '../booking/booking',
    // })
    wx.showActionSheet({
      itemList: ['昌平校区', '东校区'],
      success: function(res) {
        //console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          next = '../booking/booking?id=' + 'north'
        } else {
          next = '../booking/booking?id=' + 'east'
        }
        wx.navigateTo({
          url: next,
        })
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })

  },
  wodeBook: function(e) {
    wx.navigateTo({
      url: '../records/records',
    })
  },
  advice: function(e) {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  }
})