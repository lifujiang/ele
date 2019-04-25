import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    site: {}
  },
  mutations: {
    // 从 City 页面获取经纬度信息
    getSiteInfo (state, site) {
      state.site = site
    }
  },
  actions: {

  }
})
