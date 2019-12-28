<template>
      <van-submit-bar
  :price="3050"
  button-text="提交订单"
  @submit="onSubmit"
>
  <van-checkbox v-model="checked">全选</van-checkbox>
  <span slot="tip">
    你的收货地址不支持同城送, <span>修改地址</span>
  </span>
</van-submit-bar>
</template>

<script>
export default {
  data() {
    return {};
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
