// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var an_num = event.answer_num
  try {
    return await db.collection('answer').where({
      _id: an_num
    }).get()
  } catch (e) {
    console.log(e)
  }
}