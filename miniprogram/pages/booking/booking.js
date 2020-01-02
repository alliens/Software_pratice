var app = getApp()
var place='north'
const db = wx.cloud.database({
  //这个是环境ID不是环境名称
  env: 'buct-medicine-65f74a'
})
wx.cloud.init();
Page({
  data:{
  },
  actioncnt: function () {
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  switchRightTab:function(event){
    var Id=event.currentTarget.dataset.id;
    this.setData({
      curId:Id
    })
  },
  onLoad:function(options){
    var doctor_p = options.id
    debugger
    db.collection('doctor').where({
      where: doctor_p
    }).get({
      success: res => {
        var doctor = res.data
        //debugger
        //console.log(user)
        this.setData({
          doctor:doctor
        })
      }
    })
  },
  Booking:function(event){
    var doctorId = event.currentTarget.dataset.number;
    wx.navigateTo({
      url: '/pages/doctor-list/doctor-list?number='+doctorId,
    })
  }
})

// url: 'post-detail/post-detail?id=' + postId, //将post页面的id传送到post-detail页面
