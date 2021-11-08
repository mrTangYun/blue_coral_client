<template>
  <div class="pageContainer">
    <img class="mainImg" :src="require('./images/s1-main.png')" />
    <div class="inputArea">
      <input
        :value="currentCardNo"
        @input="updateCurrentCardNo"
        placeholder="请输入卡号"
        @blur="inputBlur"
      />
      <!-- <div class="ok" v-if="validateCardNo"></div> -->
    </div>
    <div class="STLiBian tips">请填写“挚情卡”正面下方卡号</div>
    <div
      :class="{
      btn: true,
      isValidated: validateCardNo && !isLoading
    }"
      @click="chageStepIndex"
    >查阅此卡</div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import gql from 'graphql-tag'

export default {
  computed: {
    ...mapState(['currentStepIndex', 'currentCardNo']),
    validateCardNo: function () {
      const r = /^[a-zA-Z0-9]{7}$/
      return r.test(this.currentCardNo.trim())
    }
  },
  data: function () {
    return {
      isLoading: false
    }
  },

  methods: {
    updateCurrentCardNo (e) {
      this.$store.commit('updateCurrentCardNo', e.target.value)
    },
    chageStepIndex () {
      if (this.isLoading) return;
      this.isLoading = true;
      
      this.$apollo.provider.defaultClient.query({
        query: gql`
            query customer($code: String!) {
              getCodeInfo(code: $code) {
                id
                status
                giftPackage {
                  id
                  title
                  amount
                  isShowAmount
                  Commdities {
                    detail {
                      id
                      title
                    }
                    count
                    unit
                  }
                }
              }
            }
          `,
        variables: {
          code: this.currentCardNo.trim()
        }
      }).then(data => {

        this.isLoading = false;
        if (data.data.getCodeInfo) {
          this.$store.commit('updateItem', { key: 'cardInfo', value: data.data.getCodeInfo })
          this.$store.commit('updateItem', { key: 'isActivated', value: data.data.getCodeInfo.status !== 'PENDING' })
          this.$store.commit('chageStepIndex', 1)
        } else {
          // alert('卡号错误')
          this.$toasted.show("卡号错误", { 
            theme: "bubble", 
            position: "top-center", 
            duration : 3000
          });
        }
      }).catch(e => {
        this.isLoading = false;
        this.$toasted.show(e.messsage, { 
            theme: "bubble", 
            position: "top-center", 
            duration : 3000
          });

      })
    },
    inputBlur () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.pageContainer {
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 100%;
  align-items: center;
  justify-content: center;
  .mainImg {
    margin: 0 0 68px;
    height: auto;
    width: 131px;
  }

  .tips {
    margin: 25px auto 79px;
    font-size: 36px;
    color: #bd983c;
  }
}
</style>
