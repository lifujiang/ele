import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    site: {},
    explain: {},
    explainCaption: [],
    explainContent: [],
    parentScroll: undefined
  },
  mutations: {
    // 从 City 页面获取经纬度信息
    getSiteInfo (state, site) {
      state.site = site
    },
    // 后面记得把 getSiteInfo 整合到下面
    getInfo (state, info) {
      state[info.name] = info.data
    }
  },
  actions: {

  }
})
