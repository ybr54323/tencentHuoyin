//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperOption: {
      vertical: false,
      autoplay: false,
      interval: 2000,
      duration: 500
    },
    mock: [1, 2, 3, 4],
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
    year: '',
    month: '',
    days: "",
    swiperList: ["0", "1", "2"],
    current: {
      index: 1,
      month: new Date().getMonth() + 1
    },

    nowLi: '',
    index: 1
  },
  test(e) {
    const obj = getCurrentPages()[0].data;
    console.log(obj)
    switch (e.detail.current) {
      //往前滑动
      case obj.index - 1:
        let temp = obj.swiperList;

        temp.unshift("-1");
        temp[obj.index] = "0"

        getCurrentPages()[0].setData({
          swiperList: temp,
        })
        // e.detail = 
        console.log(obj.swiperList)
        console.log(obj.index)

        break;
    }
  },
  //需要一个方法获取当月日历该怎么显示


  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //初始化日期，日历填充日期
  getDate() {
    let now = new Date();
    this.setData({
      year: now.getFullYear(),
      // 0-11
      month: now.getMonth() + 1,
    })
    this.pushDays();
  },
  pushDays(year, month) {

    if (month == 0) {
      
    }
    let days = [];
    //当前月
    for (let i = 1; i <= this.getDays(year, month); i++) {
      //获取是周几
      let now = new Date();
      now.setFullYear(year);
      //月是0-11
      now.setMonth(month);
      now.setDate(i);
      let week = now.getDay();
      days.push({
        year,
        month,
        week,
        date: i
      })
    }
    //下个月
    for (let i = 1; i <= 42 - this.getDays(year, month) - this.getWeek(year, month); i++) {
      // 如果是12月(month=11)月的话,插入明年的日对象
      if (month >= 11) {
        // var nextYear = year + 1;
        let now = new Date();
        now.setFullYear(year);
        now.setMonth(month + 1);
        now.setDate(i)
        let week = now.getDay();
        days.push({
          year: year + 1,
          month: 13 - month,
          week,
          date: i
        })
      } else {
        // 否则就是插入今年下个月的
        let now = new Date();
        now.setFullYear(year);
        now.setMonth(month + 1);
        now.setDate(i);
        let week = now.getDay(i);
        days.push({
          year,
          month: month + 1,
          week,
          date: i
        })
      }
    }
    //上个月
    for (let i = 1; i <= this.getWeek(year, month); i++) {
      // 当前是一月的情况
      if (month == 0) {
        let prevYear = year - 1;
        let now = new Date();
        now.setFullYear(prevYear);
        now.setMonth(11);
        let week = now.getDay();
        days.unshift({
          year: prevYear,
          month: 11,
          week,
          date: i
        })
      } else {
        let now = new Date();
        now.setFullYear(year);
        now.setMonth(month - 1);
        let week = now.getDay(i);
        days.push({
          year,
          month: month - 1,
          week,
          date: i
        })
        days.unshift(i);
      }
    }
    return days;
  },
  //得到当前年这个月分有多少天
  getDays(Y, M) {
    let day = new Date(Y, M, 0).getDate()
    return day;
  },
  //得到当前年，这个月的一号是周几
  getWeek(Y, M) {
    let now = new Date()
    now.setFullYear(Y)
    now.setMonth(M - 1)
    now.setDate(1);
    let week = now.getDay();
    return week;
  },
  onLoad: function () {
    // 0-13月 19年1月至20年2月
    var tempList = [];
    for (let i = 0; i <= 13; i++) {
      tempList.push(this.pushDays(2019, i));
    }
    console.log(tempList);
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
  }
})