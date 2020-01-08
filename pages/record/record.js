// 学员档案1-3 json文件
import style1 from '../../palette/style1';
import style2 from '../../palette/style2';
import style3 from '../../palette/style3';

// pages/record.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 风格123,初始是1
    style: 1,
    userInfo: app.globalData.mock.userInfo,
    // 建议这里字数不超过6个字，若要更多，该json文件中的fontsize
    word1: "刷新最高连胜记录!!",
    word2: "最新纪录14场",
    word3: "最新纪录14场",
    year: '',
    month: '',
    date: '',
    week: ["日", "一", "二", "三", "四", "五", "六"][new Date().getDay()],
    // 风格1-3的图片路径
    image1: "",
    image2: "",
    image3: "",
    // 监控页面是否已经加载完，可生成海报
    canSave1: false,
    canSave2: false,
    canSave3: false,
    //风格1-3的图片生成json
    template1: "",
    template2: "",
    template3: "",
    //绘制风格1的海报需要的下标
    index: "",
    //风格3的海报需要的下表
    index3: "",
  },
  // 监控3个style的海报状态，canSave为true才能保存
  onImgOK(e) {
    const _this = this;
    let style = parseInt(e.currentTarget.dataset.style);
    let path = e.detail.path
    switch (parseInt(style)) {
      case 1:
        _this.setData({
          image1: path,
          canSave1: true,
        })
        break;
      case 2:
        _this.setData({
          image2: path,
          canSave2: true,
        })
        break;
      case 3:
        _this.setData({
          image3: path,
          canSave3: true,
        })
        break;
    }
  },
  // 保存图片
  handleSavePhoto() {
    // 获取当前的style，风格是几号
    let style = this.data.style;
    switch (style) {
      // 待对应的海报生成完毕
      case 1:
        if (!this.data.canSave1) {
          wx.showToast({
            title: '请请稍再试',
            icon: "loading"
          })
          return;
        }
        console.log(this.data.image1);
        this.savePhoto(this.data.image1)
        break;
      case 2:
        if (!this.data.canSave2) {
          wx.showToast({
            title: '请请稍再试',
            icon: "loading"
          })
          return;
        }
        console.log(this.data.image2);
        this.savePhoto(this.data.image2)
        break;
      case 3:
        if (!this.data.canSave3) {
          wx.showToast({
            title: '请请稍再试',
            icon: "loading"
          })
          return;
        }
        console.log(this.data.image3);
        this.savePhoto(this.data.image3)
        break;
    }
  },
  // 保存图片
  savePhoto(path) {
    wx.showLoading({
      title: '正在保存...',
      mask: true
    })

    wx.saveImageToPhotosAlbum({
      filePath: path,
      success: (res) => {
        wx.showToast({
          title: '保存成功',
          icon: 'none'
        })

      },
      fail: (res) => {
        wx.getSetting({
          success: res => {
            let authSetting = res.authSetting
            if (!authSetting['scope.writePhotosAlbum']) {

            }
          }
        })
        setTimeout(() => {
          wx.hideLoading()

        }, 300)
      }
    })
  },
  switch (e) {
    console.log(e);
    let style = parseInt(e.currentTarget.dataset.style);
    this.setData({
      style
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.warn(options)
    this.setData({
      year: parseInt(options.year),
      month: parseInt(options.month),
      date: parseInt(options.date),
      day: parseInt(new Date(options.year, options.month, options.date).getDay()),
      // ninjaname: options.ninjaname,
      // ninjabanner: options.ninjabanner,
      // ninjastory: options.ninjastory
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const _this = this;
    let nickName = app.globalData.mock.userInfo.nickName;
    let avatarUrl = app.globalData.mock.userInfo.avatarUrl;
    let userInfo = {
      nickName,
      avatarUrl
    }
    this.setData({
      userInfo,
    })
    // 生成3种风格的海报模版json文件
    //风格1
    let sty1 = new style1().palette();
    console.log(sty1)
    //风格1背景图
    sty1.views[0].url = "../../images/style1.png"
    //传用户头像图片url
    sty1.views[1].url = this.data.userInfo.avatarUrl;
    //玩家名称
    sty1.views[2].text = this.data.userInfo.nickName;
    //开始第一条记录
    let word1 = this.data.word1;
    let word2 = this.data.word2;
    for (let i = 0; i < word1.length; i++) {
      sty1.views.push({
        "type": "text",
        "text": word1[i],
        "css": {
          "color": "#4c0e05",
          "background": "rgba(0,0,0,0)",
          "width": "44rpx",
          "height": "44.06999999999999px",
          "top": 207 + 42 * i + "rpx",
          "left": "44rpx",
          "rotate": "0",
          "borderRadius": "",
          "borderWidth": "",
          "borderColor": "#000000",
          "shadow": "",
          "padding": "0px",
          "fontSize": "39rpx",
          "fontWeight": "normal",
          "maxLines": "1",
          "lineHeight": "43.290000000000006px",
          "textStyle": "fill",
          "textDecoration": "none",
          "fontFamily": "",
          "textAlign": "center"
        }
      })
    }
    // 开始第二条记录
    // 第二竖排不能超过6个字
    word2 = word2.slice(0, 7);
    for (let i = 0; i < word2.length; i++) {
      // 数字
      if (!isNaN(word2[i])) {
        if (!_this.data.index) {
          _this.setData({
            index: i
          })
        }
        sty1.views.push({
          "type": "text",
          "text": word2[i],
          "css": {
            "color": "#df4900",
            "background": "rgba(0,0,0,0)",
            "width": "70rpx",
            "height": "54rpx",
            "top": 276 + parseInt(_this.data.index) * 56 + "rpx",
            "left": 90 + (i - parseInt(_this.data.index)) * 40 + "rpx",
            "rotate": "0",
            "borderRadius": "",
            "borderWidth": "",
            "borderColor": "#000000",
            "shadow": "",
            "padding": "0rpx",
            "fontSize": "73rpx",
            "fontWeight": "bolder",
            "maxLines": "1",
            "lineHeight": "53rpx",
            "textStyle": "fill",
            "textDecoration": "none",
            "fontFamily": "",
            "textAlign": "center"
          }
        })
      } else {
        if (_this.data.index) {
          sty1.views.push({
            "type": "text",
            "text": word2[i],
            "css": {
              "color": "#4c0e05",
              "background": "rgba(0,0,0,0)",
              "width": "70rpx",
              "height": "54rpx",
              "top": 296 + (_this.data.index + 1) * 56 + "rpx",
              "left": "116rpx",
              "rotate": "0",
              "borderRadius": "",
              "borderWidth": "",
              "borderColor": "#000000",
              "shadow": "",
              "padding": "0rpx",
              "fontSize": "53rpx",
              "fontWeight": "bolder",
              "maxLines": "1",
              "lineHeight": "53rpx",
              "textStyle": "fill",
              "textDecoration": "none",
              "fontFamily": "",
              "textAlign": "center"
            }
          })
          _this.setData({
            index: _this.data.index + 1
          })
        } else {
          sty1.views.push({
            "type": "text",
            "text": word2[i],
            "css": {
              "color": "#4c0e05",
              "background": "rgba(0,0,0,0)",
              "width": "70rpx",
              "height": "54rpx",
              "top": 276 + i * 56 + "rpx",
              "left": "116rpx",
              "rotate": "0",
              "borderRadius": "",
              "borderWidth": "",
              "borderColor": "#000000",
              "shadow": "",
              "padding": "0rpx",
              "fontSize": "53rpx",
              "fontWeight": "bolder",
              "maxLines": "1",
              "lineHeight": "53rpx",
              "textStyle": "fill",
              "textDecoration": "none",
              "fontFamily": "",
              "textAlign": "center"
            }
          })
        }
      }

    }
    //插入年份
    sty1.views.push({
      "type": "text",
      "text": (_this.data.year).toString(),
      "css": {
        "color": "#4c0e05",
        "background": "rgba(0,0,0,0)",
        "width": "93rpx",
        "height": "36.16rpx",
        "top": "677rpx",
        "left": "184rpx",
        "rotate": "0",
        "borderRadius": "",
        "borderWidth": "",
        "borderColor": "#000000",
        "shadow": "",
        "padding": "0rpx",
        "fontSize": "32rpx",
        "fontWeight": "bolder",
        "maxLines": "1",
        "lineHeight": "35.52rpx",
        "textStyle": "fill",
        "textDecoration": "none",
        "fontFamily": "",
        "textAlign": "center"
      }
    })
    // 插入月，周
    sty1.views.push({
      "type": "text",
      "text": `${+_this.data.month + 1}月${_this.data.date}日 星期${_this.data.week}`,
      "css": {
        "color": "#4c0e05",
        "background": "rgba(0,0,0,0)",
        "width": "264rpx",
        "height": "28.249999999999996rpx",
        "top": "716rpx",
        "left": "53rpx",
        "rotate": "0",
        "borderRadius": "",
        "borderWidth": "",
        "borderColor": "#000000",
        "shadow": "",
        "padding": "0rpx",
        "fontSize": "25rpx",
        "fontWeight": "bold",
        "maxLines": "1",
        "lineHeight": "27.750000000000004rpx",
        "textStyle": "fill",
        "textDecoration": "none",
        "fontFamily": "",
        "textAlign": "center"
      }
    })
    // 插入二维码的url content: https://hyrz.qq.com/模拟
    sty1.views.push({
      "type": "qrcode",
      "content": "https://hyrz.qq.com/",
      "css": {
        "color": "#000000",
        "background": "#ffffff",
        "width": "161rpx",
        "height": "161rpx",
        "top": "902rpx",
        "left": "557rpx",
        "rotate": "0",
        "borderRadius": ""
      }
    })
    this.setData({
      template1: sty1
    });

    // 风格2
    let sty2 = new style2().palette();
    console.log(sty2);
    sty2.views[0].url = "../../images/style2.png"
    //传用户头像图片url
    sty2.views[1].url = this.data.userInfo.avatarUrl;
    //玩家名称
    sty2.views[2].text = this.data.userInfo.nickName;
    //12月25号 星期三
    sty2.views[3].text = `${this.data.month + 1}月${this.data.date}号  星期${this.data.week}`;
    //乙亥年 【猪年】
    sty2.views[4].text = this.data.year == 2019 ? "乙亥年【猪年】" : "庚子年【鼠年】";
    sty2.views[5].text = this.data.date.toString();
    //记录
    sty2.views[6].text = this.data.word1;
    //sub记录
    for (let i = 0; i < word2.length; i++) {
      if (isNaN(word2[i])) {
        sty2.views.push({
          "type": "text",
          "text": word2[i],
          "css": {
            "color": "#85473e",
            "background": "rgba(0,0,0,0)",
            "width": "322rpx",
            "height": "42.94rpx",
            "top": "647rpx",
            "left": 56 + i * 40 + "rpx",
            "rotate": "0",
            "borderRadius": "",
            "borderWidth": "",
            "borderColor": "#000000",
            "shadow": "",
            "padding": "0rpx",
            "fontSize": "38rpx",
            "fontWeight": "bold",
            "maxLines": "1",
            "lineHeight": "42.18000000000001rpx",
            "textStyle": "fill",
            "textDecoration": "none",
            "fontFamily": "",
            "textAlign": "left"
          }
        })
      } else {
        sty2.views.push({
          "type": "text",
          "text": word2[i],
          "css": {
            "color": "#df4900",
            "background": "rgba(0,0,0,0)",
            "width": "322rpx",
            "height": "42.94rpx",
            "top": "637rpx",
            "left": 56 + i * 40 + "rpx",
            "rotate": "0",
            "borderRadius": "",
            "borderWidth": "",
            "borderColor": "#000000",
            "shadow": "",
            "padding": "0rpx",
            "fontSize": "59rpx",
            "fontWeight": "bold",
            "maxLines": "1",
            "lineHeight": "42.18000000000001px",
            "textStyle": "fill",
            "textDecoration": "none",
            "fontFamily": "",
            "textAlign": "left"
          }
        })
      }
      //插入二维码
      sty2.views.push({
        "type": "qrcode",
        "content": "https://hyrz.qq.com/",
        "css": {
          "color": "#000000",
          "background": "#ffffff",
          "width": "161rpx",
          "height": "161rpx",
          "top": "902rpx",
          "left": "557rpx",
          "rotate": "0",
          "borderRadius": ""
        }
      })
    }

    this.setData({
      template2: sty2
    });

    // 风格3
    let sty3 = new style3().palette();
    console.log(sty3)

    // console.log(sty3)
    sty3.views[0].url = "../../images/style3.png"
    //传用户头像图片url
    sty3.views[1].url = this.data.userInfo.avatarUrl;
    //banner图
    sty3.views[2].text = this.data.userInfo.nickName;
    var j = 0;
    for (let i = 0; i < word2.length; i++) {
      if (i <= 3) {
        sty3.views.push({
          "type": "text",
          "text": word2[i],
          "css": {
            "color": "#7d2a0a",
            "background": "rgba(0,0,0,0)",
            "width": "40rpx",
            "height": "42.94rpx",
            "top": "348rpx",
            "left": 30 + i * 40 + "rpx",
            "rotate": "0",
            "borderRadius": "",
            "borderWidth": "",
            "borderColor": "#000000",
            "shadow": "",
            "padding": "0rpx",
            "fontSize": "38rpx",
            "fontWeight": "normal",
            "maxLines": "1",
            "lineHeight": "42.18000000000001rpx",
            "textStyle": "fill",
            "textDecoration": "none",
            "fontFamily": "",
            "textAlign": "left"
          }
        })
      } else {
        // 非数字
        if (isNaN(word2[i])) {
          sty3.views.push({
            "type": "text",
            "text": word2[i],
            "css": {
              "color": "#7d2a0a",
              "background": "rgba(0,0,0,0)",
              "width": "40rpx",
              "height": "42.94rpx",
              "top": "405rpx",
              "left": 30 + j * 40 + "rpx",
              "rotate": "0",
              "borderRadius": "",
              "borderWidth": "",
              "borderColor": "#000000",
              "shadow": "",
              "padding": "0rpx",
              "fontSize": "38rpx",
              "fontWeight": "normal",
              "maxLines": "1",
              "lineHeight": "42.18000000000001rpx",
              "textStyle": "fill",
              "textDecoration": "none",
              "fontFamily": "",
              "textAlign": "left"
            }
          })
        } else {
          // 数字
          sty3.views.push({
            "type": "text",
            "text": word2[i],
            "css": {
              "color": "#df4900",
              "background": "rgba(0,0,0,0)",
              "width": "40rpx",
              "height": "42.94rpx",
              "top": "400rpx",
              "left": 30 + j * 40 + "rpx",
              "rotate": "0",
              "borderRadius": "",
              "borderWidth": "",
              "borderColor": "#000000",
              "shadow": "",
              "padding": "0rpx",
              "fontSize": "62rpx",
              "fontWeight": "bold",
              "maxLines": "1",
              "lineHeight": "42.18000000000001rpx",
              "textStyle": "fill",
              "textDecoration": "none",
              "fontFamily": "",
              "textAlign": "left"
            }
          })
        }
        j++;
      }
    }
    var j = 0;
    for (let i = 0; i < word1.length; i++) {
      //第四个字就换行
      if (i <= 3) {
        sty3.views.push({
          "type": "text",
          "text": word1[i],
          "css": {
            "color": "#7d2a0a",
            "background": "rgba(0,0,0,0)",
            "width": "200rpx",
            "height": "42.94rpx",
            "top": "348rpx",
            "left": 546 + i * 40 + "rpx",
            "rotate": "0",
            "borderRadius": "",
            "borderWidth": "",
            "borderColor": "#000000",
            "shadow": "",
            "padding": "0rpx",
            "fontSize": "38rpx",
            "fontWeight": "normal",
            "maxLines": "1",
            "lineHeight": "42.18000000000001rpx",
            "textStyle": "fill",
            "textDecoration": "none",
            "fontFamily": "",
            "textAlign": "left"
          }
        })
      } else {
        sty3.views.push({
          "type": "text",
          "text": word1[i],
          "css": {
            "color": "#7d2a0a",
            "background": "rgba(0,0,0,0)",
            "width": "200rpx",
            "height": "42.94rpx",
            "top": "393rpx",
            "left": 546 + j * 40 + "rpx",
            "rotate": "0",
            "borderRadius": "",
            "borderWidth": "",
            "borderColor": "#000000",
            "shadow": "",
            "padding": "0rpx",
            "fontSize": "38rpx",
            "fontWeight": "normal",
            "maxLines": "1",
            "lineHeight": "42.18000000000001rpx",
            "textStyle": "fill",
            "textDecoration": "none",
            "fontFamily": "",
            "textAlign": "left"
          }
        })
        j++;
      }
    }
    //插入二维码
    // sty3.views[3].url = "qrcodeurl"
    this.setData({
      template3: sty3
    });
  },
  // 返回首页
  toHome() {
    wx.redirectTo({
      url: '../../pages/index/index',
    })
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