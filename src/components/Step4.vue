<template>
  <div class="pageContainer">
    <StepsIndicator />
    <div class="pageContent">
      <div class="txtCarno">{{currentCardNo}}</div>
      <div class="STLiBian tips0">恭喜您完成“挚情卡”激活！</div>
      <div class="tips1">请填再次确认您的信息！</div>
      <Step4Box1 title="核 对 您 的 姓 名" :content="name"></Step4Box1>
      <Step4Box1 title="核 对 手 机 号 码" :content="mobile"></Step4Box1>
      <Step4Box1 v-if="deliverType === 'express'" title="核 对 收 货 地 址" :content="address"></Step4Box1>
      <Step4Box1 v-if="deliverType === 'self'" title="核 对 取 货 时 间" :content="zt_qhsj"></Step4Box1>
    </div>

    <div class="btns btns_row">
      <div class="btn isValidated" @click="chageStepIndexTpPerv">上一步</div>
      <div
        :class="{
          btn: true,
          isValidated: !isLoading
        }"
       @click="bindCard">完 成</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import StepsIndicator from '@/components/StepsIndicator'
import Step4Box1 from '@/components/Step4Box1'
import gql from 'graphql-tag'
export default {
  computed: {
    ...mapState([
      'zt_qhsj',
      'name',
      'mobile',
      'address',
      'currentCardNo',
      'deliverType',
      'fileKey'
    ])
  },

  data: function () {
    return {
      isLoading: false
    }
  },
  methods: {
    chageStepIndexTpPerv () {
      this.$store.commit('chageStepIndex', 2)
    },
    bindCard () {
      if (this.isLoading) return;
      this.isLoading = true;
      this.$apollo
        .mutate({
          mutation: gql`
            mutation bindCard(
              $code: String!
              $name: String!
              $mobile: String!
              $imageUrl: String
              $address: String
              $pickupTime: String
            ) {
              bindInfo(
                code: $code
                name: $name
                mobile: $mobile
                imageUrl: $imageUrl
                address: $address
                pickupTime: $pickupTime
              ) {
                id
                status
              }
            }
          `,
          variables: {
            code: this.currentCardNo.trim(),
            name: this.name,
            mobile: this.mobile,
            imageUrl: this.fileKey,
            address: this.deliverType === 'express' ? this.address : null,
            pickupTime: this.deliverType === 'self' ? this.zt_qhsj : null
          }
        })
        .then((data) => {
          this.isLoading = false;
          this.$store.commit('updateItem', {
            key: 'cardInfo',
            value: data.data.bindInfo
          })
          this.$store.commit('updateItem', {
            key: 'isActivated',
            value: data.data.bindInfo.status !== 'PENDING'
          })
          this.$store.commit('chageStepIndex', 4)
        })
        .catch((e) => {
          this.isLoading = false;
          this.$toasted.show(e.messsage, { 
            theme: "bubble", 
            position: "top-center", 
            duration : 3000
          });
        })
    }
  },

  components: {
    StepsIndicator,
    Step4Box1
  }
}
</script>

<style lang="scss" scoped>
.txtCarno {
  font-family: Trends;
  font-size: 48px;
  color: #c19b25;
}
.tips0 {
  font-size: 48px;
  font-weight: bold;
  font-stretch: normal;
  color: #c19b25;
  margin: 16px auto 31px;
}
.tips1 {
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  color: #dc2123;
  margin: 0 auto 23px;
}
</style>
