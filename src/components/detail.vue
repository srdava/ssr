<template>
  <div>
    <div class="toubu">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="back"
      />
    </div>

    <div class="zcontent">
      <div class="sptp" v-model="someList">
        <img :src="someList.images[0]" />
      </div>
      <div class="content">
        <div class="spmz">
          <b>{{someList.skuName}}:{{someList.skuIntroduction}}</b>
        </div>
        <div class="spjs">{{someList.skuAd}}</div>
        <div class="spjg">
          <div class="spjg1">￥{{someList.salePrice}}</div>
          <div class="spjg2" style="float: right">
            <del>
              <b>￥{{someList.costPrice}}</b>
            </del>
          </div>
        </div>
      </div>
    </div>

    <div class="spxq">
      <!-- <div class="djsl">
        <div class="dj">数量</div>
        <div class="sl">
          <van-stepper v-model="shopNum" :max="someList.storeNum" />
        </div>
      </div> -->
      <div class="djsl">
        <div class="dj">作者</div>
        <div class="sl">上海仙剑文化传媒公司</div>
      </div>
      <div class="djsl">
        <div class="dj">出版社</div>
        <div class="sl">山东美术出版社</div>
      </div>
    </div>
    <div class="dibu">
      <van-goods-action>
        <!-- <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" /> -->
        <van-goods-action-icon icon="cart-o" text="购物车" @click="tocar" />
        <van-goods-action-button type="warning" text="加入购物车" @click="addcar" />
        <van-goods-action-button type="danger" text="立即购买" @click="addcar" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      someList:{
        // storeNum:'1',
        businessCode:'',
        images:[]
      },
      shopNum:'',
      skuCode:'',
      id:'',
    };
  },
  mounted(){
    this.skuCode=sessionStorage.getItem("skuCode")
    this.getData()
    // this.id=sessionStorage.getItem("id")
  },
  methods: {
    //返回页面
    back(){
      this.$router.push({
       path:'/home'
      })
    },
    getData(){
      this.$axios
      .get(this.$store.state.url+'/goods/findGoodsBySkuCode?skuCode='+this.skuCode)
      .then(res => {
        if (res.data.code == 1) {
          this.someList=res.data.data
        } else {
          this.$toast.fail(res.data.msg);
        }
      });
    },
    tosomepage(val) {
      this.$router.push({
        name: val
      });
    },
    tocar() {
      this.$router.push({
        path: "/car"
      });
    },
    addcar() {
      var data = {
        orderUserId: sessionStorage.getItem("id"),
        skuCode: this.skuCode,
        businessCode:this.someList.businessCode,
        shopNum:'1'
      };
      this.$axios.post(this.$store.state.url+'/shoppingCar/addShoppingCar',data).then(res => {
        if (res.data.code == 1) {
          this.$toast.success('添加成功');
        }else{
          this.$toast.fail(res.data.msg);
        }
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.toubu {
  height: 2.5rem;
  line-height: 2.5rem;
  background: white;
  border-bottom: 0.01rem solid #a29996;;
  text-align: center;
  position: fixed;
  top: 0;
  width: 100%;
} 

.zcontent {
  border-bottom: 2rem solid #f2f2f2;
} 
.sptp > img {
  width: 100%;
  height: 20rem;
  margin-top: 2.5rem;
} 
 .content {
  margin: 0 0.5rem;
} 
 .spmz {
  height: 2rem;
  line-height: 2rem;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
} 
 .spjs {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 0.8rem;
  height: 2rem;
  line-height: 1rem;
} 
.spjg {
  overflow: hidden;
  padding-bottom: 0.6rem;
}
.spjg1 {
  float: left;
  color: red;
  font-size: 1.5rem;
}
.spjg2 {
  float: right;
  color: gray;
  font-size: 0.8rem;
  line-height: 2rem;
} 
 .spxq {
  font-size: 0.9rem;
} 
.djsl {
  overflow: hidden;
  border-bottom: 0.2rem solid #f2f2f2;
  height: 2.5rem;
  line-height: 2.5rem;
} 
 .dj {
  float: left;
  color: gray;
  margin-left: 0.5rem;
}

.sl {
  float: right;
  text-align: right;
} 

.dibu {
  height: 2.5rem;
  position: fixed;
  border-top: 0.01rem solid #f2f2f2;
  width: 100%;
  bottom: 0;
  background: white;
  overflow: hidden;
  text-align: center;
}
</style>