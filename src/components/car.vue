<template>
  <div>
    <div class="title">
      <van-nav-bar
        title="购物车"
        right-text="删除"
        right-arrow
        @click-right="detelegoods"
      />
    </div>
    <!-- 内容 -->
    <div class="bodystyle">
      <div class="goodlist" v-for="x in goodsList">
        <div class="checkboxstyle">
          <van-checkbox v-model="x.checked" @change="changecheckboxvalue(x)" checked-color="red"></van-checkbox>
          <!-- <input type="checkbox" v-model="x.checked" @change="changecheckboxvalue(x)" /> -->
        </div>
        <div class="imgstyle">
          <img :src="x.images[0]" />
        </div>
        <div class="titlestyle">
          <div class="goodname">{{x.skuName}}</div>
          <div class="changemoney">
            <div class="moneystyle">¥{{x.salePrice}}</div>
            <div class="inputstyle">
              <van-stepper v-model="x.shopNum" :max="x.storeNum" @minus="minus(x)" @plus="plus(x)"/>
            </div>
          </div>
        </div>
      </div>

      <!-- 结算 -->
      <div class="sumnumarea">
        <div class="quanxuan">
          <van-checkbox v-model="idallselect" @change="checkall(idallselect)" checked-color="red"></van-checkbox>
          全选
        </div>
        <div class="summoney">合计:<span class="moneyfont">￥{{summoney}}</span></div>
        <div class="topay" @click="topay">去结算({{sumnum}})</div>
      </div>
    </div>
  </div>
</template>

