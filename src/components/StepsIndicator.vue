<template>
  <div class="container">
    <div v-for="(item, index) in steps" :key="item" class="itemContainer">
      <div v-if="index > 0" class="triangleOuter">
        <div
          :class="{
          triangle: true,
          isActived: index <= currentStepIndex
      }"
        ></div>
      </div>
      <div
        :class="{
          circle: true,
          isActived: index <= currentStepIndex
      }"
      >
        {{
        item
        }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: function () {
    return {
      steps: ['卡号', '详情', '激活', '完成']
    }
  },
  computed: {
    ...mapState(['currentStepIndex'])
  }
}
</script>

<style lang="scss" scoped>
$acitivitedColor: rgb(118,186, 58);
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .itemContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    .circle {
      width: 4em;
      height: 4em;
      border-radius: 50%;
      border: 1px solid gray;
      display: flex;
      justify-content: center;
      align-items: center;
      &.isActived {
      border: 1px solid $acitivitedColor;
        background: $acitivitedColor;
      }
    }
    .triangleOuter {
      width: 1em;
      .triangle {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0.5em 0 0.5em 1em;
        border-color: transparent transparent transparent grey;
        &.isActived {
          border-color: transparent transparent transparent $acitivitedColor;
        }
      }
    }
  }
}
</style>
