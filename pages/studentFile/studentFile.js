// 学员档案1 忍者海报
import poster1 from '../../palette/poster1';
// pages/studentFile/studentFile.js
Page({
  imagePath: "",
  /**
   * 页面的初始数据
   */
  data: {
    image: "",
    template: {},
    userInfo: {
    },
    // 监控页面是否已经加载完，可生成海报
    canSave: false,
  },
  onImgOK(e) {
    this.imagePath = e.detail.path;
    this.setData({
      image: this.imagePath,
      canSave: true
    })
    console.log(e);
  },

  handlePhotoSaved() {
    if (!this.data.canSave) {
      wx.showToast({
        title: '请请稍再试，海报在生成中',
        icon: "loading"
      })
      return;
    }
    console.log(this.data.image);
    this.savePhoto(this.data.image)
  },
  // 保存图片
  savePhoto(path) {
    wx.showLoading({
      title: '正在保存...',
      mask: true
    })
    this.setData({
      isDrawImage: false
    })
    wx.saveImageToPhotosAlbum({
      filePath: path,
      success: (res) => {
        wx.showToast({
          title: '保存成功',
          icon: 'none'
        })
        setTimeout(() => {
          this.setData({
            visible: false
          })
        }, 300)
      },
      fail: (res) => {
        wx.getSetting({
          success: res => {
            let authSetting = res.authSetting
            if (!authSetting['scope.writePhotosAlbum']) {
              this.setData({
                isModal: true
              })
            }
          }
        })
        setTimeout(() => {
          wx.hideLoading()
          this.setData({
            visible: false
          })
        }, 300)
      }
    })
  },
  // 回到首页
  toHome() {
    wx.navigateTo({
      url: '../../pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const app = getApp();
    console.log(app.globalData);
    let nickName = app.globalData.mock.userInfo.nickName;
    let avatarUrl = app.globalData.mock.userInfo.avatarUrl;
    let userInfo = {
      nickName,
      avatarUrl
    }
    this.setData({
      userInfo,
    })
    let palette = new poster1().palette();
    console.log(palette)
    palette.views[0].url = "../../images/student_file_bg.png"
    //传用户头像图片url
    // palette.views[1].url = this.data.userInfo.nickName;
    //banner图
    // palette.views[2].url = ""
    //时间，例如 Wednesday,December 25,2019
    // palette.views[3].text = "";
    //忍者名,例: 宇智波佐助 【疾风传诅咒】
    // palette.views[4].text = "忍者名字";
    //subtitle 例: “天之咒印！！疾驰的黑色雷电”
    // palette.views[5].text = "“天之咒印！！疾驰的黑色雷电”";
    //星期 例: Wed
    // palette.views[6].text = "Wed";
    //mm月dd日 例子: 12月25日
    // palette.views[7].text = "12月25日";
    //传 二维码的url;
    // palette.views[8].text = "";
    //用户名 
    // palette.views[8].text = "";

    this.setData({
      template: palette
    });
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