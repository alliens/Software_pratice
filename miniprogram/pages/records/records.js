var app = getApp()
var id = ''
var user
var mid = []
var new_records=[]
const db = wx.cloud.database({
  //这个是环境ID不是环境名称
  env: 'buct-medicine-65f74a'
})
wx.cloud.init();
Page({
  data: {
    navbar: ['近期预约', '历史预约'],
    currentTab: 1,
    new_record:[],
    records: [],
    flag1: 0,
    flag2:0
  },
  onLoad:function(e){
    wx.cloud.callFunction({
      name: 'getid',
      complete: res => {
        var openid = res.result.openId
        id = openid
        db.collection('user').where({
          openid: id
        }).get({
          //如果查询成功的话
          success: res => {
            user = res.data[0]
            db.collection('connect').where({
              sclnum: user.sclnum
            }).get({
              success: res => {
                mid = res.data
                this.setData({
                  records: res.data
                })
              }
            })
          }
        })
      }
    }),
      wx.showLoading({
        title: '加载中.....',
      })
    setTimeout(function () {
      wx.hideLoading()
    }, 2500)
  },
  navbarTap: function(e) {
    var date = new Date()
    var c_day = date.getDate()
    var c_month = date.getMonth() + 1
    var c_year = date.getFullYear()
    var c_hour = date.getHours()
    var c_m = date.getMinutes()
    var now = ((((c_year * 100 + c_month) * 100 + c_day) * 100 + c_hour) * 100 + c_m)
    new_records=[]
    for (var x in mid){
      if (mid[x].timevalue>now)
      {
        new_records.push(mid[x])
      }
    }
    this.setData({
        currentTab: e.currentTarget.dataset.idx,
        new_record:new_records
      })
  },
  concel: function (event) {
    var that=this;
    var id = event.currentTarget.dataset.record;
      wx.showModal({
        title: '取消预约',
        content: '确认要取消预约？',
        success: function(res) {
          if (res.cancel) {
          } else {
            wx.cloud.callFunction({
              name: 'del',
              data: {
                id: id
              },
              success: res => {
                wx.showToast({
                  title: '取消预定成功',
                })
                that.setData({
                  currentTab:1
                })
                that.onLoad()
              },
              fail: err => {
                console.log("nice")
                wx.showToast({
                  icon: 'none',
                  title: '取消失败',
                })
                console.error('[云函数] [sum] 调用失败：', err)
              }

            })
          }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
  },

})