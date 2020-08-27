<template>
  <div class="container">
    <div class="title">{{title}}</div>
    <div class="content">{{content}}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    content: String,
  },
};
</script>


<style lang="scss" scoped>
.container {
  border-radius: 15px;
  border: solid 2px #c4a23d;
  width: 600px;
  margin: 13px auto 0;
  overflow: hidden;
  .title {
    height: 31px;
    font-family: STXihei;
    font-size: 24px;
    line-height: 31px;
    color: #ffffff;
    background: #c19b25;
    padding: 4px 0 ;
  }
  .content{
      padding: 27px;
      text-align: center;
      font-size: 30px;
      line-height: 47px;
      color: #b28a2a;
  }
}
</style>