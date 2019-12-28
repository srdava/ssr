<template>
<div class="newpassword">
  <div class="toubu">
    <van-nav-bar 
      title="修改密码" 
      left-text="返回"
      left-arrow
      @click-left="back"/>
  </div>
  <div class="content">
      <van-field v-model="edit.upPassWord" placeholder="用户原密码" />
      <van-field v-model="edit.newPassWord" placeholder="用户新密码" />
      <van-field v-model="secondPassWord" placeholder="确认新密码" />
  </div>
  <van-button type="primary" size="large"  @click="getedit()">确认修改</van-button>
</div>
</template>

<script>
export default {
  data() {
    return {
      secondPassWord:'',
      edit:{
        upPassWord:'',
        newPassWord:'',
        id:sessionStorage.getItem("id")
      }
    };
  },
  mounted(){
  },
  methods:{
    getedit(){
      if(""==this.edit.upPassWord){
        this.$toast.fail('请输入原密码')
        return
      }
      if(""==this.edit.newPassWord){
        this.$toast.fail('请输入新密码')
        return
      }
      if(""==this.secondPassWord){
        this.$toast.fail('请再次输入新密码')
        return
      }
      if(this.edit.newPassWord!=this.secondPassWord){
        this.$toast.fail('请再次输入新密码')
        return
      }
       this.$axios
        .get(this.$store.state.url+'/customer/updatePassword?upPassWord='+ this.edit.upPassWord+'&newPassWord='+ this.edit.newPassWord+'&id='+this.edit.id)
        .then(res => {
          if (res.data.code == 1) {
            this.$toast.success('修改成功');
            this.$router.push({
            path:'/'
            })
          } else {
            this.$toast.fail(res.data.msg);
          }
        });
    },
    back(){
      this.$router.push({
       path:'/center'
      })
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.newpassword{
  text-align: center
}
.van-button--large {
  margin-top: 20px;
  width: 90%;
  height: 40px;
  line-height: 40px;
}
.van-button--primary {
  color: #fff;
  background-color: #00BCD4;
  border: 1px solid #03A9F4;
}
</style>