<script>
import { List } from 'vant';
export default {
  data() {
    return {
      goodsList: [], 
      summoney: 0, //总价格
      sumnum: 0, //去结算旁边的总数量
      idallselect: true //全选
    };
  },
  mounted() {
    this.getgoodsList()
  },  
  methods: {
    getgoodsList(){
      this.$axios.get(this.$store.state.url+'/shoppingCar/findGoodsFromCar?userId='+sessionStorage.getItem('id')).then(res => {
          if (res.data.code == 1) {
            for(var i = 0; i < res.data.data.length; i++){
              res.data.data[i].checked=true
            }
            this.goodsList=res.data.data
            this.countsumprice()
          }else{
            this.$toast.fail(msg)
          }
        })
    },
    
    //计算总金额
    countsumprice() {
      this.summoney = 0;
      this.sumnum = 0;
      for (var i = 0; i < this.goodsList.length; i++) {
        if (true == this.goodsList[i].checked) {
          this.summoney += this.accMul(this.goodsList[i].shopNum,this.goodsList[i].salePrice);
          this.sumnum++;
        }
      }
    },
    //点击加号
    plus(val) {
      var data = {
        orderUserId: sessionStorage.getItem("id"),
        skuCode: val.skuCode,
        businessCode:val.businessCode,
        shopNum:val.shopNum+1
      };
      this.$axios.post(this.$store.state.url+'/shoppingCar/addShoppingCar',data).then(res => {
        if (res.data.code == 1) {
          this.getgoodsList()
        }else{
          this.$toast.fail(res.data.msg);
        }
      })
      this.countsumprice();
    },
    //点击减号
    minus(val) {
      // if (val.shopNum > 0) {
      //   for (var i = 0; i < this.goodsList.length; i++) {
      //     if (val.id == this.goodsList[i].id) {
      //       this.goodsList[i].shopNum--;
      //     }
      //   }
      var data = {
        orderUserId: sessionStorage.getItem("id"),
        skuCode: val.skuCode,
        businessCode:val.businessCode,
        shopNum:val.shopNum-1
      };
      this.$axios.post(this.$store.state.url+'/shoppingCar/addShoppingCar',data).then(res => {
        if (res.data.code == 1) {
          this.getgoodsList()
        }else{
          this.$toast.fail(res.data.msg);
        }
      })
        this.countsumprice();
    },
    //点击每一行的checkbox
    changecheckboxvalue(val) {
      var all=false;
      for(var i=0;i<this.goodsList.length;i++){
        
        if(true == this.goodsList[i].checked){
          all=true;
        }
      }
      if(all==false){
      }
      this.changeisallselect();
      this.countsumprice();
    },
    //点击全选
    checkall(val) {
      // for (var i = 0; i < this.goodsList.length; i++) {
      //   if (true == val) {
      //     this.goodsList[i].checked = true;
      //   } else {
      //     this.goodsList[i].checked = false;
      //   }
      // }
      // this.countsumprice();
      var all=true;
      for(var i=0;i<this.goodsList.length;i++){
        
        if(false == this.goodsList[i].checked){
          this.idallselect =false;
          all=false
        }
      }
      if(all==true){
        this.idallselect=true
      }
    },
    
    detelegoods(){
      var list=[]
      for(var i=0;i<this.goodsList.length;i++){
        if(true==this.goodsList[i].checked){
          list.push(this.goodsList[i])
        }
      }
      if(list.length>1){
        this.$toast.fail('一次只能删除一条')
      }else{
        var param = {
          orderUserId: sessionStorage.getItem("id"),
          skuCode: list[0].skuCode,
          businessCode: list[0].businessCode,
        };
        this.$axios.post(this.$store.state.url+'/shoppingCar/deleteGoodsFromCar',param).then(res => {
          if (res.data.code == 1) {
            this.$toast.success('删除成功');
            this.getgoodsList()
          }else{
            this.$toast.fail(res.data.msg);
          }
      })
      }
    },
    changeisallselect() {
      for (var i = 0; i < this.goodsList.length; i++) {
        if (false == this.goodsList[i].checked) {
          this.idallselect = false;
        } else {
          this.idallselect = true;
        }
      }
    },
    //去结算
    topay() {
      var list=[]
      for (var i = 0; i < this.goodsList.length; i++) {
        if (true == this.goodsList[i].checked) {
          list.push({
            skuCode:this.goodsList[i].skuCode,
            shopNums:this.goodsList[i].shopNum,
            businessCode:this.goodsList[i].businessCode,
            userId: sessionStorage.getItem("id"),
          })
        } 
      }
      this.$axios.post(this.$store.state.url+'/order/addOrder',list).then(res => {
          if (res.data.code == 1) {
            this.$toast.success('成功添加订单')
            this.getgoodsList()
            sessionStorage.setItem("summoney",summoney)
          }else{
            this.$toast.fail(res.data.msg);
          }
      })
    },
    accMul(arg1, arg2) {
      var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
      try {
          m += s1.split(".")[1].length;
      }
      catch (e) {
      }
      try {
          m += s2.split(".")[1].length;
      }
      catch (e) {
      }
      return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
  }
};

</script>

<style scoped>
.title {
  height: 2.5rem;
  line-height: 2.5rem;
  background: white;
  border-bottom: 0.01rem solid gray;
  text-align: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999
}
.bodystyle {
  margin: 40px 0 90px 0;
}
.goodlist {
  font-size: 14px;
  height: 98px;
  padding: 10px 0px 10px 0;
  border-bottom: 1px solid #eee;
  background: #fff;
}

.goodlist > div {
  float: left;
}
.checkboxstyle {
  width: 12%;
  text-align: center;
  height: 100px;
  line-height: 100px;
}
.van-checkbox{
  width: 20px;
  height: 100px;
  margin: auto;
}
.imgstyle>img {
  height: 100px;
  width: 100px;
}
.goodname{
  margin: 5px 0 35px 8px;
}
.titlestyle {
  width: 60%;
  height: 80px;
  position: relative;
}
.titlestyle div:first-child {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.changemoney {
  overflow: hidden;
  width: 100%;
}
.moneystyle {
  float: left;
  color: red;
  font-size: 17px;
  margin: 8px;
}
.inputstyle {
    font-size: 22px;
    float: right;
    margin: 8px;
}
.inputstyle input {
  width: 30px;
  background: #f6f6f6;
  padding-left: 10px;
  height: 20px;
  border: 0;
}
.inputstyle span {
  margin-right: 8px;
}
.sumnumarea {
  position: fixed;
  bottom: 50px;
  overflow: hidden;
  height: 48px;
  line-height: 48px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
}
.quanxuan{
  font-size: 15px;
  overflow: hidden;
  width: 30%;
  height: 40px;
  float: left;
}
.quanxuan .van-checkbox{
    height: 40px;
    width: 20px;
    float: left;
    font-size: 15px;
    margin: 4px 5px 4px 11px;
}

.summoney {
  width: 30%;
  float: left;
  font-size: 16px;
}
.moneyfont{
  color: #ee0a24;
  font-size: 18px;
}
.topay {
  color: #fff;
  background-color: #ee0a24;
  border: 1px solid #ee0a24;
  color: #fff;
  padding: 0 30px;
  font-size: 14px;
  float: right;
} 
</style>

<style>
.van-nav-bar {
  height: 2.5rem !important;
  line-height: 2.5rem !important;
}
</style>