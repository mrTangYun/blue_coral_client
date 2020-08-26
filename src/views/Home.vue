<template>
  <div class="home">
    <!-- <StepsIndicator /> -->
    <Steps />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

import StepsIndicator from '@/components/StepsIndicator'
import Steps from '@/components/Steps'

export default {
  name: 'Home',
  data: function () {
    return {
    }
  },
  computed: {
    ...mapState(['currentCardNo'])
  },
  components: {
    // StepsIndicator,
    Steps
  },

  methods: {
    updateCurrentCardNo (e) {
      this.$store.commit('updateCurrentCardNo', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
