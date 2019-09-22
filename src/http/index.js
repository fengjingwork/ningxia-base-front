"use strict"
import axios from 'axios'
import url from './config'

let $axios = () => {};
class Loading {
  constructor() {}
  create() {
    this.el = document.getElementById('app');
    this.loading = this.el.querySelector('.loading');
    this.isShow++;
    if (!this.loading) {
      this.isRemove = true;
      this.loading = document.createElement('div');
      this.loading.className = 'loading';
      let arr = ['<div class="loading_img"><div class="top"><span></span><span></span><span></span><span></span>'];
      arr.push('</div><div class="bottom">Loading<span>..</span><span class="one">..</span><span class="two">..</span></div></div>');
      this.loading.innerHTML = arr.join('');
      this.el.appendChild(this.loading);
    }
    this.loading.style.display = 'block';
  }
  monitor() {
    this.isShow--;
    setTimeout(() => {
      if (this.isShow < 1 && this.isRemove) {
        this.el.removeChild(this.loading);
        this.isRemove = false;
      }
    }, 100)
  }
}
const loading = new Loading();
loading.isShow = 0;
$axios.prototype.thwon = function (data) {
  loading.monitor();
  try{
    if (data.res.msg || data.res.data.msg) {
      data.data.error(data.res.msg || data.res.data.msg)
    } else {
      //data.data.error('服务器遇到未知错误，请联系我们！')
    }
  } catch (e) {
    //data.data.error('服务器遇到未知错误，请联系我们！')
  }
}
$axios.prototype.get = function(data) { //get请求函数
  let parmes = '';
  if (data.data) {
    for (let i in data.data) {
      parmes += '&' + i + '=' + data.data[i];
    }
    parmes = '?' + parmes.slice(1, parmes.length);
  }
  axios.get(data.url + parmes)
    .then(function (res) {
      if (res.status == 200) {
        if (res.data.code == 2000) {
          loading.monitor();
          data.success({
            code: res.data.code,
            data: res.data.data,
            msg: res.data.msg
          });
        } else {
          $axios.thwon({
            data: data,
            res: res
          })
        }
      } else {
        $axios.thwon({
          data: data,
          res: res
        })
      }
    })
    .catch(function (err) {
      console.log(err,'err')
      $axios.thwon({
        data: data,
        res: err
      })
    })
}
$axios.prototype.post = function (data) {//post请求函数
  let formData = new FormData();
  let lists = data.data;
  for (let i in lists) {
    formData.append(i, lists[i]);
  }
  axios.post(data.url, formData)
    .then(function (res) {
      if (res.status == 200) {
        if (res.data.code == 2000) {
          loading.monitor();
          data.success({
            code: res.data.code,
            data: res.data.data,
            msg: res.data.msg
          });
        } else {
          $axios.thwon({
            data: data,
            res: res
          })
        }
      } else {
        $axios.thwon({
          data: data,
          res: res
        })
      }
    })
    .catch(function(err) {
      $axios.thwon({
        data: data,
        res: err
      })
    })
}
$axios.prototype.ready = function(data) {
  if (data.isLoading != false) {
    loading.create();
  }
  let arr = data.url.split('/');
  let getUrl = url;
  arr.forEach((key) => {
    getUrl = getUrl[key];
  })
  data.url = '/api' + getUrl;
  //axios.defaults.baseURL = api.baseUrl;
  //axios.defaults.withCredentials = true;
  //axios.defaults.headers.post['Content-Type'] = 'x-www-form-urlencoded';
  setTimeout(() => {$axios[data.type](data);}, 0); //异步多进程处理
}
$axios = new $axios();
export default $axios.ready
