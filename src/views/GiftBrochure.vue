<template>
  <div>
    <div class="homeContainer" v-show="step === 0">
      <img src="/images/20210106/home.jpg" width="100%">
      <div class="btnLeft" @click="_gotoHandler(1)"></div>
      <div class="btnRight" @click="_gotoHandler(2)"></div>
    </div>
    <div class="btn-back" v-show="step !== 0" @click="_gotoHandler(0)">
      <img :src="require('../assets/btn-back.png')"
      height="30"
      >
    </div>
    <div v-show="step === 1">
      <img src="/images/20210106/taocan.jpg" width="100%">
    </div>
    <div v-show="step === 2">
      <img src="/images/20210106/productlist.jpg" width="100%">
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    _gotoHandler(index) {
      this.step = index
    }
  },
  data: function () {
    return {
      step: 0
    }
  },
}
</script>


<style lang="scss" scoped>
.homeContainer{
  position: relative;
  & > div{
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    &.btnLeft{
      left: 0;
    }
    &.btnRight{
      right: 0;
    }
  }
}
.btn-back{
  position: fixed;
  left: 0em;
  top: 5em;
  // width: 80px;
  // height: 80px;
  // background: #fff;
  // border-radius: 50%;
  // overflow: hidden;
}
</style>
