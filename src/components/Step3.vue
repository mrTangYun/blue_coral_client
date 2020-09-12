<template>
  <div class="pageContainer step3PageContainer">
    <StepsIndicator />
    <div class="pageContent">
      <div class="tabsBtns">
        <div
          :class="{
          tabBtn: true,
          isActivited: deliverType === 'self'
        }"
          @click="changeTab('self')"
        >到店自提</div>
        <div
          :class="{
          tabBtn: true,
          isActivited: deliverType === 'express'
        }"
          @click="changeTab('express')"
        >免费冷链配送</div>
      </div>
      <div class="STLiBian tx1">完善持卡人信息</div>
      <div class="inputTips0">
        请务必填写真实信息以绑定此卡！
        <br />蓝珊瑚鲜生郑重承诺：您的个人信息，我们绝不外泄！
      </div>
      <div class="inputArea">
        <input :value="name" @input="changeInputName" placeholder="您的姓名" @blur="inputBlur" />
        <div class="ok" v-if="validateName"></div>
      </div>
      <div class="inputTips">请填写您的真实姓名</div>
      <div class="inputArea">
        <input :value="mobile" @input="changeInputMobile" placeholder="手机号码" @blur="inputBlur" />
        <div class="ok" v-if="validateMobile"></div>
      </div>
      <div class="inputTips">请填写您常用的手机号码</div>
      <div class="tabs">
        <div class="tab" v-show="deliverType === 'self'">
          <div class="STLiBian tx2">为节省您取货时间，避免等待，请选择：</div>
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
          <div class="txt3">温馨提示：来店自提礼箱，请务必携带此卡！</div>
        </div>
        <div class="tab" v-show="deliverType === 'express'">
          <div class="inputArea">
            <input
              :value="address"
              @input="changeInputAddress"
              placeholder="收货地址"
              @blur="inputBlur"
            />
            <div class="ok" v-if="validateAddress"></div>
          </div>
          <div class="inputTips">请详细填写收件人地址，顺风冷链配送</div>

          <label class="btnPhoto" for="photoFile">
            <img :src="require('./images/photo.png')" alt />
            <span>请为“挚情卡”拍照</span>
          </label>

          <input id="photoFile" type="file" accept="image/*" capture @change="onClickTakePhoto" />
          <div class="inputTips">
            请拍摄“挚情卡”正面照片，
            <br />如信息模糊，客服人员会向您至电核实
          </div>
        </div>
      </div>
    </div>
    <div class="btns btns_row">
      <div class="btn isValidated" @click="chageStepIndexTpPerv">上一步</div>
      <div
        :class="{
        btn:true, isValidated: validateNextBtn
      }"
        @click="chageStepIndexToNext"
      >下一步</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import StepsIndicator from "@/components/StepsIndicator";
export default {
  computed: {
    ...mapState([
      "zt_qhsj",
      "name",
      "mobile",
      "address",
      "deliverType",
      "fileKey",
    ]),
    ...mapActions(["onUploadFile"]),
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
    validateNextBtn: function () {
      if (this.validateName && this.validateMobile) {
        if (this.deliverType === "self") {
          return !!this.zt_qhsj;
        } else {
          if (this.fileKey) {
            return this.validateAddress;
          }
        }
      }
      return false;
    },
  },
  data: function () {
    return {
      hour: null,
    };
  },

  methods: {
    inputBlur() {
      window.scrollTo(0, 0);
    },
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
      if (this.validateNextBtn) {
        this.$store.commit("chageStepIndex", 3);
      }
    },

    chageStepIndexTpPerv() {
      this.$store.commit("chageStepIndex", 1);
    },
    changeTab(type) {
      this.$store.commit("updateItem", {
        key: "deliverType",
        value: type,
      });
    },

    onClickTakePhoto(e) {
      if (e.target.files.length) {
        this.$store.dispatch("onUploadFile", {
          apolloClient: this.$apollo.provider.defaultClient,
          file: e.target.files[0],
        });
      }
      // window.wx.chooseImage({
      //   count: 1, // 默认9
      //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      //   success: function (res) {
      //     var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      //     alert(localIds)
      //   }
      // })
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
    font-size: 36px;
    color: #ffffff;
    font-family: "STLiBian";
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
  margin: 10px auto;
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
      height: 70px;
      line-height: 70px;
    }
  }
}
.tx1 {
  font-size: 48px;
  font-weight: bold;
  font-stretch: normal;
  color: #c19b25;
  margin: 38px auto 21px;
}
.tx2 {
  font-size: 38px;
  font-weight: bold;
  font-stretch: normal;
  color: #c19b25;
}
.btnPhoto {
  margin-top: 27px;
  font-family: STLibian;
  font-size: 48px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -5px;
  color: #ffffff;
  width: 500px;
  height: 80px;
  background-image: linear-gradient(#3c5b87, #3c5b87),
    linear-gradient(#2f4f7e, #2f4f7e);
  background-blend-mode: normal, normal;
  border-radius: 15px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 38px;
    height: 33px;
    margin-right: 39px;
  }
}
#photoFile {
  display: none;
}
.txt3 {
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  color: #dc2123;
}
</style>
