const { API } = require('../../utils/config.js')
const time = require('../../utils/time.js')

Page({
  data: {
    array: [],
    nickName: '',
  },

  onLoad: function () {
    var that = this
    wx.showLoading({ title: '加载中' })
    wx.getStorage({
      key: 'key',
      success: function (res) {
        var nickName = res.data.nickName
        that.setData({ nickName: nickName })
        wx.request({
          url: API.taskRepairs,
          method: 'post',
          data: { name: nickName },
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            var list = res.data.map(function (item) {
              item.create_at = time.formatTime(item.create_at, 'Y/M/D h:m:s')
              return item
            })
            that.setData({ array: list })
            wx.hideLoading()
          },
          fail: function () {
            wx.hideLoading()
            wx.showToast({ title: '数据加载失败', icon: 'none' })
          },
        })
      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({ title: '请先登录', icon: 'none' })
      },
    })
  },

  onShareAppMessage: function () {},
})