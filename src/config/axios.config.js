import axios from 'axios';

import AJAXMODE from 'AjaxMode';
import {message} from 'components';
import {dev, prod} from './app.config';
import {removeItem, getItem, setItem} from './storage';
// 通用接口请求地址路径

axios.defaults.timeout = 30000;
if (AJAXMODE === 'dev') {
  axios.defaults.baseURL = dev;
} else {
  axios.defaults.baseURL = prod;
}

getItem('token').then(res => {
  if (res) {
    if (AJAXMODE !== 'agent') {
      axios.defaults.headers.common['Authorization'] = res;
    } else {
      axios.defaults.headers.common['token'] = res;
    }
  }
});

/**
 * @description  请求全局拦截
 * @param  {boolean} transFormData  post方法 true转form提交表单方式
 * */
axios.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(async res => {
  return res;
});

/**
 * @description ajax 请求
 * @param {Object} ajaxData 配置 ajax 请求的键值对集合
 * @param {String} ajaxData.type 创建请求使用的方法
 * @param {String} ajaxData.url 请求服务器的 URL
 * @param {Object} ajaxData.data 与请求一起发送的 URL 参数
 * @param {Boolean} ajaxData.manual 与请求一起发送的 URL 参数
 */
function ajax(ajaxData = {}) {
  // post转form表单提交方式
  if (ajaxData.transFormData) {
    ajaxData.data = {...ajaxData.data, transFormData: true};
  }
  let method = (ajaxData.type || 'GET').toLowerCase();

  let url = ajaxData.url || '';

  let data = method === 'get' ? {params: ajaxData.data} : ajaxData.data;

  return new Promise((resolve, reject) => {
    if (Object.prototype.toString.call(ajaxData) !== '[object Object]') {
      return reject(new Error('ajax请求配置错误'));
    }

    axios[method](url, data)
      .then(res => {
        if (res.data.code === 40102) {
          removeItem('token').then(token => {
            // 刷新token
            ajax({
              url: '/app/app-login',
              type: 'post',
              data: {token},
            }).then(res => {
              setItem('token', res.data.token);
              setAjaxHeader(res.data.token);
            });
          });
        } else {
          if (res.data.code === 20000) {
            resolve(res.data);
          } else {
            if (ajaxData.manual) {
              resolve(res.data);
            } else {
              message.error(res.data.message);
            }
          }
        }
      })
      .catch(err => {
        let response = err.response;
        if (response) {
          switch (response.code) {
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

// 设置axios默认的token值
const setAjaxHeader = value => {
  if (AJAXMODE !== 'prod') {
    axios.defaults.headers.common['Authorization'] = value;
  } else {
    axios.defaults.headers.common['token'] = value;
  }
};

export {ajax, setAjaxHeader};
