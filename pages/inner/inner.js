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
    mileStoneList: [],
    // 弹窗状态
    bindRole: false,
    // 记录弹窗显示状态
    showRecord: true,
    year: '',
    month: '',
    date: ''
  },
  // 打开角色绑定弹窗
  handleOpenBindRole() {
    this.setData({
      bindRole: true
    })
  },
  // 关闭角色绑定弹窗
  handleCloseBindRole() {
    this.setData({
      bindRole: false
    })
  },
  // 关闭玩家获得的记录弹窗
  handleCloseRecord() {
    this.setData({
      showRecord: false
    })
  },
  // 返回首页
  backHome() {
    console.log("test")
    wx.redirectTo({
      url: "../index/index",
    })
  },
  //去学员档案--- 获得佐助XXX
  toStudentFile(e) {
    console.log(e);
    let ninjaname = e.currentTarget.dataset.ninjaname
    let ninjabanner = e.currentTarget.dataset.ninjabanner
    let ninjastory = e.currentTarget.dataset.ninjastory
    console.log(ninjaname, ninjabanner, ninjastory)
    let {
      year,
      month,
      date
    } = this.data;
    wx.redirectTo({
      url: `../studentFile/studentFile?year=${year}&month=${month}&date=${date}&ninjabanner=${ninjabanner}&ninjaname=${ninjaname}&ninjastory=${ninjastory}`,
    })
  },
  // 去学员档案 3种风格的那个 
  toRecord() {
    //传什么待定。
    let {
      year,
      month,
      date
    } = this.data;
    wx.redirectTo({
      url: `../record/record?year=${year}&month=${month}&date=${date}`,
    })
  },
  // 打开活动详情 trigger
  handleOpenDetail(data) {
    let index = data.currentTarget.dataset.index;
    console.log(index);
    let todayActList = this.data.todayActList;
    todayActList[index].show ? todayActList[index].show = false : todayActList[index].show = true;
    this.setData({
      todayActList,
    })
  },
  // 预约
  handleOrder(e) {
    let index = e.currentTarget.dataset.index;
    console.log(index);
    let todayActList = this.data.todayActList;
    todayActList[index].order == true ? todayActList[index].order = false : todayActList[index].order = true;
    this.setData({
      todayActList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let {
      year,
      month,
      date,
      actid
    } = options;
    year = month > 11 ? 2020 : 2019;
    month = month > 11 ? month - 12 : month;

    this.setData({
      year,
      month,
      date,
      mileStoneList: app.globalData.ninjaList
    })


    // 用 当天00:00pm 时间戳 作为条件来从总的活动列表totalActList来筛选活动出来，至于能否预约，是否已经预约，有待后端同学处理
    let t1 = new Date(year, month, date, 0).getTime();

    // 00:00pm timestamp
    let t2 = new Date(year, month, date, 24).getTime();

    // 间隔天数这个没用
    // let interval = Math.abs((t1 - t2) / (1000 * 60 * 60 * 24));
    let temp = [];
    let totalActList = app.globalData.totalActList;
    console.log(totalActList);

    totalActList.forEach((monthActList, index) => {
      // console.log(monthActList);
      monthActList.actList.forEach((act, i) => {
        console.log("t2", t2);
        console.log("act.startTimestamp:", act.startTimestamp);
        console.log("act.endtimeStamp:", act.endtimeStamp);
        if (act.endtimeStamp >= t2 && act.startTimestamp < t2) {
          act.show = false;
          temp.push(act);
          // console.log(act);
        }
      })
    })
    // 去重处理
    let a = {};
    let b = [];
    for (let i = 0; i < temp.length; i++) {
      if (!a[temp[i].id]) {
        b.push(temp[i]);
        a[temp[i].id] = true;
      }
    }
    actid = parseInt(actid);
    for (let i = 0; i < b.length; i++) {
      if (b[i].id == actid) {
        console.log(b[i])
        b[i].show = true;
      }
    }
    //找出已经预约的活动，首页点击已经预约活动进来的，带有id

    this.setData({
      todayActList: b
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      // todayActList: []
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})