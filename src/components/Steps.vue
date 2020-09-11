<template>
  <div>
    <Step1 v-if="currentStepIndex === 0" />
    <Step2 v-if="currentStepIndex === 1" />
    <Step3 v-if="currentStepIndex === 2" />
    <Step4 v-if="currentStepIndex === 3" />
    <Step5 v-if="currentStepIndex === 4" />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

import Step1 from '@/components/Step1'
import Step2 from '@/components/Step2'
import Step3 from '@/components/Step3'
import Step4 from '@/components/Step4'
import Step5 from '@/components/Step5'

export default {
  data: function () {
    return {
    }
  },
  computed: {
    ...mapState(['currentStepIndex'])
  },
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
