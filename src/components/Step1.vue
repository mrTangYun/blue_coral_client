<template>
  <div class="pageContainer">
    <img class="mainImg" :src="require('./images/s1-main.png')" />
    <div class="inputArea">
      <input :value="currentCardNo" @input="updateCurrentCardNo" placeholder="请输入卡号" />
      <div class="ok" v-if="validateCardNo"></div>
    </div>
    <div class="tips">请填写“挚情卡”正面下方卡号</div>
    <div
      :class="{
      btn: true,
      isValidated: validateCardNo
    }"
      @click="chageStepIndex"
    >查阅此卡</div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["currentStepIndex", "currentCardNo"]),
    validateCardNo: function () {
      const r = /^[a-zA-Z0-9]{7}$/;
      return r.test(this.currentCardNo.trim());
    },
  },

  methods: {
    updateCurrentCardNo(e) {
      this.$store.commit("updateCurrentCardNo", e.target.value);
    },
    chageStepIndex() {
      this.$store.commit("chageStepIndex", 1);
    },
  },
};
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
    margin: 0 0 1em;
    height: auto;
    width: 17.4%;
  }
  .inputArea {
    border-radius: 0.4em;
    border: 3px solid #435f84;
    background: white;
    position: relative;
    padding: 0.5em 0em;
    input {
      width: 14em;
      font-size: 1em;
      border: 0;
      border-radius: 0.4em;
      text-align: center;
      outline: none;
    }
    .ok {
      position: absolute;
      width: 1.5em;
      height: 1.5em;
      background-image: url("./images/status_ok.png");
      background-size: 100% 100%;
      right: 0.3em;
      top: 50%;
      transform: translateY(-50%);
      // z-index: -1;
    }
  }
  .tips {
    margin-top: 0.3em;
    font-size: 1em;
    color: #bd983c;
  }
}
</style>
