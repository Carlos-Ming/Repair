//index.js
const { API } = require('../../utils/config.js')

Page({
  data: {
    img: '',
    image_name: '',
    image_url: '',
    imgUrls: [
      '/images/tushuguan.jpg',
      '/images/huisen.jpg',
      '/images/tiyuguan.jpg',
    ],
    array: [],
    nickName: '',
    index: 0,
    multiArray: [
      ['1#', '2#', '3#', '4#', '5#', '6#', '7#', '8#', '9#', '10#', '11#', '12#', '13#', '14#', '15#'],
      [
        '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116',
        '201', '202', '203', '204', '205', '206', '207', '208', '209', '210', '211', '212', '213', '214', '215', '216',
        '301', '302', '303', '304', '305', '306', '307', '308', '309', '310', '311', '312', '313', '314', '315', '316',
        '401', '402', '403', '404', '405', '406', '407', '408', '409', '410', '411', '412', '413', '414', '415', '416',
        '501', '502', '503', '504', '505', '506', '507', '508', '509', '510', '511', '512', '513', '514', '515', '516',
        '601', '602', '603', '604', '605', '606', '607', '608', '609', '610', '611', '612', '613', '614', '615', '616',
      ],
    ],
    multiIndex: [0, 0],
  },

  onLoad: function () {
    var that = this
    // 获取故障类型
    wx.request({
      url: API.getCategories,
      header: { 'content-type': 'application/json' },
      success: function (res) {
        that.setData({
          array: res.data.map(function (item) { return item.cate_name })
        })
      },
      fail: function () {
        wx.showToast({ title: '获取故障类型失败', icon: 'none' })
      },
    })
  },

  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'key',
      success: function (res) {
        that.setData({ nickName: res.data.nickName })
      },
    })
  },

  bindPickerChange: function (e) {
    this.setData({ index: e.detail.value })
  },

  bindMultiPickerChange: function (e) {
    this.setData({ multiIndex: e.detail.value })
  },

  uploadimg: function () {
    var that = this
    wx.chooseImage({
      success: function (res) {
        var tempFilePath = res.tempFilePaths[0]
        that.setData({ img: res.tempFilePaths })
        wx.uploadFile({
          url: API.uploadImage,
          filePath: tempFilePath,
          name: 'resource',
          success: function (res) {
            var data = JSON.parse(res.data)
            that.setData({
              image_url: data.image_url,
              image_name: data.image_name,
            })
          },
          fail: function () {
            wx.showToast({ title: '图片上传失败', icon: 'none' })
          },
        })
      },
    })
  },

  formSubmit: function (e) {
    var values = e.detail.value
    // 表单验证
    if (!values.name || !values.name.trim()) {
      return wx.showToast({ title: '请填写报修人姓名', icon: 'none' })
    }
    if (!values.tel || !values.tel.trim()) {
      return wx.showToast({ title: '请填写联系方式', icon: 'none' })
    }
    if (!values.content || !values.content.trim()) {
      return wx.showToast({ title: '请填写故障详情', icon: 'none' })
    }

    var that = this
    wx.showLoading({ title: '提交中' })

    var postData = {
      name: values.name,
      tel: values.tel,
      places: values.place,
      content: values.content,
      cate: this.data.array[this.data.index],
      place: this.data.multiArray[0][this.data.multiIndex[0]] + this.data.multiArray[1][this.data.multiIndex[1]],
      image_url: this.data.image_url,
      image_name: this.data.image_name,
      nicheng: this.data.nickName,
    }

    wx.request({
      url: API.submitRepair,
      method: 'post',
      data: postData,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function () {
        wx.hideLoading()
        wx.showToast({ title: '提交成功', icon: 'success', duration: 2000 })
      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({ title: '提交失败，请重试', icon: 'none' })
      },
    })
  },

  onShareAppMessage: function () {},
})
