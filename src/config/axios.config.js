import axios from 'axios';

import url from 'url';
import {message} from 'components';

import {removeItem, getItem, setItem} from './storage';
// 通用接口请求地址路径

axios.defaults.timeout = 30000;

window.baseURL = axios.defaults.baseURL = url;
axios.defaults.headers.common['platform'] = 'app';

getItem('token').then(res => {
  if (res) {
    if (AJAXMODE !== 'agent') {
      axios.defaults.headers.common['Authorization'] = res;
    } else {
      axios.defaults.headers.common['token'] = res;
    }
  }
});

let timer;

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

const handleResponse = list => {
  let data;

  list.forEach(item => {
    if (item.field == 'data') {
      data = JSON.parse(item.value);
    }
  });

  return data;
};

// 处理响应的逻辑
const transformResponse = res => {
  if (res.code == 200) {
    const fieldsValue = res?.data?.dataList[0]?.fieldValues;

    return handleResponse(fieldsValue);
  }
};

axios.interceptors.response.use(async res => {
  if (AJAXMODE == 'agent') {
    res.data = transformResponse(res.data);
  }

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
          // 刷新token
          removeItem('token').then(() => {
            getItem('sfzh').then(rey => {
              if (timer) clearTimeout(timer);

              timer = setTimeout(() => {
                const id_card = AJAXMODE == 'agent' ? rey : sfzh;
                ajax({
                  url: '/app/app-login',
                  type: 'post',
                  data: {id_card},
                }).then(res => {
                  setItem('token', res.data.token);
                  setAjaxHeader(res.data.token);
                  const {name, key, params} =
                    window.navigation.getCurrentRoute();
                  // 使用navigate函数来导航到同一个路由，但是应用了新的参数
                  window.navigation.navigate({
                    name,
                    key: key + '1',
                    params,
                  });
                });
              }, 500);
            });
          });

          // message.error(res.data.message);
        } else {
          if (res.data.code === 20000) {
            resolve(res.data);
          } else {
            if (ajaxData.manual) {
              resolve(res.data);
            } else {
              reject(res.data);
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
  axios.defaults.headers.common['Authorization'] = value;
};

export {ajax, setAjaxHeader};
