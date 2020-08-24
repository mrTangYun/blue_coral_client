<template>
  <div>
    <div>
      <div>到店自提</div>
      <div>免费快递</div>
    </div>
    <div>抵用470元现金 或588元理想</div>
    <div>588元理想包含</div>
    <div>
      <div @click="chageStepIndexTpPerv">上一步</div>
      <div @click="chageStepIndexToNext">下一步</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {},

  methods: {
    chageStepIndexToNext () {
      this.$store.commit('chageStepIndex', 3)
    },

    chageStepIndexTpPerv () {
      this.$store.commit('chageStepIndex', 1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
