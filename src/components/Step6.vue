<template>
  <div class="pageContainer">
    <StepsIndicator />
    <div class="pageContent" v-if="cardInfo.getPresentWay === 'EXPRESS'">
      <div
        class="presentsOuter presentsOuterA STLiBian"
        v-if="!cardInfo.express"
      >
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
      <div class="presentsOuter STLiBian" v-if="cardInfo.express">
        <div>您的礼箱已经{{cardInfo.express.companyName === '跑腿配送' ? '提' : '发'}}货</div>
        <div>提货方式：{{cardInfo.express.companyName}}</div>
        <div>很荣幸为您提供服务</div>
        <template v-if="cardInfo.express.companyName !== '跑腿配送'">
          <div class="t1">
            冷链物流单号
          </div>
          <div class="AvantGardeITCbyBT t2">
            {{ cardInfo.express.expressNo }}
          </div>
          <div class="t3">本次配送单位：{{ cardInfo.express.companyName }}<br />每晚22点前更新物流信息</div>
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
        </template>
        <template v-else>

        </template>
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
        返回
      </div>
    </div>
  </div>
</template>

<script>
import StepsIndicator from "@/components/StepsIndicator";
import { mapState } from "vuex";
export default {
  data: function() {
    return {
      express: null
    };
  },
  computed: {
    ...mapState(["isActivated", "cardInfo"])
  },
  methods: {
    copy(data) {
      const url = data;
      const oInput = document.createElement("input");
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$toasted.show("复制成功", {
        theme: "bubble",
        position: "top-center",
        duration: 3000
      });
      oInput.remove();
    },
    copyHandler() {
      this.copy(this.cardInfo.express.expressNo);
    },
    callPhone() {
      let url;
      if (this.cardInfo.express.companyId === "1") {
        url = "tel:950616";
      } else if (this.cardInfo.express.companyId === "2") {
        url = "tel:95338";
      }
      if (url) {
        window.location.href = url;
      }
    },
    gotoWeb() {
      let url;
      if (this.cardInfo.express.companyId === "1") {
        url =
          "https://www.jdl.cn/order/search?waybillCodes=" +
          this.cardInfo.express.expressNo;
      } else if (this.cardInfo.express.companyId === "2") {
        url =
          "https://www.sf-express.com/cn/sc/dynamic_function/waybill/#search/bill-number/" +
          this.cardInfo.express.expressNo;
      }
      if (url) {
        window.location.href = url;
      }
    },
    chageStepIndexTpPerv() {
      this.$store.commit("chageStepIndex", 1);
      this.$store.commit("updateItem", { key: "currentCardNo", value: "" });
    }
  },
  components: {
    StepsIndicator
  }
};
</script>

<style lang="scss" scoped>
$red: #dc2123;
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
    color: $red;
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
    color: $red;
    font-size: 50px;
    margin-top: 67px;
    margin-bottom: 67px;
  }
  .t2a {
    color: $red;
    font-size: 50px;
  }
  .t3a {
    color: $red;
    font-size: 36px;
  }
}
</style>
