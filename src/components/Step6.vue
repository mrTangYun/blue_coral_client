<template>
  <div class="pageContainer">
    <StepsIndicator />
    <div class="pageContent">
      <div class="presentsOuter presentsOuterA STLiBian" v-if="!express">
        <div class="t1a">
          未发货，请稍等！
        </div>

        <div class="t2a">
          发货说明
        </div>
        <div class="t3a">
          本店收到配送要求后，24小时内发货<br />
          发货后可在此查询配送单号
        </div>
      </div>
      <div class="presentsOuter STLiBian" v-if="express">
        <div class="t1">
          冷链物流单号
        </div>
        <div class="AvantGardeITCbyBT t2">
          12345678901234567890
        </div>
        <div class="t3">
          本次配送：顺丰速运
        </div>
        <div class="t4" @click="copyHandler">
          点我复制单号
        </div>
        <div class="t5">详细配送信息可在<br />物流官方网站进行查询</div>
        <div class="t4" @click="gotoWeb">
          进入物流官网
        </div>
        <div class="t4" @click="callPhone">
          拨打物流客服电话
        </div>
      </div>
    </div>
    <div
      :class="{
        btns: true,
        btns_row: true
      }"
    >
      <div
        :class="{
          btn: true,
          isValidated: true
        }"
        @click="chageStepIndexTpPerv"
      >
        返 回
      </div>
    </div>
  </div>
</template>

<script>
import StepsIndicator from '@/components/StepsIndicator'
import { mapState } from 'vuex'
export default {
  data: function () {
    return {
      express: null
    }
  },
  computed: {
    ...mapState(['isActivated'])
  },
  methods: {
    copy (data) {
      const url = data
      const oInput = document.createElement('input')
      oInput.value = url
      document.body.appendChild(oInput)
      oInput.select() // 选择对象;
      document.execCommand('Copy') // 执行浏览器复制命令
      this.$toasted.show('复制成功', {
        theme: 'bubble',
        position: 'top-center',
        duration: 3000
      })
      oInput.remove()
    },
    copyHandler () {
      this.copy('hello')
    },
    callPhone () {
      window.location.href = 'tel:12315'
    },
    gotoWeb () {
      window.location.href = 'tel:12315'
    },
    chageStepIndexTpPerv () {
      this.$store.commit('chageStepIndex', 1)
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
  padding: 0 87px;
  &.presentsOuterA {
    padding: 0 125px;
  }
  .t1 {
    color: #c19b25;
    font-size: 48px;
    font-weight: bold;
  }
  .t2 {
    color: #c19b25;
    font-size: 30px;
    height: 80px;
    line-height: 80px;
    background-image: linear-gradient(#ffffff, #ffffff),
      linear-gradient(#2f4f7e, #2f4f7e);
    background-blend-mode: normal, normal;
    border-radius: 15px;
    border: solid 5px #435f84;
    margin: 37px auto 22px;
  }
  .t3 {
    color: #c19b25;
    font-size: 36px;
    margin-bottom: 34px;
  }
  .t4 {
    color: #fff;
    font-size: 48px;
    margin-bottom: 34px;
    height: 80px;
    line-height: 80px;
    background-image: linear-gradient(#3c5b87, #3c5b87),
      linear-gradient(#2f4f7e, #2f4f7e);
    background-blend-mode: normal, normal;
    border-radius: 15px;
  }
  .t5 {
    color: #c19b25;
    font-size: 36px;
    margin-bottom: 52px;
  }
  .t1a {
    color: #dc2123;
    font-size: 50px;
    margin-top: 67px;
    margin-bottom: 67px;
  }
  .t2a {
    color: #dc2123;
    font-size: 50px;
  }
  .t3a {
    color: #dc2123;
    font-size: 36px;
  }
}
</style>
