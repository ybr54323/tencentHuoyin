const util = require('./utils/util');
//app.js
App({
  onLaunch: function () {
    for (let i = 0; i < 14; i++) {
      this.globalData.totalActList.push({
        year: 2019,
        month: i,
        actList: []
      })
    }
    // 获取json
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //获取当月份活动

  },
  globalData: {
    userInfo: null,
    // 存放所有活动
    totalActList: [],
    mock: {
      userInfo: {
        nickName: "ybr",
        avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/CrAtJUb4XziaIa5eG9McopDBjdwDjXej85YDGIognOwdre38NEIUicGMaqjsWWaq80aVqIPJbibzibibnPKbk0s0IvQ/132"
      },
      mileStoneList: [{
          //0获取忍者
          type: 0,
          title: "宇智波佐助 【疾风传诅咒】",
          subTitle: "“天之咒印！！疾驰的黑色雷电”",
          date: "2019-12-25",
          picture: "../../images/banner_img.png"
        },
        {
          //1获得记录
          type: 1,
          title: "宇智波佐助 【疾风传诅咒】",
          subTitle: "“天之咒印！！疾驰的黑色雷电”",
          date: "2019-12-25",
          picture: "../../images/banner_img.png"
        }
      ]
    }
  }
})