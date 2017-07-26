Page({
  data: {
    key: '',
    data: '',
    dialog: {
      title: '',
      content: '',
      hidden: true
    }
  },
  // 实时 获取Key值
  keyChange: function (e) {
    this.data.key = e.detail.value
  },
  // 实时 获取value值
  dataChange: function (e) {
    this.data.data = e.detail.value
  },
  // 缓存数据
  setStorage: function () {

    var key = this.data.key
    var data = this.data.data
    // 无数据
    if (key.length === 0) {
      // 更新数据
      this.setData({
        key: key,
        data: data,
        'dialog.hidden': false,
        'dialog.title': '保存数据失败',
        'dialog.content': 'key 不能为空'
      })
    }
    // 有数据
    else {
      wx.setStorageSync(key, data) // 同步缓存
      this.setData({
        key: key,
        data: data,
        'dialog.hidden': false,
        'dialog.title': '存储数据成功'
      })
    }
  },
  // 获取数据
  getStorage: function () {

    var key = this.data.key
    var data = this.data.data

    var storageData

    if (key.length === 0) {
      this.setData({
        key: key,
        data: data,
        'dialog.hidden': false,
        'dialog.title': '读取数据失败',
        'dialog.content': 'key 不能为空'
      })
    } else {
      storageData = wx.getStorageSync(key) // 同步获取
      if (storageData === "") {
        this.setData({
          key: key,
          data: data,
          'dialog.hidden': false,
          'dialog.title': '读取数据失败',
          'dialog.content': '找不到 key 对应的数据'
        })
      } else {
        this.setData({
          key: key,
          data: data,
          'dialog.hidden': false,
          'dialog.title': '读取数据成功',
          'dialog.content': "data: '" + storageData + "'"
        })
      }
    }
  },
  // 清空缓存
  clearStorage: function () {
    wx.clearStorageSync() // 清空数据
    this.setData({
      key: '',
      data: '',
      'dialog.hidden': false,
      'dialog.title': '清除数据成功',
      'dialog.content': ''
    })
  },
  // 对话框：确定操作
  confirm: function () {
    this.setData({
      'dialog.hidden': true,
      'dialog.title': '',
      'dialog.content': ''
    })
  }
})
