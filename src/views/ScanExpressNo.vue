<template>
  <div class="scanExpressNo">
    <template v-if="isLoading">
      <div>loading</div>
      <div>{{ status }}</div>
    </template>
    <template v-else>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <!-- <div @click="scanHandler">扫一扫</div>
      <div>{{ result }}</div> -->
      <div @click="getAddHandler">获取地址</div>
      <div>{{ resultAddress }}</div>
    </template>
  </div>
</template>

<script>
import av from "leancloud-storage/live-query";

import gql from "graphql-tag";
export default {
  data: function() {
    return {
      obj: null,
      isLoading: true,
      result: null,
      status: "初始化",
      resultAddress: ''
    };
  },
  methods: {
    getAddHandler() {
      wx.openAddress({
        success: (res) => {
          var userName = res.userName; // 收货人姓名
          var postalCode = res.postalCode; // 邮编
          var provinceName = res.provinceName; // 国标收货地址第一级地址（省）
          var cityName = res.cityName; // 国标收货地址第二级地址（市）
          var countryName = res.countryName; // 国标收货地址第三级地址（国家）
          var detailInfo = res.detailInfo; // 详细收货地址信息
          var nationalCode = res.nationalCode; // 收货地址国家码
          var telNumber = res.telNumber; // 收货人手机号码
          this.resultAddress = JSON.stringify(res);
        }
      });
    },
    scanHandler() {
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["barCode"], ///*"qrCode",*/ 可以指定扫二维码还是一维码，默认二者都有
        success: res => {
          // var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          //   this.result = JSON.stringify(res);
          if (res.resultStr) {
            this.result = res.resultStr.split(",")[1];
            this.obj.set("no", res.resultStr.split(",")[1]);
            this.obj.save().then(o => {
              console.log("保存成功。");
            });
          }
        }
      });
    },
    async initPage() {
      const id = this.$route.query.id;
      const query = new av.Query("ExpressNoScanResult");
      this.obj = await query.get(id);
      this.isLoading = true;
      this.status = "initPage";
      const url = window.location.origin + window.location.pathname;
      const wxConfig = await this.$apollo.provider.defaultClient.query({
        query: gql`
          query weixinJsConfig($url: String!) {
            weixinJsConfig(url: $url) {
              appId
              nonceStr
              timestamp
              signature
            }
          }
        `,
        variables: {
          url
        }
      });

      this.status = "获取wx参数完毕";
      console.log("url", url);
      wx.ready(() => {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        console.log("ready---------------");
        this.isLoading = false;
      });
      wx.error(function(res) {
        console.log("res------", res);
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });

      const { __typename, ...weixinJsConfig } = wxConfig.data.weixinJsConfig;
      console.log("weixinJsConfig", weixinJsConfig);
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        ...weixinJsConfig,
        jsApiList: ["scanQRCode"] // 必填，需要使用的JS接口列表
      });
    }
  },
  mounted: function() {
    av.debug.enable();
    av.init({
      appId: "nzKh4Er9mW317lM1Yo0rcOaw-gzGzoHsz",
      appKey: "0rDCGis1HEMIpc69zXS8uPqa",
      serverURL: "https://db-leancloud-bluecoral.mrtangyun.com"
    });
    this.initPage();
  }
};
</script>

<style lang="scss" scoped>
.scanExpressNo {
  font-size: 40px;
}
</style>
