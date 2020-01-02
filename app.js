const util = require('./utils/util');
//app.js
App({
  onLaunch: function () {
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
    // 模拟数据
    mock: {
      // 0-13月（19年1月至2020年2月所有月份）的活动总列表，每次请求特定月份，会在totalMonthSchedule数组的对应位置（0-13）插入特定月份的所有活动
      totalMonthSchedule: [{
        year: 2019,
        month: 0,
        //当前月份（19年1月）的所有日程列表
        schedules: [{
          // 日期
          date: 3,
          /**
           * 日程类别type int [1-3]
           * 1 黄色标记 大活动
           * 2 红色标记 里程碑
           * 3 绿色标记 日常活动
           */
          type: 1,
          id: 2,
          title: '宇智波佐助【疾风传咒印】登场',
          beginDate: "2019-11-29-5",
          endDate: "2019-12-13-5",
          message: "宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场"
        }, {
          date: 19,
          type: 1,
          id: 3,
          title: '宇智波佐助【疾风传咒印】登场',
          beginDate: "2019-11-29-5",
          endDate: "2019-12-13-5",
          message: "宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场"
        }, ]
      }, {
        year: 2019,
        month: 11,
        schedules: [{
            date: 3,
            type: 1,
            id: 1,
            title: '宇智波佐助【疾风传咒印】登场',
            beginDate: "2019-11-29-5",
            endDate: "2019-12-13-5",
            message: "宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场"
          }, {
            date: 29,
            type: 2,
            id: 5,
            title: '宇智波佐助【疾风传咒印】登场',
            beginDate: "2019-11-29-5",
            endDate: "2019-12-13-5",
            message: "宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场"

          }, {
            date: 3,
            type: 1,
            id: 2,
            title: '宇智波佐助【疾风传咒印】登场',
            beginDate: "2019-11-29-5",
            endDate: "2019-12-13-5",
            message: "宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场"
          }, {
            date: 19,
            type: 1,
            id: 3,
            title: '宇智波佐助【疾风传咒印】登场',
            beginDate: "2019-11-29-5",
            endDate: "2019-12-13-5",
            message: "宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场"
          }, {
            date: 30,
            type: 3,
            id: 4,
            title: '宇智波佐助【疾风传咒印】登场',
            beginDate: "2019-11-29-5",
            endDate: "2019-12-13-5",
            message: "宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场"
          },
          {
            date: 29,
            type: 2,
            id: 5,
            title: '宇智波佐助【疾风传咒印】登场',
            beginDate: "2019-11-29-5",
            endDate: "2019-12-13-5",
            message: "宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场"
          }
        ]
      }],
      playerInfo: {
        playId: 1,
        // 区名
        area: "扭曲丛林",
        // 角色名
        roleName: "疾风剑豪",
      }
    }
  }
})