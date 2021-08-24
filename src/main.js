import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import packages from './package'
import mixin from './mixin'
import request from './http'
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css'

import '@/assets/style/reset.css'
import '@/assets/style/common.css'
import '@/assets/style/ots-eui.css'
import '@/assets/style/icon-font/iconfont.css'
import getStaticFile from '@/http/static'

Vue.use(ElementUI)
Vue.use(packages)
Vue.mixin(mixin)

Vue.config.productionTip = false
Vue.prototype.$event = new Vue()
Vue.prototype.$api = request
Vue.prototype.$getStaticFile = getStaticFile
Vue.prototype.$driver = new Driver({  
  doneBtnText: '完成',       
  closeBtnText: '关闭',          
  stageBackground: '#fff',      
  nextBtnText: '下一步',        
  prevBtnText: '上一步',     
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
