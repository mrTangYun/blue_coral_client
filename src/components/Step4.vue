<template>
  <div>
    <div>之情况</div>
    <div>完成激活</div>
    <div>请在此确认您的个人信息</div>
    <div>新名</div>
    <div>手机号</div>
    <div>收获地址</div>
    <div>收获地址</div>
    <div>
      <div @click="chageStepIndexTpPerv">上一步</div>
      <div>完成</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {},

  methods: {
    chageStepIndexTpPerv () {
      this.$store.commit('chageStepIndex', 2)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
