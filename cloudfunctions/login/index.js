// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  
  try {
    // 查询用户是否已存在
    const userResult = await db.collection('users').where({
      openid: wxContext.OPENID
    }).get()

    if (userResult.data.length === 0) {
      // 新用户，创建用户记录
      await db.collection('users').add({
        data: {
          openid: wxContext.OPENID,
          nickname: event.nickname || '',
          avatarUrl: event.avatarUrl || '',
          phone: event.phone || '',
          role: 0, // 0:普通用户 1:维修人员 2:管理员
          createTime: db.serverDate()
        }
      })
    } else {
      // 更新用户信息
      await db.collection('users').where({
        openid: wxContext.OPENID
      }).update({
        data: {
          nickname: event.nickname || userResult.data[0].nickname,
          avatarUrl: event.avatarUrl || userResult.data[0].avatarUrl,
          lastLoginTime: db.serverDate()
        }
      })
    }

    return {
      code: 0,
      message: '登录成功',
      data: {
        openid: wxContext.OPENID,
        userInfo: event
      }
    }
  } catch (err) {
    console.error(err)
    return {
      code: -1,
      message: '登录失败',
      error: err
    }
  }
}
