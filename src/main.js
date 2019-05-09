import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import './static/styles/reset.scss'
// 引入 API 接口文件
import api from './api/getAPI'

import Vant from 'vant'
import 'vant/lib/index.css'
import 'vant/lib/icon/local.css'

import './static/icon/iconfont/iconfont.css'

Vue.use(Vant)

// 挂载 API 文件到 prototype
Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
