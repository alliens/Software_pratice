// pages/info/info.js

var name = ''
var number = 0
var id = ''
var user
const db = wx.cloud.database({
  //这个是环境ID不是环境名称
  env: 'buct-medicine-65f74a'
})
wx.cloud.init()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uname: "* 姓名 [必填]",
    usclnum: "* 学号 [必填]",
  },

  globalData: {
    openid: '',
  },

  // 提交按钮函数
  upload: function () {
    // 获取得到输入框中输入的
    if (user == null)
      wx.cloud.callFunction({
        name: 'add',
        data: {
          name: name,
          num: number,
          openid: id,
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
    else if(name!=''&&number==0)
      wx.cloud.callFunction({
        name: 'update',
        data: {
          name: name,
          num: user.sclnum,
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
    else if (name == '' && number != 0)
      wx.cloud.callFunction({
        name: 'update',
        data: {
          name: user.name,
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
    else if (name != '' && number != 0)
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
      wx.switchTab({
        url: '../personal/personal',
      })
  },

  // 接收用户输入的姓名
  inputName: function (e) {
    //if(e.detail.value!='')
    this.setData({
      name: e.detail.value
    })
    name = e.detail.value
  },
  
  // 接收用户输入的学号
  inputNumber: function (e) {
    this.setData({
      number: e.detail.value
    })
    number = e.detail.value
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'getid',
      complete: res => {
        var openid = res.result.openId;
        this.setData({
          openid: openid
        })
        id = openid
        //进入数据库查询用户openid
        db.collection('user').where({
          openid: id
        }).get({
          //如果查询成功的话
          success: res => {
            user = res.data[0]
            //console.log(res.data[0].name)
           // number = user.sclnum
            this.setData({
              uname: user.name,
              usclnum: user.sclnum
            })
          }
        })
      }
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