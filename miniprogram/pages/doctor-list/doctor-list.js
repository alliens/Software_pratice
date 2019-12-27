wx.cloud.init()
var app = getApp()
var day=""
var time =""
var doctorId=""
var id=''
var timeArr = []
var pass
var mid
var sclnum=""
var sclname=""
var doctimes=0
var doctorname=""
const db = wx.cloud.database({
  //这个是环境ID不是环境名称
  env: 'buct-medicine-65f74a'
})
Page({
  /**
   * 页面的初始数据
   */
  data: {
    calendar: [],
    width: 0,
    choosingDate: 0,
    choosingTime: 0,
    dname: "",
    dpro: "",
    dintro: "",
    dnum: 0,
    openid:'',
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option,mid) {
    pass=option
    doctorId = option.number //获取医生id
    this.getOpenid();
    var that = this;
     time ="8:00-8:30"
    timeArr=[{
      "time": "8:00-8:30",
        "status": "可约",
          "num": "0"
    },
    {
      "time": "8:30-9:00",
        "status": "可约",
          "num": "0"
    },
    {
      "time": "9:00-9:30",
        "status": "可约",
          "num": "0"
    },
    {
      "time": "9:30-10:00",
        "status": "可约",
          "num": "0"
    },
    {
      "time": "10:00-10:30",
        "status": "可约",
          "num": "0"
    },
    {
      "time": "10:30-11:00",
        "status": "可约",
          "num": "0"
    },
    {
      "time": "11:00-11:30",
        "status": "可约",
          "num": "0"
    },
    {
      "time": "11:30-12:00",
        "status": "可约",
          "num": "0"
    },
    {
      "time": "12:00-12:30",
        "status": "可约",
          "num": "0"
    },
    {
      "time": "12:30-13:00",
        "status": "可约",
          "num": "0"
    },
    {
      "time": "13:00-13:30",
        "status": "可约",
          "num": "0"
    },
    {
      "time": "13:30-14:00",
        "status": "可约",
          "num": "0"
    },
    {
      "time": "14:00-14:30",
        "status": "可约",
          "num": "0"
    },
    {
      "time": "14:30-15:00",
        "status": "可约",
          "num": "0"
    },
    {
      "time": "15:00-15:30",
        "status": "可约",
          "num": "0"
    },
    {
      "time": "15:30-16:00",
        "status": "可约",
          "num": "0"
    },
    {
      "time": "16:00-16:30",
        "status": "可约",
          "num": "0"
    },
    {
      "time": "16:30-17:00",
        "status": "可约",
          "num": "0"
    }]
    function getThisMonthDays(year, month) {
      return new Date(year, month, 0).getDate();
    }
    // 计算每月第一天是星期几
    function getFirstDayOfWeek(year, month) {
      return new Date(Date.UTC(year, month - 1, 1)).getDay();
    }
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const cur_date = date.getDate();
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    //利用构造函数创建对象
    if (mid == (cur_year + '-' + cur_month + "-" + cur_date) || mid==null){
      day = cur_year + '-' + cur_month + "-" + cur_date
    }
    else{
      day=mid
    }
    function calendar(date, week) {
      this.date = cur_year + '-' + cur_month + '-' + date;
      if (date == cur_date) {
        this.week = "今天";
      } else if (date == cur_date + 1) {
        this.week = "明天";
      } else {
        this.week = '星期' + week;
      }
    }
    //当前月份的天数
    var monthLength = getThisMonthDays(cur_year, cur_month)
    //当前月份的第一天是星期几
    var week = getFirstDayOfWeek(cur_year, cur_month)
    var x = week;
    for (var i = 1; i <= monthLength; i++) {
      //当循环完一周后，初始化再次循环
      if (x > 6) {
        x = 0;
      }
      //利用构造函数创建对象
      that.data.calendar[i] = new calendar(i, [weeks_ch[x]][0])
      x++;
    }
    //限制要渲染的日历数据天数为7天以内（用户体验）
    var flag = that.data.calendar.splice(cur_date, that.data.calendar.length - cur_date <= 7 ? that.data.calendar.length : 7)
    that.setData({
      calendar: flag
    })
    //设置scroll-view的子容器的宽度
    that.setData({
      width: 186 * parseInt(that.data.calendar.length - cur_date <= 7 ? that.data.calendar.length : 7)
    })
    //2、开始查询数据了  news对应的是集合的名称
    db.collection('doctor').where({
      _id: doctorId
    }).get({
      //如果查询成功的话
      success: res => {
        doctorname=res.data[0].name
        doctimes=res.data[0].num
        //console.log(typeof doctimes)
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
        this.setData({
          dname: res.data[0].name,
          dpro: res.data[0].pro,
          dintro: res.data[0].intro,
          dnum: res.data[0].num
        })
      }
    })
    db.collection('connect').where({
      doctor: doctorId,
      date:day
    }).get({
      //如果查询成功的话
      success: res => {
         for (x in res.data)
         {
           for(var y=0;y<18;y++)
           {
             if (res.data[x].time==timeArr[y].time)
               {
               timeArr[y] = res.data[x]
               }
           }
         }
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
        this.setData({
         timeArr:timeArr
        })
      }
    })
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
        db.collection('user').where({
          openid: id
        }).get({
          //如果查询成功的话
          success: res => {
            sclnum = res.data[0].sclnum
            sclname = res.data[0].name
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  select: function(event) {
    //为上半部分的点击事件
   
    timeArr = [{
      "time": "8:00-8:30",
      "status": "可约",
      "num": "0"
    },
    {
      "time": "8:30-9:00",
      "status": "可约",
      "num": "0"
    },
    {
      "time": "9:00-9:30",
      "status": "可约",
      "num": "0"
    },
    {
      "time": "9:30-10:00",
      "status": "可约",
      "num": "0"
    },
    {
      "time": "10:00-10:30",
      "status": "可约",
      "num": "0"
    },
    {
      "time": "10:30-11:00",
      "status": "可约",
      "num": "0"
    },
    {
      "time": "11:00-11:30",
      "status": "可约",
      "num": "0"
    },
    {
      "time": "11:30-12:00",
      "status": "可约",
      "num": "0"
    },
    {
      "time": "12:00-12:30",
      "status": "可约",
      "num": "0"
    },
    {
      "time": "12:30-13:00",
      "status": "可约",
      "num": "0"
    },
    {
      "time": "13:00-13:30",
      "status": "可约",
      "num": "0"
    },
    {
      "time": "13:30-14:00",
      "status": "可约",
      "num": "0"
    },
    {
      "time": "14:00-14:30",
      "status": "可约",
      "num": "0"
    },
    {
      "time": "14:30-15:00",
      "status": "可约",
      "num": "0"
    },
    {
      "time": "15:00-15:30",
      "status": "可约",
      "num": "0"
    },
    {
      "time": "15:30-16:00",
      "status": "可约",
      "num": "0"
    },
    {
      "time": "16:00-16:30",
      "status": "可约",
      "num": "0"
    },
    {
      "time": "16:30-17:00",
      "status": "可约",
      "num": "0"
    }]
    db.collection('connect').where({
      doctor: doctorId,
      date: event.currentTarget.dataset.date
    }).get({
      //如果查询成功的话
      success: res => {
        for (var x=0;x<res.data.length;x++) {
          for (var y = 0; y < 18; y++) {
            if (res.data[x].time == timeArr[y].time) {
              timeArr[y] = res.data[x]
            }
          }
        }
        this.setData({
          timeArr: timeArr,
          choosingDate: event.currentTarget.dataset.index
        })
      }
    })
    day = event.currentTarget.dataset.date
  },
  selectTime: function(event) {
    //为下半部分的点击事件
    var status = event.currentTarget.dataset.status;
    this.setData({
      choosingTime: event.currentTarget.dataset.tindex,
      status:status
    })
    time = event.currentTarget.dataset.time
  },

  //预定按钮响应函数
  Booking: function(event) {
    var days=day.split("-")
    var times=((parseInt(days[0]*100+parseInt(days[1]))*100+parseInt(days[2])))
    var point=time.split("-")
    var clock=point[0].split(":")
    times=(times*100+parseInt(clock[0]))*100+parseInt(clock[1])
    var date = new Date()
    var c_day = date.getDate()
    var c_month = date.getMonth() + 1
    var c_year = date.getFullYear()
    var c_hour = date.getHours()
    var c_m = date.getMinutes()
    var now = ((((c_year * 100 + c_month) * 100 + c_day) * 100 + c_hour) * 100 + c_m)
    if((times+30)<now)
    {
      wx.showToast({
        title: '该时段无法预约！',
      })
    }
    else{
    //console.log(doctimes+1)
    //doctimes=doctimes+1
    wx.cloud.callFunction({
      name: 'add-connect',
      data: {
        time:time,
        date:day,
        doctor:doctorId,
        doctorname:doctorname,
        sclnum:sclnum,
        sclname:sclname,
        timevalue:times,
       // doctimes:doctimes
      },
      success: res => {
        wx.showToast({
          title: '预定成功',
        }),
        //console.log(doctorId,doctimes)
        // db.collection('doctor').doc(doctorId).update({
        //   data:{
        //     num:2
        //   }, success: console.log,
        //   fail: console.error
        // })
        this.setData({
          result: JSON.stringify(res.result)
        })
        this.onLoad(pass,day)
        
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '预定失败',
        })
        console.error('[云函数] [sum] 调用失败：', err)
      }
    })
    }
  }
})