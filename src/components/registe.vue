<template>
  <div class="registe">
    <div class="toubu">
      <van-nav-bar 
        title="注册" 
        left-text="返回"
        left-arrow
        @click-left="back"/>
    </div>
    <div class="content">
        <van-field v-model="add.userAccout" placeholder="用户账号" />
        <van-field v-model="add.userName" placeholder="用户姓名" />
        <van-cell title="选择性别" is-link :value="sex" @click="showPopup" />
        <van-field v-model="add.phone" placeholder="手机号" />
        <van-field v-model="add.email" placeholder="邮箱" />
        <van-field v-model="add.idCard" placeholder="身份证号" />
        <van-field v-model="add.passWord" type="password" placeholder="密码" />
        <van-button type="primary" size="large"  @click="registed()">确定</van-button>

    </div>

    <van-popup v-model="show" position="bottom" :style="{ height: '20%' }">
      <van-radio-group v-model="add.userSex" @change="selSex">
        <van-cell title="女" clickable>
          <van-radio slot="right-icon" name="0" />
        </van-cell>
        <van-cell title="男" clickable>
          <van-radio slot="right-icon" name="1" />
        </van-cell>
        <van-cell title="未知" clickable>
          <van-radio slot="right-icon" name="2" />
        </van-cell>
      </van-radio-group>
    </van-popup>
  </div>
</template>

<script>
export default {
  mounted(){
    
  },
  data() {
    return {
      show: false,
      add: {
        userAccout: "",
        userName: "",
        userSex: "2",
        phone: "",
        email: "",
        idCard: "",
        passWord: "",
        frontScore: "0",
        idAdmin: "0"
      },
      sex:""
    };
  },
  methods:{
    back(){
      this.$router.push({
       path:'/'
      })
    },
    showPopup() {
      this.show = true;
    },
    selSex(val){
      this.add.userSex=val
      if("0"==val){
        this.sex="女"
      }else if("1"==val){
        this.sex="男"
      }else{
        this.sex="未知"
      }
      this.show = false
    },
    registed(){
       this.$axios
        .post(this.$store.state.url+'/customer/addCustomer', this.add)
        .then(res => {
          if (res.data.code == 1) {
            this.$toast.success('注册成功')
            this.$router.push({
            path:'/'
            })
          } else {
            this.$toast.fail(res.data.msg)
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.registe{
  height: 100%;
  background-color: #f4f4f4;
}
.toubu {
  border-bottom: 0.01rem solid #a29996;
  text-align: center;
  position: fixed;
  top: 0;
  width: 100%;
}
.content {
   top: 68px;
    position: absolute;
    width: 94%;
    margin: 0 3%;
}
.content>div{
  margin-bottom: 2%
}
.van-cell__value--alone {
    color: #969799;
    text-align: left;
}
.van-button--primary {
    color: #fff;
    background-color: #00BCD4;
    border: 1px solid #03A9F4;
}

/* .dl > input {
  margin: 2%;
  border: 0;
  font-size: 15px;
  height: 2.6rem;
  width: 96%;
  background: #f2f2f2;
  color: gray;
} */
.button1 > button {
  background-color: red;
  border: none;
  color: white;
  width: 96%;
  text-align: center;
  font-size: 1rem;
  padding: 1rem 0;
  margin: 1.5rem 2%;
}
</style>
