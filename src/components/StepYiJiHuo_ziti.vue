<template>
  <div class="pageContainer">
    <StepsIndicator />
    <div class="pageContent">
      <div class="txtCarno">{{ currentCardNo }}</div>
      <div class="STLiBian tips0">请您尽快预约到店</div>
      <div class="myInfo">
        <div class="STLiBian title">收货人</div>
        <div class="value">{{ cardInfo.bindInfo.name }}</div>
        <div class="STLiBian title">收货电话</div>
        <div class="AvantGardeITCbyBT value">{{ cardInfo.bindInfo.mobile.replace(/(?=(\d{4})+$)/g, ' ') }}</div>
        
      </div>
      
      <div class="STLiBian selfTips" >
        <div class="title">重要提示</div>
        <div class="content">
          到店自提礼箱，请您务必携带此卡！
        </div>
        <div class="title">自取地址</div>
        <div class="content">
          济南市 龙奥北路 1 5 7 7 号 蓝珊瑚鲜生
        </div>
        <div class="title">服务电话</div>
        <div class="AvantGardeITCbyBT content">
          0531 - 5553 5100 / 158 5317 9393
        </div>
      </div>
    </div>

    <div class="btns btns_row">
      <div class="btn isValidated" @click="chageStepIndexTpPerv">上一步</div>
      <div
        :class="{
          btn: true,
          isValidated: true
        }"
        @click="clickCheckCardPresents"
      >
        卡内详情
      </div>
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
    ...mapState(["isActivated", "cardInfo"]),
    ...mapState([
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
      this.$store.commit('chageStepIndex', 0)
    },
    clickCheckCardPresents() {
      this.$store.commit("chageStepIndex", '卡内详情');
    }
  },

  components: {
    StepsIndicator,
    Step4Box1
  }
}
</script>

<style lang="scss" scoped>
.pageContent {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.txtCarno {
  font-family: AvantGardeITCbyBT;
  font-size: 48px;
  color: #c19b25;
}
.tips0 {
  font-size: 48px;
  font-stretch: normal;
  color: #c19b25;
  margin: 16px auto 31px;
}
.tips1 {
  font-size: 36px;
  font-weight: bold;
  font-stretch: normal;
  color: #dc2123;
  margin: 0 auto 23px;
}
.myInfo {
  width: 380px;
  
  background-image: linear-gradient(#f6f6f6, #f6f6f6),
    linear-gradient(#2f4f7e, #2f4f7e);
  background-blend-mode: normal, normal;
  border-radius: 15px;
  border: solid 6px #c4a23d;
  color: #dc2123;
  padding: 42px 110px 47px;
  line-height: 43px;
  .title {
    font-size: 36px;
  }
  .value{
    font-size: 30px;
    color: #b28a2a;
  }
}
.expressTips, .selfTips{
  width: 610px;
  margin-top: 45px;
  color: #dc2123;
  .title {
    font-size: 40px;
    font-weight: bolder;
  }
  .content{
    font-size: 36px;
  }
}
</style>
