// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var openid = event.openid
  try {
    return await db.collection('user').where({
      _id: openid
    }).get()
  } catch (e) {
    console.log(e)
  }
}