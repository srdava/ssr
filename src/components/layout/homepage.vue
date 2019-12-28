<template>
  <div class="homepage">
    <router-view></router-view>
    <bottom ></bottom>
    <!-- 第一步，把变量名放入子组件，将该变量设置为动态值 格式 :a='b'(a为变量，b为动态值) -->
  </div>
</template>

<script>
import bottom from "../layout/bottom";

export default {
  components: { bottom,},
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.homepage{
  width: 100%;
  height: 100%;
}
</style>
