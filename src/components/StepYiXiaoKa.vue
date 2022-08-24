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
        <div class="t824 t_red">
          您的礼箱已经发货
        </div>
        <div class="t824 t_red">
          提货方式：{{ cardInfo.express.companyName }}
        </div>
        <div class="t824 t_gold">很荣幸为您提供服务</div>
        <template v-if="cardInfo.express.companyName !== '跑腿配送'">
          <div class="t1">
            冷链物流单号
          </div>
          <div class="AvantGardeITCbyBT t2">
            {{ cardInfo.express.expressNo }}
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
        </template>
        <template v-else>
          <div class="myInfo">
            <div class="STLiBian title">收货人</div>
            <div class="value">{{ cardInfo.bindInfo.name }}</div>
            <div class="STLiBian title">收货电话</div>
            <div class="AvantGardeITCbyBT value">
              {{ cardInfo.bindInfo.mobile.replace(/(?=(\d{4})+$)/g, " ") }}
            </div>
            <!-- <template v-if="deliverType === 'express'">
              <div class="STLiBian title">收货地址</div>
              <div class="value">{{ address }}</div>
            </template> -->
          </div>
          <div class="shopInfo">
            <div class="name">蓝珊瑚鲜生超市</div>
            <div class="tel">电话：0531 - 5553 5100 / 158 5317 9393</div>
            <div class="add">地址：济南市高新区 龙奥北路 1 5 7 7 号</div>
          </div>
        </template>
      </div>
    </div>
    <div class="pageContent" v-if="cardInfo.getPresentWay === 'SELF'">
      <div class="presentsOuter STLiBian">
        <div class="t824 t_red">
          您的礼箱已经完成提货
        </div>
        <div class="t824 t_red">
          提货方式：到店自取
        </div>
        <div class="t824 t_gold">很荣幸为您提供服务</div>
        <div class="myInfo">
          <div class="STLiBian title">取件人</div>
          <div class="value">{{ cardInfo.bindInfo.name }}</div>
          <div class="STLiBian title">取件电话</div>
          <div class="AvantGardeITCbyBT value">
            {{ cardInfo.bindInfo.mobile.replace(/(?=(\d{4})+$)/g, " ") }}
          </div>
        </div>
        <div class="shopInfo">
          <div class="name">蓝珊瑚鲜生超市</div>
          <div class="tel">电话：0531 - 5553 5100 / 158 5317 9393</div>
          <div class="add">地址：济南市高新区 龙奥北路 1 5 7 7 号</div>
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
      this.$store.commit("chageStepIndex", 0);
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
  padding: 0 57px;
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
    margin: 10px auto 22px;
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
    margin-bottom: 32px;
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
.t824 {
  font-size: 48px;
  line-height: 27px;
  margin: 27px 0;
  letter-spacing: 0px;
}
.t_red {
  color: #dc2123;
}
.t_gold {
  color: #c19b25;
}

.myInfo {
  width: 380px;
  margin: 0 auto;
  background-image: linear-gradient(#f6f6f6, #f6f6f6),
    linear-gradient(#2f4f7e, #2f4f7e);
  background-blend-mode: normal, normal;
  border-radius: 15px;
  border: solid 6px #c4a23d;
  color: #dc2123;
  padding: 42px 110px 47px;
  line-height: 43px;
  .title {
    font-size: 36px;
  }
  .value {
    font-size: 30px;
    color: #b28a2a;
  }
}
.shopInfo {
  color: #c19b25;
  margin-top: 76px;
  .name {
    font-size: 40px;
    font-weight: bold;
    font-stretch: normal;
    line-height: 27px;
  }
  .tel,
  .add {
    font-size: 36px;
  }
}
</style>
