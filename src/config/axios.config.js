import axios from 'axios';
import AJAXMODE from 'AjaxMode';
import {message} from 'components';
import {removeItem, getItem} from './storage';

// let baseURL = config.baseURL;
// window.loginUrl = config.loginUrl;

let ip = '';

axios.defaults.baseURL = ip + '';
axios.defaults.timeout = 30000;

getItem('token').then(res => {});

getItem('user').then(res => {});

/**
 * @description  请求全局拦截
 * @param  {boolean} transFormData  post方法 true转form提交表单方式
 * */
axios.interceptors.request.use(
  config => {
    if (config.data && config.data.transFormData) {
      config.headers['Content-Type'] =
        'application/x-www-form-urlencoded;charset=utf-8';
      delete config.data.transFormData;
      // config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

/**
 * @description ajax 请求
 * @param {Object} ajaxData 配置 ajax 请求的键值对集合
 * @param {String} ajaxData.type 创建请求使用的方法
 * @param {String} ajaxData.url 请求服务器的 URL
 * @param {Object} ajaxData.data 与请求一起发送的 URL 参数
 */
function ajax(ajaxData = {}) {
  // post转form表单提交方式
  if (ajaxData.transFormData) {
    ajaxData.data = {...ajaxData.data, transFormData: true};
  }

  return new Promise((resolve, reject) => {
    if (Object.prototype.toString.call(ajaxData) !== '[object Object]') {
      return reject(new Error('ajax请求配置错误'));
    }
    let method = (ajaxData.type || 'GET').toLowerCase();

    let data =
      method === 'get' ? {params: ajaxData.data} : {data: ajaxData.data};

    let obj = {
      ...ajaxData,
      method,
      ...data,
    };

    delete obj.type;

    axios(obj)
      .then(res => {
        if (
          res.data.code === 30008 ||
          res.data.code === 30009 ||
          res.data.code === 40005 ||
          res.data.code === 40006 ||
          res.data.code === 40001
        ) {
          loginOut();
        } else {
          resolve(res.data);
        }
        //  else {
        //   reject(res)
        // }
      })
      .catch(err => {
        debugger;
        let response = err.response;
        if (response) {
          switch (response.code) {
            case 401:
              loginOut();
              break;
            case 308:
              loginOut();
              break;
            case 500:
              message.error('服务器响应失败');
              break;
            case 504:
              message.error('请求超时');
              break;
          }
        }
        return reject(err);
      });
  });
}

const setAjaxHeader = (key, value) => {
  axios.defaults.headers.common[key] = value;
};

const loginOut = () => {
  removeItem('token');
  removeItem('user');

  // 防止多次退出登录
  let nowRoute = RootNavigation?.navigationRef?.current?.getCurrentRoute();

  if (nowRoute?.name == 'Login') {
    return;
  }

  RootNavigation.reset('Login');

  message.warning('登录失效请重新登录');
};

export default ajax;
export {setAjaxHeader};
