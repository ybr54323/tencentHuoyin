//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    //模拟用户/玩家数据
    mock: {
      playerInfo: {
        schedules: [{
          id: 1,
          title: "宇智波佐助【疾风传咒印】登场",
          beginDate: "2019-11-29-5",
          endDate: "2019-12-13-5",
          message: "宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场"
        }, {
          id: 2,
          title: "宇智波佐助【疾风传咒印】登场",
          beginDate: "2019-11-29-5",
          endDate: "2019-12-13-5",
          message: "宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场"
        }, {
          id: 2,
          title: "宇智波佐助【疾风传咒印】登场",
          beginDate: "2019-11-29-5",
          endDate: "2019-12-13-5",
          message: "宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场"
        }, {
          id: 2,
          title: "宇智波佐助【疾风传咒印】登场",
          beginDate: "2019-11-29-5",
          endDate: "2019-12-13-5",
          message: "宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场"

        }]
      },
    },
    playerInfo: {
      schedules: [{
        id: 1,
        title: "宇智波佐助【疾风传咒印】登场",
        beginDate: "2019-11-29-5",
        endDate: "2019-12-13-5",
        message: "宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场"
      }, {
        id: 2,
        title: "宇智波佐助【疾风传咒印】登场",
        beginDate: "2019-11-29-5",
        endDate: "2019-12-13-5",
        message: "宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场"
      }, {
        id: 2,
        title: "宇智波佐助【疾风传咒印】登场",
        beginDate: "2019-11-29-5",
        endDate: "2019-12-13-5",
        message: "宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场"
      }, {
        id: 2,
        title: "宇智波佐助【疾风传咒印】登场",
        beginDate: "2019-11-29-5",
        endDate: "2019-12-13-5",
        message: "宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场宇智波佐助【疾风传咒印】登场"

      }]
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //页面的大 月份
    month: new Date().getMonth(),
    //年
    year: new Date().getFullYear(),
    //月份英文名
    monthEnglishName: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    // swiper参数
    swiperOption: {
      vertical: false,
      autoplay: false,
      interval: 2000,
      duration: 500,
      //当前月份,参数
      current: {
        index: 1,
        month: new Date().getMonth()
      },
    },
    // 日历的周日至周六
    week: [{
      name: "日",
      color: true,
    }, {
      name: "一",
    }, {
      name: "二",
    }, {
      name: "三",
    }, {
      name: "四",
    }, {
      name: "五",
    }, {
      name: "六",
      color: true,
    }],
    nowLi: '',
    index: 1,
    // 月份列表
    monthList: [],
  },
  /**
   * 插入2019年1月至2020年2月所有的日期对象
   */
  initCalendar() {
    let monthList = [];
    for (let m = 0; m < 14; m++) {
      monthList.push(this.initMonthDays(m));
    }
    // 当前月份的所有日程,
    let totalMonthSchedule = app.globalData.mock.totalMonthSchedule
    for (let i = 0; i < totalMonthSchedule.length; i++) {
      if (totalMonthSchedule[i].month >= 0) {
        totalMonthSchedule[i].schedules.forEach(schedule => {
          //遍历当前月份的所有日期
          for (let j = 0; j < monthList[totalMonthSchedule[i].month].length; j++) {
            // 日期对上了，就绑定活动信息到对应的日期
            if (monthList[totalMonthSchedule[i].month][j].date == schedule.date) {
              // 将日程插入到日期的总日程数组
              monthList[totalMonthSchedule[i].month][j].schedules.push(schedule);
            }
          }
        })
        // monthList[totalMonthSchedule[i].month]
      }
    }
    this.setData({
      monthList
    })
  },
  onLoad: function () {
    // 生成2019年1月至2020年2月的所有日期对象
    this.initCalendar();

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 
   * @param {d} e 跳转内页
   */
  toInner() {
    wx.navigateTo({
      url: '../inner/inner', //跳转的路径
    })
  },
  /**
   * 监控滑动，改变页面上的月份，月份英文名，年份
   */
  changeMonth(e) {
    // index对应0-13，对应19年1月至2020年2月
    const index = e.detail.current;
    if (index <= 11) {
      this.setData({
        month: index,
        year: 2019,
      })
      return
    } else {
      //2020年了
      this.setData({
        month: index - 12,
        year: 2020,
      })
    }
  },
  /**
   * @param {*} m int 0-13，可生成19年1月到2020年2月所有月份所有日期对象，生成带有查询参数(date,month,year,week)的日期对象
   */
  initMonthDays(m) {
    if (isNaN(m)) {
      throw new Error("initMonthDays m 必须为数字");
    }
    m = parseInt(m)
    if (m < 0 || m > 13) {
      throw new Error("initMonthDays m 取值正确,m: ", m);
    }
    return pushDays(m);
    /**
     * 
     * @param int 0-13 (19年1月->20年2月) 例如1月就传 m=0
     */
    function getDaysNum(m) {
      return new Date(2019, m + 1, 0).getDate();
    }
    /**
     * @param int 0-13 (19年1月->20年2月) m
     * 获取当月的1号是星期几，
     */
    function getWeekOfTheMonth1st(m) {
      return new Date(2019, m, 1).getDay();
    }

    function getWeekOfTheDate(m, d) {
      return new Date(2019, m, d).getDay();
    }
    /**
     * 插入当月的所有日期
     */
    function pushDays() {
      let daysList = [];
      // 先获取当月的天数
      //将这个月多少天加入数组days
      for (let i = 1; i <= getDaysNum(m); i++) {
        // 日期带上相关的参数
        // schedule 当天的日程列表
        daysList.push({
          date: i,
          month: m,
          year: 2019,
          week: new Date(2019, m, i).getDay(),
          schedules: []
        })
      }
      //将下个月要显示的天数加入days
      for (let i = 1; i <= 42 - getDaysNum(m) - getWeekOfTheMonth1st(m); i++) {
        let nextM = m + 1;
        daysList.push({
          date: i,
          month: nextM,
          year: 2019,
          week: new Date(2019, nextM, i).getDay(),
          schedules: []
        })
      }
      //将上个月要显示的天数加入days
      for (let i = 0; i < getWeekOfTheMonth1st(m); i++) {
        var lastMonthDays = getDaysNum(m - 1)
        let prevM = m - 1
        daysList.unshift({
          date: lastMonthDays - i,
          month: prevM,
          year: 2019,
          week: new Date(2019, prevM, lastMonthDays - i).getDay(),
          schedules: []
        })
      }
      // console.log(...daysList)
      return daysList;
    }
  },
})