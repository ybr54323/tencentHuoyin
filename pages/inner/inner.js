const app = getApp();
// pages/inner.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //模拟用户/玩家数据,活动数据
    todayActList: [],
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

        }],

      },
    },
  },
  backHome() {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    let {
      year,
      month,
      date
    } = options;
    let t1 = new Date(year, month, date, 0).getTime();

    // 00:00pm timestamp
    let t2 = new Date(year, month, date, 24).getTime();

    let interval = Math.abs((t1 - t2) / (1000 * 60 * 60 * 24));

    console.warn(interval);
    let temp = [];
    let totalActList = app.globalData.totalActList;
    console.log(totalActList);

    totalActList.forEach((monthActList, index) => {
      monthActList.actList.forEach((act, i) => {
        console.log("t2", t2);
        console.log("act.endtimeStamp:", act.endtimeStamp);
        console.log("act.startTimestamp:", act.startTimestamp);

        if (act.endtimeStamp >= t2 && act.startTimestamp < t2) {
          temp.push(act);
        }
      })
    })
    this.setData({
      todayActList: temp
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      todayActList: []
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})