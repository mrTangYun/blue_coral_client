<template>
  <div class="pageContainer">
    <StepsIndicator />
    <div class="pageContent">
      <div>本卡可兑换：</div>
      <div>抵用470元现金 或588元理想</div>
      <div>588元理想包含</div>
    </div>
    <div class="btns">
      <template v-if="isActivated">
        <div
          :class="{
      btn: true,
      isValidated: true
    }"
          @click="chageStepIndexTpPerv"
        >
          <img :src="require('./images/txt_back.png')" alt="返回" />
        </div>
      </template>
      <template v-else>
        <div
          :class="{
      btn: true,
      isValidated: true
    }"
          @click="chageStepIndexToNext"
        >
          <img :src="require('./images/txt_msjh.png')" alt="马上激活" />
        </div>
        <div
          :class="{
      btn: true,
      isValidated: true
    }"
          @click="chageStepIndexTpPerv"
        >
          <img :src="require('./images/txt_yhzs.png')" alt="以后再说" />
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
    ...mapState(["isActivated"]),
  },

  methods: {
    chageStepIndexToNext() {
      this.$store.commit("chageStepIndex", 2);
    },

    chageStepIndexTpPerv() {
      this.$store.commit("chageStepIndex", 0);
    },
  },
  components: {
    StepsIndicator,
  },
};
</script>

<style lang="scss" scoped>
</style>
