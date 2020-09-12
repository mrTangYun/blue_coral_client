import Vue from 'vue'
import Vuex from 'vuex'

import axios from "axios";
import gql from 'graphql-tag'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    updateUploadProgress: -1,
    /// 是否已经激活
    isActivated: false,
    /// 当前步骤索引
    currentStepIndex: 0,
    /// 当前卡号
    currentCardNo: '',
    /// 姓名
    name: '',
    /// 手机号
    mobile: '',
    /// 收货地址
    address: '',
    deliverType: 'self',
    /// 自提取货时间
    zt_qhsj: '',
    /// 照片地址
    fileKey: null,
    cardInfo: null
  },
  mutations: {
    /// 更改当前步骤索引
    chageStepIndex(state, index) {
      state.currentStepIndex = index
    },
    /// 更改当前卡号
    updateCurrentCardNo(state, no) {
      state.currentCardNo = no.toUpperCase()
    },
    /// 更改自提取货时间
    updateZt_qhsj(state, timeStr) {
      state.zt_qhsj = timeStr
    },
    /// 更改值
    updateItem(state, { key, value }) {
      state[key] = value
    }
  },

  actions: {
    onUploadFile(context, {
      apolloClient,
      file
    }) {
      context.commit("updateItem", {
        key: "fileKey",
        value: null
      });
      context.commit("updateItem", {
        key: "updateUploadProgress",
        value: file ? 0 : -1
      });
      apolloClient.query({
        query: gql`
          query qiniu {
            uploadToken{
              key
              token
            }
          }
          `,
        fetchPolicy: 'network-only'
      }).then(response => {
        const {
          key,
          token,
          upload_url = "https://up-z0.qiniup.com"
        } = response.data.uploadToken;
        let data = new FormData();
        data.append("key", key);
        data.append("token", token);
        data.append("file", file);
        axios({
          method: "POST",
          url: upload_url,
          data: data,
          onUploadProgress: (progressEvent) => {
            var percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(percentCompleted);
            context.commit("updateItem", {
              key: "updateUploadProgress",
              value: percentCompleted
            });
          },
        })
          .then((res) => {
            console.log('上传完毕');
            context.commit("updateItem", {
              key: "fileKey",
              value: key
            });
            context.commit("updateItem", {
              key: "updateUploadProgress",
              value: 100
            });
           })
          .catch((err) => {
            console.log("err " + type, err);
            
            context.commit("updateItem", {
              key: "fileKey",
              value: null
            });
            context.commit("updateItem", {
              key: "updateUploadProgress",
              value: -1
            });
          });
      }).catch(e => {

      });
      return;
    },
  },
  modules: {
  }
})
