<template>
  <div>
    <input :value="currentCardNo" @input="updateCurrentCardNo" />
    <div @click="chageStepIndex">下一步</div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState(['currentStepIndex', 'currentCardNo'])
  },

  methods: {
    updateCurrentCardNo (e) {
      this.$store.commit('updateCurrentCardNo', e.target.value)
    },
    chageStepIndex () {
      this.$store.commit('chageStepIndex', 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
}
</style>
