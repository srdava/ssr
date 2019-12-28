<template>
  <div class="shezhi">
    <div class="toubu">
       <van-nav-bar
        title="设置"
        left-text="返回"
        left-arrow
        @click-left="back"
      />
    </div>

    <div class="contentList">
      <div>
        <van-cell title="修改密码" @click="tonewpassword" is-link />
      </div>
      <div>
        <van-cell title="退出" @click="tologin" is-link />
      </div>

      <!-- <div class="content">
        <div class="dingdan1">修改密码</div>
        <div class="dingdan2">
          <img src="../assets/you.png" />
        </div>
      </div>
      <div class="content">
        <div class="dingdan1" @click="tocenter">退出</div>
        <div class="dingdan2">
          <img src="../assets/you.png" />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods:{
    back(){
      this.$router.push({
       path:'/center'
      })
    },
    tologin(){
      sessionStorage.clear
      this.$router.push({
       path:'/'
      })
    },
    tonewpassword(){
      sessionStorage.clear
      this.$router.push({
       path:'/newpassword'
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shezhi {
  background: #f2f2f2;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
}
.toubu {
  height: 2.5rem;
  line-height: 2.5rem;
  background: white;
  text-align: center;
  position: fixed;
  top: 0;
  width: 100%;
}
.toubuimg > img {
  height: 1.4rem;
  position: absolute;
  left: 0.2rem;
  top: 0.5rem;
}

.contentList {
  background: #ffffff;
  margin-top: 3rem;
}
.content {
  height: 2.5rem;
  line-height: 2.5rem;
  border-top: 0.5rem solid #f2f2f2;
  overflow: hidden;
  font-size: 14px;
  border-bottom: 0.5rem solid #f2f2f2;
}
.dingdan1 {
  margin-left: 0.2rem;
  float: left;
  width: 70%;
}
.dingdan2 > img {
  height: 1.2rem;
  margin: 0.7rem 0.4rem;
  float: right;
}

</style>
