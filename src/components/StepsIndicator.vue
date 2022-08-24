<template>
  <div class="container">
    <template v-if="[6, '已销卡', '已激活快递'].includes(currentStepIndex)">
      <div class="itemContainer">
        <div
          :class="{
          circle: true,
          step6: true,
          isActived: true
      }"
        >卡信息{{currentStepIndex}}</div>
      </div>
    </template>
    <template v-else-if="isActivated">
      <div class="itemContainer">
        <div
          :class="{
          circle: true,
          step1: true,
          isActived: true
      }"
        >卡信息</div>
      </div>
    </template>
    <template v-else>
      <div v-for="(item, index) in steps" :key="item" class="itemContainer">
        <div
          v-if="index > 0"
          :class="{
          circle: true,
          step1: index === 1,
          step2: index === 2,
          step3: index === 3,
          isActived: index <= currentStepIndex
      }"
        >{{item}}</div>
        <div v-if="index > 0 && index < 3" class="triangleOuter">
          <div
            :class="{
          triangle: true,
          isActived: index <= currentStepIndex
      }"
          ></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: function () {
    return {
      steps: ["卡号", "卡内详情", "完善信息", "完成"],
    };
  },
  computed: {
    ...mapState(["currentStepIndex", "isActivated"]),
  },
};
</script>

<style lang="scss" scoped>
$acitivitedColor: #3c5b87;
.container {
  margin: 63px auto 55px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .itemContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    .circle {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      border: 2px solid #c7c7c7;
      background: white;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.5s;
      background-size: 32px auto;
      background-repeat: no-repeat;
      background-position: center center;
      text-indent: -99999px;
      &.isActived {
        width: 154px;
        height: 154px;
        border: 8px solid $acitivitedColor;
        &.step1 {
          background-image: url("./images/txt_kxx2.png");
        }
        &.step2 {
          background-image: url("./images/txt_kjh2.png");
        }
        &.step3 {
          background-image: url("./images/txt_wc2.png");
        }
        &.step6 {
          background-image: url("./images/txt_psxx.png");
        }
      }
      &.step1 {
        background-image: url("./images/txt_kxx1.png");
      }
      &.step2 {
        background-image: url("./images/txt_kjh1.png");
      }
      &.step3 {
        background-image: url("./images/txt_wc1.png");
      }
    }
    .triangleOuter {
      width: 34px;
      margin: 0 10px;
      .triangle {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 17px 0 17px 34px;
        border-color: transparent transparent transparent grey;
        &.isActived {
          border-color: transparent transparent transparent $acitivitedColor;
        }
      }
    }
  }
}
</style>
