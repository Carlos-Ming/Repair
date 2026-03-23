const { SUPPORT_PHONE } = require('../../utils/config.js')

Page({
  data: {
    name: '',
    gender: '',
    image_url: '',
  },

  onShow: function () {
    var that = this
    wx.getSetting({
      success: function (res) {
        // 未授权时 WXML 已渲染登录按钮，无需额外提示
        if (!res.authSetting['scope.userInfo']) return
        wx.getUserInfo({
          lang: 'zh_CN',
          success: function (res) {
            wx.setStorage({ key: 'key', data: res.userInfo })
            that.setData({
              name: res.userInfo.nickName,
              gender: res.userInfo.gender,
              image_url: res.userInfo.avatarUrl,
            })
          },
        })
      },
    })
  },

  userInfoHandler: function () {
    var that = this
    wx.getUserInfo({
      lang: 'zh_CN',
      success: function (res) {
        wx.setStorage({ key: 'key', data: res.userInfo })
        that.setData({
          name: res.userInfo.nickName,
          gender: res.userInfo.gender,
          image_url: res.userInfo.avatarUrl,
        })
      },
    })
  },

  tel: function () {
    wx.makePhoneCall({ phoneNumber: SUPPORT_PHONE })
  },

  content: function () {
    wx.navigateTo({ url: '/pages/me/me' })
  },

  all: function () {
    wx.navigateTo({ url: '/pages/all/all' })
  },

  loading: function () {
    wx.navigateTo({ url: '/pages/loading/loading' })
  },

  task: function () {
    wx.navigateTo({ url: '/pages/task/task' })
  },

  onShareAppMessage: function () {},
})