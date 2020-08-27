<template>
  <div class="pageContainer">
    <StepsIndicator />
    <div class="pageContent">
      <div class="STLiBian tx1">
        本卡内含：价值
        <span class="Trends">{{588}}</span>元礼箱
      </div>
      <div class="presents">
        <div v-for="(item, index) in presents" :key="item + index" class="item">
          <div class="title">{{item.title}}</div>
          <div class="dot"></div>
          <div class="unit">{{item.unit}}</div>
        </div>
      </div>
    </div>
    <div :class="{
      btns:true, btns_row:true
    }">
      <template v-if="isActivated">
        <div
          :class="{
      btn: true,
      isValidated: true
    }"
          @click="chageStepIndexTpPerv"
        >
          返    回
        </div>
      </template>
      <template v-else>
        <div
          :class="{
      btn: true,
      isValidated: true
    }"
          @click="chageStepIndexToNext"
        >
          马上激活
        </div>
        <div
          :class="{
      btn: true,
      isValidated: true
    }"
          @click="chageStepIndexTpPerv"
        >
          以后再说
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import StepsIndicator from "@/components/StepsIndicator";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["isActivated"]),
  },
  data: function () {
    return {
      presents: [
        {
          title: "8头鲍鱼",
          unit: "8只",
        },
        {
          title: "渤海湾野生大对虾.",
          unit: "8只",
        },
        {
          title: "8头鲍鱼",
          unit: "8只",
        },
        {
          title: "8头鲍鱼",
          unit: "18只",
        },
        {
          title: "8头鲍鱼8头鲍鱼",
          unit: "28只",
        },
        {
          title: "8头鲍鱼",
          unit: "8只",
        },
        {
          title: "8头鲍鱼",
          unit: "8只",
        },
        {
          title: "8头鲍鱼",
          unit: "8只",
        },
        {
          title: "8头鲍鱼",
          unit: "8只",
        },
        {
          title: "8头鲍鱼",
          unit: "18只",
        },
        {
          title: "8头鲍鱼8头鲍鱼",
          unit: "28只",
        },
        {
          title: "8头鲍鱼",
          unit: "8只",
        },
        {
          title: "8头鲍鱼",
          unit: "8只",
        },
        {
          title: "8头鲍鱼",
          unit: "8只",
        },
        {
          title: "8头鲍鱼",
          unit: "8只",
        },
        {
          title: "8头鲍鱼",
          unit: "18只",
        },
        {
          title: "8头鲍鱼8头鲍鱼",
          unit: "28只",
        },
        {
          title: "8头鲍鱼",
          unit: "8只",
        },
        {
          title: "8头鲍鱼",
          unit: "8只",
        },
        {
          title: "8头鲍鱼",
          unit: "8只",
        },
        {
          title: "8头鲍鱼",
          unit: "8只",
        },
        {
          title: "8头鲍鱼",
          unit: "18只",
        },
        {
          title: "8头鲍鱼8头鲍鱼",
          unit: "28只",
        },
        {
          title: "8头鲍鱼",
          unit: "8只",
        },
      ],
    };
  },
  methods: {
    chageStepIndexToNext() {
      this.$store.commit("chageStepIndex", 2);
    },
    chageStepIndexTpPerv() {
      this.$store.commit("chageStepIndex", 0);
    },
  },
  components: {
    StepsIndicator,
  },
};
</script>

<style lang="scss" scoped>
.tx1 {
  font-size: 48px;
  font-weight: bold;
  font-stretch: normal;
  color: #c19b25;
}
.presents {
  width: 530px;
  margin: 0 auto;
  height: 530px;
  background-color: #ffffff;
  border-radius: 8px;
  border: solid 2px #c7c7c7;
  padding: 24px 35px;
  overflow-y: scroll;
  .item {
    margin: 15px 0;
    display: flex;
    flex-direction: row;
    height: 36px;
    font-family: STXihei;
    font-size: 38px;
    line-height: 36px;
    color: #bd983c;
    .dot {
      flex: 1;
      height: 1px;
      align-self: flex-end;
      border-bottom: 5px dotted #bd983c;
      margin-bottom: 4px;
    }
  }
}
</style>
