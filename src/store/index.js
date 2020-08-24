import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /// 当前步骤索引
    currentStepIndex: 0,
    /// 当前卡号
    currentCardNo: ''
  },
  mutations: {
    /// 更改当前步骤索引
    chageStepIndex (state, index) {
      state.currentStepIndex = index
    },
    /// 更改当前卡号
    updateCurrentCardNo (state, no) {
      state.currentCardNo = no
    }
  },

  actions: {
  },
  modules: {
  }
})
