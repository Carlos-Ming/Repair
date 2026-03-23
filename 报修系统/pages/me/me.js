// pages/me/me.js
Page({
  data: {
    name: '',
    gender: '',
    image_url: '',
    country: '',
    city: '',
    province: '',
  },

  onLoad: function () {
    var that = this
    wx.getStorage({
      key: 'key',
      success: function (res) {
        that.setData({
          name: res.data.nickName,
          city: res.data.city,
          country: res.data.country,
          province: res.data.province,
          gender: res.data.gender,
          image_url: res.data.avatarUrl,
        })
      },
      fail: function () {
        wx.showToast({ title: '请先登录', icon: 'none' })
      },
    })
  },

  onShareAppMessage: function () {},
})