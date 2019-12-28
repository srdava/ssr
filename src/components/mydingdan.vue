<template>
  <div class="mydingdan">
    <div class="toubu">
      <van-nav-bar
        title="我的订单"
        left-text="返回"
        left-arrow
        @click-left="tocenter"
      />
    </div>

    <div style="padding: 40px 0px;"> 
      <div class="content" v-for="x in orderList" :key="x.id">
          <van-cell :title="x.orderCode" icon="orders-o" :value="x.statusName"></van-cell>
          <div class="content1" v-for="y in x.orderDetails" :key="y.skuCode">
            <van-card
              :num="y.shopNum"
              :price="y.salePrice"
              :desc="y.skuAd"
              :title="y.skuName"
              :thumb="y.images[0]"
            />
          </div>
          <div class="orderamount" >
            <div class="smount">￥{{x.orderAmount}}</div>
            <div>合计:</div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderList:[],
      images:[]
    };
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData(){
      var data={
        orderUserId:sessionStorage.getItem("id")
      }
      this.$axios
      .post(this.$store.state.url+'/order/appListOrders',data)
      .then(res => {
        if (res.data.code == 1) {
          this.orderList=res.data.data
        } else {
          this.$toast.fail(res.data.msg);
        }
      });
    },
    tocenter(){
    this.$router.push({
       path:'/center'
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mydingdan{
  width: 100%;
  height: 100%;
  background: #f4f4f4
}
.toubu {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
}
.toubuimg > img {
  height: 1.4rem;
  position: absolute;
  left: 0.2rem;
  top: 0.5rem;
}
.van-card {
  padding: 5px 16px;
}
.quancontent {
  margin-top: 3rem;
  overflow: hidden;
  font-size: 0.8rem;
}
.quanimg > img {
  height: 1rem;
  float: left;
}
.dingdanhao{
    float: left;
}
.fukuan {
  color: red;
  float: right;
}
.content {
  margin-bottom: 40px;
}
.content1 {
    overflow: hidden;
    height: 100px;
    background: #f2f2f2;
}
.content1input {
  float: left;
  width: 12%;
  text-align: center;
  margin-top: 2.5rem;
}
.content1img {
  float: left;
  width: 28%;
}
.content1img > img {
  width: 5.5rem;
  height: 5.5rem;
}
.spxx {
  float: left;
  width: 60%;
}
.spjj {
  overflow: hidden;
  font-size: 0.87rem;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.djsl {
  overflow: hidden;
  margin-top: 2.6rem;
}
.dj {
  color: red;
  float: left;
}
.sl {
  float: right;
  overflow: hidden;
  right: 0;
  height: 1rem;
  width: 6rem;
}
.sl2 > input {
  width: 1.2rem;
  height: 0.8rem;
  background: #f2f2f2;
  float: left;
  margin: 0 0.2rem;
}
.sl1 > img {
  width: 1.2rem;
  height: 0.8rem;
  float: left;
  margin: 0 0.2rem;
}
.sl3 > img {
  width: 1.2rem;
  height: 0.8rem;
  float: left;
  margin: 0 0.2rem;
}
.orderamount{
 height: 36px;
    line-height: 36px;
    background: white;
    border-top: 1px solid #ebedf0;
}
.smount{
    font-size: 17px;
    font-family: -webkit-pictograph;
    font-weight: 700;
    padding-right: 10px
}
.orderamount>div{
  float: right;
  font-size: 13px;
}
</style>
