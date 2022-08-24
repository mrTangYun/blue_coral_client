<template>
  <div>
    <Step1 v-if="currentStepIndex === 0" />
    <Step2 v-if="currentStepIndex === 1" />
    <Step3 v-if="currentStepIndex === 2" />
    <Step4 v-if="currentStepIndex === 3" />
    <Step5 v-if="currentStepIndex === 4" />
    <Step6 v-if="currentStepIndex === 6" />
    <StepYiXiaoKa v-if="currentStepIndex === '已销卡'" />
    <StepYiJiHuoZiti v-if="currentStepIndex === '已激活自提'" />
    <StepYiJiHuoKuaidi v-if="currentStepIndex === '已激活快递'" />
    <KaNeiXiangQing v-if="currentStepIndex === '卡内详情'" />
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
import Step6 from '@/components/Step6'
import StepYiXiaoKa from '@/components/StepYiXiaoKa'
import StepYiJiHuoZiti from '@/components/StepYiJiHuo_ziti'
import StepYiJiHuoKuaidi from '@/components/StepYiJiHuo_kuaidi'
import KaNeiXiangQing from '@/components/KaNeiXiangQing'

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
    Step5,
    Step6,
    StepYiXiaoKa,
    StepYiJiHuoZiti,
    StepYiJiHuoKuaidi,
    KaNeiXiangQing
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
