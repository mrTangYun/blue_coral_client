<template>
  <div class="pageContainer">
    <StepsIndicator />
    <div class="pageContent">
      <div class="STLiBian tx1">
        本卡内含：
        <template v-if="cardInfo.giftPackage.isShowAmount"
          >价值
          <span class="AvantGardeITCbyBT amount">{{
            cardInfo.giftPackage.amount
          }}</span
          >元礼箱
        </template>
      </div>
      <div class="presentsOuter">
        <div class="presents">
          <div
            v-for="(item, index) in presents"
            :key="item + index"
            class="item"
          >
            <div class="title">{{ item.title }}</div>
            <div class="dot"></div>
            <div class="unit">{{ item.unit }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <div
      :class="{
        btns: true,
        btns_row: true
      }"
    >
      <template v-if="isActivated">
        <div
          :class="{
            btn: true,
            isValidated: true
          }"
          @click="chageStepIndexTpPerv"
        >返回</div>
      </template>
      <template v-else>
        <div
          :class="{
            btn: true,
            isValidated: true
          }"
          @click="chageStepIndexToNext"
        >
          马上激活
        </div>
        <div
          :class="{
            btn: true,
            isValidated: true
          }"
          @click="chageStepIndexTpPerv"
        >
          以后再说
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import StepsIndicator from "@/components/StepsIndicator";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["isActivated", "cardInfo"]),
    presents: function() {
      return this.cardInfo.giftPackage.Commdities.map(
        ({ detail: { title }, count, unit }) => ({
          title,
          unit: count + unit
        })
      );
    }
  },
  methods: {
    chageStepIndexToNext() {
      this.$store.commit("chageStepIndex", 2);
    },
    chageStepIndexTpPerv() {
      if (this.cardInfo.getPresentWay === 'EXPRESS') {
        this.$store.commit("chageStepIndex", '已激活快递');
      }
      if (this.cardInfo.getPresentWay === 'SELF') {
        this.$store.commit("chageStepIndex", '已激活自提');
      }
    },
    clickCheckExpressHandler() {
      this.$store.commit("chageStepIndex", 6);
    }
  },
  components: {
    StepsIndicator
  }
};
</script>

<style lang="scss" scoped>
.tx5{
  font-size: 36px;
  color: #dc2123;
  text-align: center;
}
.tx1 {
  font-size: 48px;
  font-weight: bold;
  font-stretch: normal;
  color: #c19b25;
  margin-bottom: 83px;
}
.amount {
  color: #eb6f1c;
  font-size: 70px;
}
.pageContent {
  display: flex;
  flex-direction: column;
}
.presentsOuter {
  flex: 1;
  position: relative;
  .presents {
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    height: calc(100% - 48px - 107px);
    width: 530px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 8px;
    border: solid 2px #c7c7c7;
    padding: 24px 35px;
    overflow-y: scroll;
    .item {
      margin: 15px 0;
      display: flex;
      flex-direction: row;
      height: 36px;
      font-family: STXihei;
      font-size: 38px;
      line-height: 36px;
      color: #bd983c;
      .dot {
        flex: 1;
        height: 1px;
        align-self: flex-end;
        border-bottom: 5px dotted #bd983c;
        margin-bottom: 4px;
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
}
</style>
