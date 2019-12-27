// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('connect').add({
      data: {
        doctor:event.doctor,
        time:event.time,
        status:"已约",
        num: "1",
        date:event.date,
        sclnum: event.sclnum,
        sclname:event.sclname,
        doctor_name:event.doctorname,
        timevalue:event.timevalue
      }
    })
  } catch (e) {
    console.error(e)
  }
  // console.log(123)
  // try {
  //   return await db.collection('doctor').where({_id:event.doctor}).update({
  //     data: {
  //       num:event.doctimes
  //     }
  //   })
  // } catch (e) {
  //   console.error(e)
  // }
}