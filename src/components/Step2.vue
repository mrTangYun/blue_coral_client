<template>
  <div>
    <div>本卡可兑换：</div>
    <div>抵用470元现金 或588元理想</div>
    <div>588元理想包含</div>
    <div>
      <div @click="chageStepIndexToNext">马上激活</div>
      <div @click="chageStepIndexTpPerv">以后再说</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {},

  methods: {
    chageStepIndexToNext () {
      this.$store.commit('chageStepIndex', 2)
    },

    chageStepIndexTpPerv () {
      this.$store.commit('chageStepIndex', 0)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
