//index.js
//获取应用实例
const app = getApp()
wx.setEnableDebug({

  enableDebug: true

})
Page({
  data: {
    // 控制弹窗是否打开的状态
    bindRole: false,
    //模拟用户/玩家数据
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
        month: new Date().getFullYear() == 2019 ? new Date().getMonth() : new Date().getMonth() + 12
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
    // 月份列表
    monthList: [],

  },

  // 处理swiper的current值
  handleSwiperCurrent() {
    let m = this.month;
    let y = this.year;
    return m == 2019 ? m : m + 12;
  },
  onLoad: function() {
    // 生成2019年1月至2020年2月的所有日期对象，只拉一次
    // 先从缓存中拿
    let monthList = wx.getStorageSync("monthList");
    let totalActList = wx.getStorageInfoSync("totalActList");
    if (monthList instanceof Array && totalActList instanceof Array) {
      wx.showToast({
        title: '有缓存',
      })
      this.setData({
        monthList,
      })
      getApp().globalData.totalActList = totalActList;
    } else {
      wx.showToast({
        title: '无缓存',
      })
      this.initCalendar()
    }
  },
  // 打开绑定角色界面
  handleOpenRoleBind() {
    this.setData({
      bindRole: !this.data.bindRole
    })
    console.log(this.data.bindRole)
  },
  handleCloseBindRole() {
    this.setData({
      bindRole: !this.data.bindRole
    })
  },

  handleDateTap(e) {
    let y, m, d;
    // 当前点击的日期对象
    let paramObj = e.currentTarget.dataset;
    try {
      y = paramObj.year;
      m = paramObj.month;
      d = paramObj.date;
    } catch (error) {
      console.warn(error.message);
    }
    console.warn(y, m, d);

    wx.navigateTo({
      url: `../inner/inner?year=${y}&month=${m}&date=${d}`,

    })
  },
  /**
   * 
   * @param {d} e 跳转内页
   */
  toInner() {
    wx.navigateTo({
      url: '../inner/inner',
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
        month: index,
        year: 2020,
      })
    }
  },
  formatTime(date) {
    var time = date == null ? "" : Date.parse(date.replace(/-/g, '/'));
    var date = new Date(time);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return [year, month, day].map(formatNumber).join('/');
  },
  /**
   * 插入2019年1月至2020年2月所有的日期对象
   * 并把对应日期的活动插入到monthList上对应的日期，方便生成日历，标识日期，传参数等
   */
  initCalendar() {

    let monthList = [];
    for (let m = 0; m < 14; m++) {
      monthList.push(this.initMonthDays(m));
    }
    const _this = this;
    wx.request({
      url: `https://hyrz.qq.com/zlkdatasys/data_zlk_nlhdlb.json`,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      fail(res) {
        wx.showToast({
          title: "fail",
          icon: 'success',
          duration: 2000
        })
      },
      complete(res) {
        wx.showToast({
          title: "complete",
          icon: 'success',
          duration: 2000
        })
      },
      success: function(res) {

        console.warn(res);
        let actList = res.data.actassets_54;
        actList.forEach(act => {
          //
          let actTime = act.acttime_de;
          let detail = act.detail_21;

          let endDateObj = new Date(act.enddate_99.replace(/-/g, '/'));
          console.warn(act.enddate_99.replace(/-/g, '/'))
          let importance = act.importance_35;
          let picture = act.picture_28;
          let startDateObj = new Date(act.startdate_ec.replace(/-/g, '/'));
          let title = act.title_02;
          //

          let year = startDateObj.getFullYear();
          let month = year > 2019 ? startDateObj.getMonth() + 12 : startDateObj.getMonth();
          let date = startDateObj.getDate();
          let startTimestamp = startDateObj.getTime();
          let endtimeStamp = endDateObj.getTime();

          let obj = {
            //
            actTime,
            detail,
            endDateObj,
            importance,
            picture,
            startDateObj,
            title,
            //
            year,
            month,
            date,
            startTimestamp,
            endtimeStamp,
          };
          console.warn(obj);
          var m = month;
          let tal = app.globalData.totalActList;
          tal[month].actList.push(obj);

          getApp().globalData.totalActList = tal;

          let monthList = _this.data.monthList;

          let monthDateList = monthList[month];

          for (let i = 0; i < monthDateList.length; i++) {
            let item = monthDateList[i];
            if (item.month == month && item.date == date) {
              item.actList.push(obj);
              break;
            }
          }
          _this.setData({
            monthList
          })
        })
      },
      fail: function(res) {
        wx.showToast({
          title: res,
        })
      },
      complete: function(res) {},
    })
    _this.setData({
      monthList,
    }, () => {
      wx.setStorageSync("totalActList", app.globalData.totalActList);
      wx.setStorage({
        key: "monthList",
        data: monthList,
        success() {},
        fail(res) {
          wx.showToast({
            title: res,
          })
        }
      })
    })
    //缓存
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
          timestamp: new Date(2019, m, i).getTime(),
          schedules: [],
          currentMonth: true,
          actList: []
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
          timestamp: new Date(2019, nextM, i).getTime(),
          schedules: [],
          actList: []

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
          timestamp: new Date(2019, prevM, lastMonthDays - i).getTime(),
          schedules: [],
          actList: []
        })
      }
      // console.log(...daysList)
      return daysList;
    }
  },
})