<template>
  <div class="centerbody">
    <div class="toubu">
      <div class="touxiang">
        <img src="../assets/wupeng.png" />
      </div>
      <div class="wm">{{userName}}</div>
    </div>

    <div class="contentList">
      <van-cell title="我的订单" @click="tomydd" is-link />
      <van-cell title="我的消息" is-link />
      <van-cell title="设置" @click="toshezhi" is-link />
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      userName:''
    };
  },
  mounted(){
    this.userName=sessionStorage.getItem("userName")
  },
  methods:{
    tomydd(){
      this.$router.push({
       path:'/mydingdan'
      })
    },
    toshezhi(){
      this.$router.push({
       path:'/shezhi'
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.centerbody {
  background: #f3f3f3;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
}
.toubu {
  background:#87ceeb;
  text-align: center;
  padding: 3rem 0;
}
.touxiang > img {
  height: 3.5rem;
  border-radius: 100%;
  width: 3.5rem;
  border: 0.1rem solid gray;
}
.wm {
  font-size: 0.9rem;
}
/*内容*/
.contentList {
  background: #ffffff;
}
.content {
  height: 2.5rem;
  line-height: 2.5rem;
  width: 100%;
  border-top: 0.1rem solid #f2f2f2;
  overflow: hidden;
}
.dingdanzuo {
  float: left;
  overflow: hidden;
  width: 50%;
}
.dingdanimg > img {
  height: 1.5rem;
  margin: 0.5rem 0;
  padding-left: 0.5rem;
  float: left;
}
.dingdan1 {
  margin-left: 0.2rem;
  float: left;
  font-size: 1rem;
}
.dingdan2 {
  float: right;
}
.dingdan2 > img {
  height: 1.5rem;
  margin: 0.5rem 0.4rem;
}

</style>
