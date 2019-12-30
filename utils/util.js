const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 
 * @param {d} Date 格式化schedule的时间，以在输出页面 
 */

const myFormatTime = time => {
  let m, d, h, res;
  let tempDate = new Date(date);
  console.log(date);
  try {
    m = tempDate.getMonth();
    d = tempDate.getDate();
    h = tempDate.getHours();
  } catch (e) {
    console.warn(e);
    console.log(m, d, h)
  }
  res = m + "月" + d + "日" + h;
  console.log(res)
  return res;
}
/**
 * 请求数据
 * url: 请求地址
 * params: 请求参数
 * successCallback: 请求成功执行函数
 * errorCallback: 请求错误执行函数
 * completeCallback: 请求成功或失败都执行函数
 */
// GET请求
const wxRequest = (url, params, successCallback, errorCallback, completeCallback) => {
  wx.request({
    url: url, // 接口地址
    data: params || {},
    header: {
      'content-type': 'application/json' // 默认值
    },
    method: 'GET',
    success(res) {
      // console.log(res)
      if (res.statusCode == 200) {
        successCallback(res.data);
      } else {
        errorCallback(res);
      }
    },
    fail(res) {
      errorCallback(res);
    },
    complete(res) {
      completeCallback(res);
    }
  })
}
// POST请求
const wxRequestPost = (url, params, successCallback, errorCallback, completeCallback) => {
  wx.request({
    url: url, // 接口地址
    data: params || {},
    header: {
      'content-type': 'application/json' // 默认值
    },
    method: 'POST',
    success(res) {
      // console.log(res)
      if (res.statusCode == 200) {
        successCallback(res.data);
      } else {
        errorCallback(res);
      }
    },
    fail(res) {
      errorCallback(res);
    },
    complete(res) {
      completeCallback(res);
    }
  })
}

module.exports = {
  formatTime: formatTime,
  myFormatTime: myFormatTime,
  wxRequest,
  wxRequestPost
}