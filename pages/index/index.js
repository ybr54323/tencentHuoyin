//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    app: app,
    motto: 'Hello World',
    userInfo: {},
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
    actList: [],
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
    const _this = this;
    wx.request({
      url: `https://hyrz.qq.com/zlkdatasys/data_zlk_nlhdlb.json`,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        let actList = res.data.actlist_02[0].actassets_54;
        actList.forEach(act => {
          //
          let actTime = act.acttime_de;
          let detail = act.detail_21;
          let endDateObj = new Date(act.enddate_99);
          let importance = act.importance_35;
          let picture = act.picture_28;
          let startDateObj = new Date(act.startdate_ec);
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
          console.log(obj);

          let tal = app.globalData.totalActList;
          
          tal[month].actList.push(obj);

          getApp().globalData.totalActList = tal;

          let monthList = _this.data.monthList;

          let monthDateList = monthList[month];

          for (let i = 0; i < monthDateList.length; i++) {
            let item = monthDateList[i];
            if (item.month == month && item.date == date) {
              console.log('ddddddd');
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
        console.log(res)
      },
      complete: function(res) {
        // console.log(res)
      },
    })

    // 当前月份的所有日程,
    let totalMonthSchedule = app.globalData.mock.totalMonthSchedule
    // 遍历所有日程
    for (let i = 0; i < totalMonthSchedule.length; i++) {
      // 获取到有日程的月份的月份month
      if (totalMonthSchedule[i].month >= 0) {
        // 遍历有日程的月份的日程数组
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
  // 处理swiper的current值
  handleSwiperCurrent() {
    let m = this.month;
    let y = this.year;
    return m == 2019 ? m : m + 12;
  },
  onLoad: function() {
    // 生成2019年1月至2020年2月的所有日期对象
    this.initCalendar();

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
        month: index,
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