<template>
  <div class="pageContainer">
    <StepsIndicator />
    <div class="pageContent">
      <div class="tabsBtns">
        <div
          :class="{
          tabBtn: true,
          isActivited: tabIndex === 0
        }"
          @click="changeTab(0)"
        >
          <img :src="require('./images/txt_ddzt.png')" />
        </div>
        <div
          :class="{
          tabBtn: true,
          isActivited: tabIndex === 1
        }"
          @click="changeTab(1)"
        >
          <img :src="require('./images/txt_mfllps.png')" />
        </div>
      </div>
      <div>完善持卡人信息</div>
      <div>请务必填写真实信息以绑定此卡！</div>
      <div>蓝珊瑚鲜生郑重承诺：您的个人信息，我们绝不外泄！</div>
      <div class="tabs">
        <div class="tab" v-show="tabIndex === 0">
          <div>为节省您取货时间，避免等待，请选择：</div>
          <div>温馨提示：来店自提礼箱，请务必携带此卡！</div>
        </div>
        <div class="tab" v-show="tabIndex === 1">
          <div>请详细填写收件人地址，顺风冷链配送</div>
          <div>请为“挚情卡”拍照</div>
          <div>请拍摄“挚情卡”正面照片，</div>
          <div>如信息模糊，客服人员会向您至电核实</div>
        </div>
      </div>
    </div>

    <div class="btns">
      <div class="btn isValidated" @click="chageStepIndexTpPerv">上一步</div>
      <div class="btn isValidated" @click="chageStepIndexToNext">下一步</div>
    </div>
  </div>
</template>

<script>
import StepsIndicator from "@/components/StepsIndicator";
export default {
  computed: {},
  data: function () {
    return {
      tabIndex: 0,
    };
  },

  methods: {
    chageStepIndexToNext() {
      this.$store.commit("chageStepIndex", 3);
    },

    chageStepIndexTpPerv() {
      this.$store.commit("chageStepIndex", 1);
    },
    changeTab(index) {
      this.tabIndex = index;
    },
  },

  components: {
    StepsIndicator,
  },
};
</script>

<style lang="scss" scoped>
.tabsBtns {
  display: flex;
  border-bottom: 0.2em solid #51709c;
  justify-content: center;
  .tabBtn {
    width: 40%;
    background: linear-gradient(#cacaca, #bababa);
    height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 0.4em;
    border-top-right-radius: 0.4em;
    &.isActivited {
      background: linear-gradient(#6180ab, #506f9b);
    }
    &:first {
      margin-right: 0.1em;
    }
    &:last-child {
      margin-left: 0.1em;
    }
    img {
      height: 30.75%;
    }
  }
}
</style>
