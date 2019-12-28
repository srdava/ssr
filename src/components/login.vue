<template>
  <div class="login">
    <div class="content">
      <div class="contentList">
          <van-field v-model="username" placeholder="请输入用户名"/>
          <div class="fenge"></div>
          <van-field
            v-model="password"
            type="password"
            placeholder="请输入密码"
            clickable
          />
          <!-- <div class="fenge"></div> -->
          <van-button type="primary" size="large"  @click="tologin()">登录</van-button>
          <div class="registe" @click="toregiste">请注册</div>
      </div>
    </div>
  </div> 
</template>

<script>
import { Toast } from 'vant';
// import { bus } from '../bus'
export default {
  data() {
    return {
      username: "",
      password: "",
      id:""
    };
  },
  methods: {
    toregiste(){
      this.$router.push({
       path:'/registe'
      })
    },
    tologin() {
      if ("" == this.username) {
        Toast.fail('请输入用户名');
        return;
      }
      if ("" == this.password) {
        Toast.fail('请输入密码');
        return;
      }
      var data = {
        userAccout: this.username,
        passWord: this.password,
        isAdmin: "0"
      };
      this.$axios
        .post(this.$store.state.url+'/customer/login', data)
        .then(res => {
          if (res.data.code == 1) {
            // this.id=res.data.data.id
            sessionStorage.setItem("id",res.data.data.id)
            sessionStorage.setItem("userName",res.data.data.userName)
            this.$router.push({
            path:'/home'
            })
          } else {
            Toast.fail(res.data.msg);
          }
        });
    },
    clear() {
      this.userName = "";
      this.password = "";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {

  width: 100%;
  height: 100%;
  background-image: url("../assets/9fa9e6dbbb904cdda599752497077356_th.png");
  background-size: 100% 100%;
  justify-content: center;
  display: flex;
}
.fenge{
  height: 1rem;
}
.content {
  top: 40%;
  border-radius: 2%;
  background-color: rgba(251, 250, 239, 0.2);
  width: 84%;
  height: 15rem;
  -webkit-box-pack: center;
  justify-content: center;
  position: fixed;
  -webkit-box-align: center;
  align-items: center;
  display: flex;
} 
.contentList{
  margin-top: 0.5rem;
  width: 90%;
}
.registe{
  color: white;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  float: right;
}
</style>

<style>
.login .van-button--large{
  width: 100% ! important;
  height: 44px ! important;
  margin-top: 1rem ! important;
  line-height: 44px ! important;
}
.login .van-button--primary {
  color: #fff;
  background-color: #00bcd47a;
  border: 1px solid #03a9f461;
}
.van-cell{
  background-color:#ffffffcf;
}
</style>