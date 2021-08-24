import axios from 'axios'
// import config from './config'
import qs from 'qs'
import Vue from 'vue'
import router from '@/router'
const config ={
    method: 'POST'
}
let loadingCount = 0,loading



const request = options => {

  options.headers = {
    "Content-Type" : options.isUpload ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
    // "Accept": options.isExport ? 'application/xhtml+xml' : 'application/json'
    // 'Authorization' : 'Bearer ' + localStorage.getItem('auth_token'),
    // 'Cookie': '_pk_id.5.5829=945f7444af102a47.1621752638.7.1623808843.1623807976.; sid=02eb615e-cc4d-4d53-986e-12f15e31b24d'
  }
  const { $event } = Vue.prototype
  if (loadingCount < 1) {
      // loading = options.isImport ? $event.$loading({background:'rgba(0, 0, 0, 0.7)',spinner: 'el-icon-loading',text: '导入中...',lock: true,}) : $event.$loading({background:'transparent'})
      loading = $event.$loading({background:'transparent'})
  }
  loadingCount++
  return new Promise((resolve, reject) => {
    const instance = axios.create({})
    // 添加请求拦截器
    instance.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      if (!options.isUpload) {
        config.data = qs.stringify(config.data)
      }
     
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });

    // 添加响应拦截器
    instance.interceptors.response.use(function (response) {
      loadingCount--
      if (loadingCount < 1) {
        setTimeout(() => {
          loading.close()
        },200)
      }
      // 对响应数据做点什么
      if (response.data.status === 0) {
        let msgDuration= response.data.error.length>30?5000:3000
        $event.$message({
          type:'error',
          message:response.data.error,
          duration:msgDuration
        });
      }
      return response.data;
    }, function (error) {
      loadingCount--
      if (loadingCount < 1) {
        setTimeout(() => {
          loading.close()
        },200)
      }
      // let { response } = error
      // if(response && response.status === 401 && location.pathname !== '/') {
      //   $event.$emit('clearTimer')
      //   $event.$confirm('登录过期，请重新登陆。', '系统提示', {
      //     confirmButtonText: '确定',
      //     showCancelButton:false,
      //     showClose:false,
      //     closeOnClickModal:false,
      //     roundButton:true
      //   }).then(() => {
      //     window.localStorage.clear();
      //     router.replace('/')
      //     history.pushState(null, null, document.URL);
      //     window.addEventListener('popstate', function () {
      //         history.pushState(null, null, document.URL);
      //     });
      //   })
          
      // }
      // 对响应错误做点什么
      return Promise.reject(error);
    });
    instance.request(options)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
export default request
