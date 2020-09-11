<template>
  <div class="pageContainer">
    <StepsIndicator />
    <div class="pageContent">
      <div class="presentsOuter">
        <div class="presents pageBindSuccess STLiBian">
          已领取
        </div>
      </div>
    </div>
    <div :class="{
      btns:true, btns_row:true
    }">
      <div
          :class="{
      btn: true,
      isValidated: true
    }"
          @click="chageStepIndexTpPerv"
        >返 回</div>
    </div>
  </div>
</template>

<script>
import StepsIndicator from '@/components/StepsIndicator'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['isActivated'])
  },
  methods: {
    chageStepIndexTpPerv () {
      this.$store.commit('chageStepIndex', 0)
      this.$store.commit('updateItem', { key: 'currentCardNo', value: '' })
    }
  },
  components: {
    StepsIndicator
  }
}
</script>

<style lang="scss" scoped>
.tx1 {
  font-size: 48px;
  font-weight: bold;
  font-stretch: normal;
  color: #c19b25;
  margin-bottom: 83px;
}
.amount {
  color: #eb6f1c;
}
.pageContent {
  display: flex;
  flex-direction: column;
}
.presentsOuter {
  flex: 1;
  position: relative;
  .presents {
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    height: calc(100% - 48px - 107px);
    width: 530px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 8px;
    border: solid 2px #c7c7c7;
    padding: 24px 35px;
    overflow-y: scroll;
    &.pageBindSuccess{
      background-color: transparent;
      border: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 50px;
    }
  }
}
</style>
