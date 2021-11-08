<template>
  <div class="pageContainer step3PageContainer">
    <StepsIndicator />
    <div class="pageContent">
      <div class="STLiBian pageTitles">请选择提货方式</div>
      <div class="STLiBian tabsBtns">
        <div
          :class="{
            tabBtn: true,
            isActivited: deliverType === 'express'
          }"
          @click="changeTab('express')"
        >
          免费配送
        </div>
        <div
          :class="{
            tabBtn: true,
            isActivited: deliverType === 'self'
          }"
          @click="changeTab('self')"
        >
          到店自取
        </div>
      </div>
      <div class="STLiBian tx1">完善持卡人信息</div>
      <div class="STLiBian inputTips0">
        请务必填写真实信息以绑定此卡！
      </div>
      <div
        :class="{
          inputArea: true,
          styleSelf: deliverType === 'self'
        }"
      >
        <input
          :value="name"
          @input="changeInputName"
          :placeholder="'请填写您的真实姓名'"
          @blur="inputBlur"
        />
        <div class="ok" v-if="validateName"></div>
      </div>
      <div class="STLiBian inputTips" v-show="deliverType !== 'self'"></div>
      <div
        :class="{
          inputArea: true,
          styleSelf: deliverType === 'self'
        }"
      >
        <input
          :value="mobile"
          @input="changeInputMobile"
          :placeholder="'请填写您常用的手机号码'"
          @blur="inputBlur"
        />
        <div class="ok" v-if="validateMobile"></div>
      </div>
      <div class="STLiBian inputTips" v-show="deliverType !== 'self'"></div>
      <div class="tab" v-show="deliverType === 'express'">
        <div class="inputArea">
          <input
            :value="address"
            @input="changeInputAddress"
            placeholder="请详细填写收件人地址"
            @blur="inputBlur"
          />
          <div class="ok" v-if="validateAddress"></div>
        </div>
        <div class="STLiBian inputTips"></div>
      </div>
      <div
        :class="{
          inputFileArea: true,
          styleSelf: deliverType === 'self'
        }"
      >
        <label class="btnPhoto" for="photoFile">
          <img :src="require('./images/photo.png')" alt />
          <span>请为“挚情卡”拍照</span>
        </label>

        <input
          id="photoFile"
          type="file"
          accept="image/*"
          capture
          @change="onClickTakePhoto"
        />
        <div class="STLiBian inputTips">请拍摄“挚情卡”正面照片</div>
      </div>
    </div>
    <div class="STLiBian txt3" v-show="deliverType === 'self'">
      重要提示：来店自提，请务必携带此卡！
    </div>
    <div class="btns btns_row">
      <div class="btn isValidated" @click="chageStepIndexTpPerv">上一步</div>
      <div
        :class="{
          btn: true,
          isValidated: validateNextBtn
        }"
        @click="chageStepIndexToNext"
      >
        下一步
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import StepsIndicator from '@/components/StepsIndicator'
export default {
  computed: {
    ...mapState(['name', 'mobile', 'address', 'deliverType', 'fileKey']),
    ...mapActions(['onUploadFile']),
    validateName: function () {
      if (!this.name) {
        return false
      }
      const r = /^[\u4E00-\u9FA5]{2,4}$/
      return r.test(this.name)
    },
    validateMobile: function () {
      if (!this.mobile) {
        return false
      }
      const r = /^1\d{10}$/
      return r.test(this.mobile)
    },
    validateAddress: function () {
      if (!this.address) {
        return false
      }
      return true
    },
    validateNextBtn: function () {
      if (this.validateName && this.validateMobile && this.fileKey) {
        if (this.deliverType === 'self') {
          return true
        } else {
          return this.validateAddress
        }
      }
      return false
    }
  },
  data: function () {
    return {
      hour: null
    }
  },

  methods: {
    inputBlur () {
      window.scrollTo(0, 0)
    },
    changeInputAddress (e) {
      this.$store.commit('updateItem', {
        key: 'address',
        value: e.target.value
      })
    },
    changeInputName (e) {
      this.$store.commit('updateItem', {
        key: 'name',
        value: e.target.value
      })
    },
    changeInputMobile (e) {
      this.$store.commit('updateItem', {
        key: 'mobile',
        value: e.target.value
      })
    },
    chageStepIndexToNext () {
      if (this.validateNextBtn) {
        this.$store.commit('chageStepIndex', 3)
      }
    },

    chageStepIndexTpPerv () {
      this.$store.commit('chageStepIndex', 1)
    },
    changeTab (type) {
      this.$store.commit('updateItem', {
        key: 'deliverType',
        value: type
      })
    },

    onClickTakePhoto (e) {
      if (e.target.files.length) {
        this.$store.dispatch('onUploadFile', {
          apolloClient: this.$apollo.provider.defaultClient,
          file: e.target.files[0]
        })
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
    }
  },

  components: {
    StepsIndicator
  }
}
</script>

<style lang="scss" scoped>
.pageTitles{
  font-size: 48px;
  color: #c19b25;
  margin-bottom: 48px ;
}
.tabsBtns {
  display: flex;
  justify-content: center;
  .tabBtn {
    font-size: 48px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 276px;
    height: 61px;
    letter-spacing: -2px;
    background-image: linear-gradient(#cccccc, #cccccc),
      linear-gradient(#2f4f7e, #2f4f7e);
    background-blend-mode: normal, normal;
    border-radius: 30px 31px 31px 30px;
    position: relative;
    text-indent: 29px;
    &::before,
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      left: 0;
      border-radius: 50%;
    }
    &::before {
      width: 48px;
      height: 48px;
      background-color: #ffffff;
      left: 8px;
    }

    &.isActivited {
      background-image: linear-gradient(#3c5b87, #3c5b87),
        linear-gradient(#2f4f7e, #2f4f7e);
      &::after {
        width: 38px;
        height: 38px;
        left: 13px;
        background-color: #69ba00;
      }
    }
    &:first {
      margin-right: 8px;
    }
    &:last-child {
      margin-left: 8px;
    }
    img {
      height: 28px;
    }
  }
}
.inputTips0 {
  font-size: 36px;
  line-height: 38px;
  letter-spacing: 0px;
  color: #dc2123;
  margin: 21px auto;
}
.inputTips {
  font-size: 36px;
  line-height: 38px;
  letter-spacing: 0px;
  color: #dc2123;
  margin: 10px auto;
}
.step3PageContainer {
  .inputArea {
    margin: 15px auto;
    input {
      &::placeholder {
        font-size: 38px;
      }
    }
    input {
      height: 70px;
      line-height: 70px;
    }
  }
  .inputFileArea {
    &.styleSelf {
      margin: 15px auto;
    }
  }
}
.tx1 {
  font-size: 48px;
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
  font-size: 36px;
  font-stretch: normal;
  color: #dc2123;
}
</style>
