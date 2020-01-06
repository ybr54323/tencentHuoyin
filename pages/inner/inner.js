const app = getApp();
// pages/inner.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //模拟用户/玩家数据,活动数据
    todayActList: [],
    // 里程碑，获得忍者或者记录什么的
    mileStoneList: [{
      name: 'test',
    }, {
      name: 'test1'
    }],
    // 弹窗状态
    bindRole: false,
    // 记录弹窗显示状态
    showRecord: true,

  },
  toStudentFile() {
    wx.navigateTo({
      url: '../../studentFile/studentFile',
    })
  },
  handleOpenBindRole() {
    this.setData({
      bindRole: true
    })
  },
  handleCloseBindRole() {
    this.setData({
      bindRole: false
    })
  },
  handleCloseRecord() {
    this.setData({
      showRecord: false
    })
  },
  backHome() {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  //去学员档案---获得忍者
  toStudentFile() {
    wx.navigateTo({
      url: '../../pages/record/record',
    })
  },
  // 去学员档案
  toRecord() {
    wx.navigateTo({
      url: '../../pages/studentFile/studentFile',
    })
  },
  handleOpenDetail(data) {
    let index = data.currentTarget.dataset.index;
    console.log(index);
    let todayActList = this.data.todayActList;
    todayActList[index].show ? todayActList[index].show = false : todayActList[index].show = true;
    this.setData({
      todayActList,
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
      console.log(monthActList);
      monthActList.actList.forEach((act, i) => {
        console.log("t2", t2);
        console.log("act.startTimestamp:", act.startTimestamp);
        console.log("act.endtimeStamp:", act.endtimeStamp);
        //注意。。。。为了应付他给我返回开始时间跟结束时间一样的活动，除个2
        if (act.endtimeStamp >= (t2 / 2) && act.startTimestamp < t2) {
          act.show = false;
          temp.push(act);
          console.log(act);
        }
      })
    })
    //应付无数据
    temp.push({
      actTime: "11月1日23:30至11月5日6:00",
      date: 31,
      detail: "文字限制在90个字内",
      endtimeStamp: 1577773402000,
      importance: 1,
      month: 11,
      picture: "../../images/banner_img.png",
      startTimestamp: 1577773402000,
      title: "文字限制在20个字内",
      year: 2019,
      show: false,
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
      // todayActList: []
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