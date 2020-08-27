<template>
  <div class="pageContainer step3PageContainer">
    <StepsIndicator />
    <div class="pageContent">
      <div class="tabsBtns">
        <div
          :class="{
          tabBtn: true,
          isActivited: tabIndex === 0
        }"
          @click="changeTab(0)"
        >
          <img :src="require('./images/txt_ddzt.png')" />
        </div>
        <div
          :class="{
          tabBtn: true,
          isActivited: tabIndex === 1
        }"
          @click="changeTab(1)"
        >
          <img :src="require('./images/txt_mfllps.png')" />
        </div>
      </div>
      <div>完善持卡人信息</div>
      <div class="inputTips0">
        请务必填写真实信息以绑定此卡！
        <br />蓝珊瑚鲜生郑重承诺：您的个人信息，我们绝不外泄！
      </div>
      <div class="inputArea">
        <input :value="name" @input="changeInputName" placeholder="您的姓名" />
        <div class="ok" v-if="validateName"></div>
      </div>
      <div class="inputTips">请填写您的真实姓名</div>
      <div class="inputArea">
        <input :value="mobile" @input="changeInputMobile" placeholder="手机号码" />
        <div class="ok" v-if="validateMobile"></div>
      </div>
      <div class="inputTips">请填写您常用的手机号码</div>
      <div class="tabs">
        <div class="tab" v-show="tabIndex === 0">
          <div>为节省您取货时间，避免等待，请选择：</div>
          <div class="hours">
            <div
              :class="{
              h1: true, isActivited: zt_qhsj==='1小时' }"
              @click="changeZtQhsj('1小时')"
            ></div>
            <div :class="{ h2: true, isActivited: zt_qhsj==='2小时' }" @click="changeZtQhsj('2小时')"></div>
            <div :class="{ h3: true, isActivited: zt_qhsj==='3小时' }" @click="changeZtQhsj('3小时')"></div>
            <div :class="{ huk: true, isActivited: zt_qhsj==='不确定' }" @click="changeZtQhsj('不确定')"></div>
          </div>
          <div>温馨提示：来店自提礼箱，请务必携带此卡！</div>
        </div>
        <div class="tab" v-show="tabIndex === 1">
          <div class="inputArea">
            <input :value="address" @input="changeInputAddress" placeholder="收货地址" />
            <div class="ok" v-if="validateAddress"></div>
          </div>
          <div class="inputTips">请详细填写收件人地址，顺风冷链配送</div>

          <div>请为“挚情卡”拍照</div>
          <div class="inputTips">请拍摄“挚情卡”正面照片，<br />如信息模糊，客服人员会向您至电核实</div>
        </div>
      </div>
    </div>
    <div class="btns btns_row">
      <div class="btn isValidated" @click="chageStepIndexTpPerv">
        <img :src="require('./images/txt_syb.png')" alt="上一步" />
      </div>
      <div
        :class="{
        btn:true, isValidated: validateNextBtn
      }"
        @click="chageStepIndexToNext"
      >
        <img :src="require('./images/txt_xyb.png')" alt="下一步" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import StepsIndicator from "@/components/StepsIndicator";
export default {
  computed: {
    ...mapState(["zt_qhsj", "name", "mobile", "address", "imageUrl"]),
    validateName: function () {
      if (!this.name) {
        return false;
      }
      const r = /^[\u4E00-\u9FA5]{2,4}$/;
      return r.test(this.name);
    },
    validateMobile: function () {
      if (!this.mobile) {
        return false;
      }
      const r = /^1\d{10}$/;
      return r.test(this.mobile);
    },
    validateAddress: function () {
      if (!this.address) {
        return false;
      }
      return true;
    },
    validateImageUrl: function () {
      if (!this.imageUrl) {
        return false;
      }
      return true;
    },
    validateNextBtn: function () {
      if (this.validateName && this.validateMobile) {
        if (this.tabIndex === 0) {
          return !!this.zt_qhsj;
        }
      }
      return false;
    },
  },
  data: function () {
    return {
      tabIndex: 0,
      hour: null,
    };
  },

  methods: {
    changeInputAddress(e) {
      this.$store.commit("updateItem", {
        key: "address",
        value: e.target.value,
      });
    },
    changeInputName(e) {
      this.$store.commit("updateItem", {
        key: "name",
        value: e.target.value,
      });
    },
    changeInputMobile(e) {
      this.$store.commit("updateItem", {
        key: "mobile",
        value: e.target.value,
      });
    },
    changeZtQhsj(timeStr) {
      this.$store.commit("updateZt_qhsj", timeStr);
    },
    chageStepIndexToNext() {
      this.$store.commit("chageStepIndex", 3);
    },

    chageStepIndexTpPerv() {
      this.$store.commit("chageStepIndex", 1);
    },
    changeTab(index) {
      this.tabIndex = index;
    },
  },

  components: {
    StepsIndicator,
  },
};
</script>

<style lang="scss" scoped>
.tabsBtns {
  display: flex;
  border-bottom: 5px solid #51709c;
  justify-content: center;
  .tabBtn {
    width: 300px;
    background: linear-gradient(#cacaca, #bababa);
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 0.4em;
    border-top-right-radius: 0.4em;
    &.isActivited {
      background: linear-gradient(#6180ab, #506f9b);
    }
    &:first {
      margin-right: 1px;
    }
    &:last-child {
      margin-left: 1px;
    }
    img {
      height: 28px;
    }
  }
}
.inputTips0 {
  font-family: STYuanti-SC-Light;
  font-size: 24px;
  font-weight: bold;
  line-height: 38px;
  letter-spacing: 0px;
  color: #dc2123;
  margin: 21px auto;
}
.inputTips {
  font-family: STXihei;
  font-size: 24px;
  line-height: 38px;
  letter-spacing: 0px;
  color: #bd983c;
  margin: 15px auto;
}
.tabs {
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  .hours {
    display: flex;
    justify-content: space-between;
    padding: 19px 81px 21px;
    & > div {
      border-radius: 50%;
      width: 117px;
      height: 117px;
      background-color: #ffffff;
      background-blend-mode: normal, normal;
      border: solid 2px #b0b0b0;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 33px auto;
      &.isActivited {
        background-color: #3c5b87;
        &.h1 {
          background-image: url("./images/txt_1xs_2.png");
        }
        &.h2 {
          background-image: url("./images/txt_2xs_2.png");
        }
        &.h3 {
          background-image: url("./images/txt_3xs_2.png");
        }
        &.huk {
          background-image: url("./images/txt_bqd_2.png");
        }
      }
      &.h1 {
        background-image: url("./images/txt_1xs_1.png");
      }
      &.h2 {
        background-image: url("./images/txt_2xs_1.png");
      }
      &.h3 {
        background-image: url("./images/txt_3xs_1.png");
      }
      &.huk {
        background-image: url("./images/txt_bqd_1.png");
      }
    }
  }
}
.step3PageContainer {
  .inputArea {
    input {
      height: 80px;
      line-height: 80px;
    }
  }
}
</style>
