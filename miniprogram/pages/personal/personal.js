
var app = getApp()
var userInfo = null;
var name = ''
var number = 0
var id = ''
var user
const db = wx.cloud.database({
  //这个是环境ID不是环境名称
  env: 'buct-medicine-65f74a'
})
wx.cloud.init();

Page({
  globalData: {
    // appid: 'wx254107dbf793f292',
    // secret: 'efed4bdb3b11c43024dabc06442aa08d',
    openid: '',
  },
  data: {
    hiddenmodalput: true,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    uname: "姓名",
    usclnum: "学号"
  },
  info:function(){
    wx.navigateTo({
      url: '../info/info',
    }),
      wx.showLoading({
        title: '加载中.....',
      })
    setTimeout(function () {
      wx.hideLoading()
    }, 1800)
  },
  modalinput: function() {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function() {
    this.setData({
      hiddenmodalput: true
    });
  },
  call: function (event) {
    wx.makePhoneCall({
      phoneNumber: '18811639806',
    })
  },
  //确认  
  confirm: function() {
    this.setData({
      hiddenmodalput: true
    })
    if (user == null)
      wx.cloud.callFunction({
        name: 'add',
        data: {
          name: name,
          num: number,
          openid: id,
        },
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
    else
      wx.cloud.callFunction({
        name: 'update',
        data: {
          name: name,
          num: number,
          openid: id,
        },
        success: res => {
          wx.showToast({
              title: '修改成功',
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
    //this.onload
  },
  inputName: function(e) {
    this.setData({
      name: e.detail.value
    })
    name = e.detail.value
  },
  inputNumber: function(e) {
    this.setData({
      number: e.detail.value
    })
    number = e.detail.value
  },

  onLoad: function() {
    wx.cloud.callFunction({
      name: 'getid',
      complete: res => {
        var openid = res.result.openId;
        that.setData({
          openid: openid
        })
        id = openid
        db.collection('user').where({
          openid: id
        }).get({
          //如果查询成功的话
          success: res => {
            user = res.data[0]
            this.setData({
              uname: user.name,
              usclnum: user.sclnum
            })
          }
        })
      }
    })

    var that = this;


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getid',
      complete: res => {
        var openid = res.result.openId;
        that.setData({
          openid: openid
        })
        id = openid
      }
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
  },
  record:function(e){
    wx.navigateTo({
      url: '../records/records',
    })
  }
})