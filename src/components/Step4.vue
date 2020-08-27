<template>
  <div class="pageContainer">
    <StepsIndicator />
    <div class="pageContent">
      <div>之情况</div>
      <div>完成激活</div>
      <div>请在此确认您的个人信息</div>
      <div>新名</div>
      <div>手机号</div>
      <div>收获地址</div>
      <div>收获地址</div>
    </div>

    <div class="btns btns_row">
      <div class="btn isValidated" @click="chageStepIndexTpPerv">
        <img :src="require('./images/txt_syb.png')" alt="上一步" />
      </div>
      <div class="btn isValidated">完成</div>
    </div>
  </div>
</template>

<script>
import StepsIndicator from "@/components/StepsIndicator";
export default {
  computed: {},

  methods: {
    chageStepIndexTpPerv() {
      this.$store.commit("chageStepIndex", 2);
    },
  },

  components: {
    StepsIndicator,
  },
};
</script>

<style lang="scss" scoped>
</style>
