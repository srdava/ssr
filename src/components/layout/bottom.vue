<template>
  <div class="dibu">
  <van-tabbar v-model="active" route>
    <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o" to="/kinds">商品</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" to="/car">购物车</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="/center">我的</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
import { bus } from "../../bus";
export default {
  data() {
    return {
      active: 0
    };
  },
  created() {
  },
  methods: {
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
