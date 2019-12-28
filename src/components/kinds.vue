<template>
  <div class="kindsstyle">
    <div class="toubu">
      <van-nav-bar
        title="全部分类"
        left-text="返回"
        left-arrow
        @click-left="back"
      />
    </div>
    <!--内容-->
    <div class="content">
      <!--左边内容-->
      <div class="zuocontent">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item v-for="(x,index) in firstCateCodeList" :key="index" @click="chooseFirst(x)" :title='x.cateName' />
        </van-sidebar>
      </div>
      <!--右边内容-->
      <div class="youcontent">
        <div class="contentgroup" v-for="(x,index) in secondKinds" :key="index">
          <div class="youtoubu" >
            <div class="youtoubu1">{{x.cateName}}</div>
            <div class="youtoubu2">
              <div class="youtoubu3">全部</div>
              <div class="youtoubuimg">
                <img src="../assets/you.png" />
              </div>
            </div>
          </div>
          <div class="content">
            <div class="content1" @click="findDetail(y.skuCode)" v-for="(y,index) in x.goods" :key="index">
              <div class="shangpingimg" >
                <img :src="y.images[0]" />
              </div>
              <div class="spjs">{{y.skuName}}</div>
              <div class="spjg">
                <div class="xspjg">{{y.costPrice}}</div>
                <div class="yspjg">
                  <del>{{y.salePrice}}</del>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey:'0',
      firstCateCodeList: [],
      secondKinds:[],
    };
  },
  mounted(){
    this.getFristKinds("0","first")
    this.chooseFirst("0")
  },
  methods:{
     back(){
      this.$router.push({
       path:'/home'
      })
    },
    getFristKinds(val,flag){
     this.$axios.get(this.$store.state.url+'/cate/findCateGoryByCateCode?cateCode='+val).then(res => {
          if (res.data.code == 1) {
            if("first"==flag){
              this.firstCateCodeList=res.data.data
              this.getFristKinds(res.data.data[0].cateCode,"second")
            }else{
              this.secondKinds=res.data.data
              this.goodsList=res.data.data.goods
            }
          }else{
            this.$toast.fail(res.data.msg)
          }
      })
    },
    //点击一级分类
    chooseFirst(val){
      this.getFristKinds(val.cateCode,'second')
    },
    findDetail(skuCode){
      sessionStorage.setItem("skuCode",skuCode)
      this.$router.push({
            path:'/detail'
      })
    },
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.kindsstyle {
  height: 100%;
  width: 100%;
  background-color: #f4f4f4;
}
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
.van-nav-bar {
  height: 2.5rem;
  line-height: 2.5rem;
}
.van-sidebar-item{
  background-color: #f4f4f4
}
.content {
  font-size: 0.9rem;
}
.zuocontent {
  width: 20%;
  height: calc(100% - 5.5rem);
  position: fixed;
  overflow: auto;
  top: 2.5rem;
  left: 0;
}
.zuotext {
  padding: 1rem 0.9rem;
}
.youcontent {
  left: 20%;
  width: 80%;
  top: 3rem;
  position: fixed;
  height: calc(100% - 5.5rem);
  overflow: auto;
}
.youtoubu {
  overflow: hidden;
}
.youtoubu1 {
  float: left;
  font-size: 1rem;
}
.youtoubu2 {
  float: right;
  overflow: hidden;
}
.youtoubu3 {
  float: left;
  color: gray;
}
.youtoubuimg {
  float: left;
}
.youtoubuimg > img {
  height: 1rem;
}
.content {
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.content1 {
  padding: 2%;
  margin: 2% 1%;
  width: 44%;
  float: left;
  font-size: 0.8rem;
  float: left;
  background: white;
}
.spjs {
  height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.shangpingimg > img {
  width: 100%;
  height: 132px;
}
.spjg {
  overflow: hidden;
}
.xspjg {
  float: left;
  color: red;
}
.yspjg {
  float: right;
}
</style>
<style>
.van-nav-bar__left {
    left: 10px ! important;
}
</style>