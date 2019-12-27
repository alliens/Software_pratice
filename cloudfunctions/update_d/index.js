// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {


  console.log(event.doctortimes, doctot)
  try {
    console.log(event.doctortimes,doctot)
    return await db.collection('doctor').doc(event.doctor).update({
      data: {
        num: parseInt(event.doctortimes+1)
      }
    })

  } catch (e) {
    console.error(e)
  }
}