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
    >
    <img :src="require('./images/txt_cyck.png')" alt="查阅此卡">
    </div>
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
    margin: 0 0 68px;
    height: auto;
    width: 131px;
  }
  
  .tips {
    margin: 25px auto 79px;
    font-size: 24px;
    color: #bd983c;
  }
}
</style>
