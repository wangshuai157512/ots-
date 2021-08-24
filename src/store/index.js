import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageThis : null
  },
  mutations: {
    SAVE_PAGE_THIS (state,_this) {
      state.pageThis = _this
    }
  },
  actions: {
  },
  modules: {
  }
})
