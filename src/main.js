import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './static/styles/reset.scss'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Vant from 'vant'
import 'vant/lib/index.css'
import 'vant/lib/icon/local.css'

Vue.use(VueAxios, axios)
Vue.use(Vant)
Vue.axios.defaults.baseURL = 'https://elm.cangdu.org'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
