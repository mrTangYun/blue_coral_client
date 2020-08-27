import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /// 是否已经激活
    isActivated: true,
    /// 当前步骤索引
    currentStepIndex: 1,
    /// 当前卡号
    currentCardNo: '1232245',
    /// 姓名
    name: '姓名',
    /// 手机号
    mobile: '15367680311',
    /// 收货地址
    address: '收货地址收货地址收货地址收货地址收货地址收货地址收货地址收货地址',
    /// 照片地址
    imageUrl: '',
    /// 自提取货时间
    zt_qhsj: ''
  },
  mutations: {
    /// 更改当前步骤索引
    chageStepIndex (state, index) {
      state.currentStepIndex = index
    },
    /// 更改当前卡号
    updateCurrentCardNo (state, no) {
      state.currentCardNo = no.toUpperCase()
    },
    /// 更改自提取货时间
    updateZt_qhsj (state, timeStr) {
      state.zt_qhsj = timeStr
    },
    /// 更改值
    updateItem (state, { key, value }) {
      state[key] = value
    }
  },

  actions: {
  },
  modules: {
  }
})
