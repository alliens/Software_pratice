// component/popup.js
const app = getApp()

Component({
 
  options: {
    // 在组件定义时的选项中启用多slot支持
    multipleSlots: true,
  },
  /**
   * 组件的属性列表
   */ 
  properties: {
    // 属性名
    title: {
      // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      type: String, 
      value: 'title',
    },
    // 弹窗内容
    // content: {
    //   type: String,
    //   value: 'content',
    // },
    // // 弹窗取消按钮文字
    // btn_no: {
    //   type: String,
    //   value: '取消'
    // },
    // // 弹窗确认按钮文字
    // btn_ok: {
    //   type: String,
    //   value: '确定'
    // } 
  },

  /**
   * 组件的初始数据
   */
  data: {
    flag: true,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 组件的方法列表
   */

  methods: {
    bindgetUserInfo: function(e) {
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true,
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
          withCredentials: true,
          
          success: function(res) {
            console.log(res)
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true,
              canIUse: false,
            })
          },
  
          fail: function() {
            // 获取用户信息失败后，请跳转授权界面
            wx.showModal({
              title: '警告',
              content: '尚未进行授权，请点击确定跳转到授权界面进行授权',
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.navigateTo({
                    url: '../personal/personal',
                  })
                }
              }
            })
          }
  
        })
      }
    //  console.log(app.globalData.userInfo)
    //  console.log(e.detail.userInfo)
    
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
      console.log(e.detail.userInfo)
      wx.navigateBack({
        delta: 1
      })
      // wx.navigateTo({
      //   url: '../../pages/index/index',
      // })
    },
    
    // 隐藏弹框
    hidePopup: function () {
      this.setData({
        flag: !this.data.flag
      })
    },

    hide() {
      this.setData({
        flag: this.data.flag 
      })
    },
    //展示弹框
    showPopup () {
      this.setData({
        flag: !this.data.flag
      })
    },
    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
    _error () {
      //触发取消回调
      this.triggerEvent("error")
    },
    _success () {
      //触发成功回调
      this.triggerEvent("success");
    }
  }
})
