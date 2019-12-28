<template>
  <div class="home">
    <!--头部-->
    <div class="toubu">
      <van-search placeholder="请输入搜索关键词" v-model="value" />
    </div>

    <div class="toubuimg">
        <slider ref="slider" :options="options">
          <slideritem class="toububanner" v-for="(item,index) in someList" :key="index"><img :src="item.picUrl"></slideritem>
          <div slot="loading">loading...</div>
        </slider>
    </div>

    <div class="toubutext">
      <span>
        <img class="ll_fadeIn" style="width: 96%; height: 100%;" 
        src="//img11.360buyimg.com/jdphoto/jfs/t1/31601/22/15554/14040/5cc2a86fEbdb1098b/88174b36f85283b6.png">
      </span>
    </div>

    <div class="content">
      <div class="content1"  @click="findDetail(x.skuCode)" v-for="(x,index) in tableData" :key="index">
        <div class="shangpingimg">
          <img :src="x.images[0]" />
        </div>
        <div class="spjs">{{x.skuName}}{{x.skuAd}}</div>
        <div class="spjg">
          <div class="spjg1"><span style="font-size=16px">￥</span><b>{{x.salePrice}}</b></div>
          <div class="spjg2">
            <del>￥{{x.costPrice}}</del>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { slider, slideritem } from "vue-concise-slider";
export default {
  data() {
    return {
      value:'',
      someList: [],
      options: {
        pagination: true,
        thresholdDistance: 100, 
        thresholdTime: 300,
        grabCursor: true, 
        speed: 300, 
        autoplay:'5000',
        loop:true
      },
      formInline: {
        picStatus:"1",
        pagesize:"999",
        pageNum:"1",
      },
      tableData: [],
    };
  },
  mounted(){
    this.getData()
  },
  methods:{
    getData() {
      this.formInline.pagesize=this.pagesize
      this.formInline.pageNum=this.currentPage
      this.$axios.post(this.$store.state.url+'/picture/listBanner',this.formInline).then(res => {
        if (res.data.code == 1) {
          this.someList=res.data.data
          // this.totalnum=res.data.data.total
        }else{
          //不知道写啥
        }
      })
      this.$axios.post(this.$store.state.url+'/goods/listGoods',this.formInline).then(res => {
          if (res.data.code == 1) {
            this.tableData=res.data.data.list
          }else{
            // this.$message({
            //   showClose: false,
            //   message: res.data.msg,
            //   type: 'error'
            // });
          }
        })
    },
    //查看详情
    findDetail(skuCode){
      sessionStorage.setItem("skuCode",skuCode)
      this.$router.push({
            path:'/detail'
      })
    },
  },
  components: {
    slider,
    slideritem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  width: 100%;
  /* height: 100%; */
  background-color: #f4f4f4;
}
.toubu {
    top: 0;
    position: fixed;
    width: 100%;
    z-index: 999;
}
.toubuimg{
  margin-top: 1.2rem;
}
.toububanner>img{
  height: 6rem!important;
  width: 100%!important;
  margin: 0!important;
  margin-top: 2rem !important;
}
.toubutext {
  text-align: center;
  margin: 8px 0 -5px 0;
}
.content {
  overflow: hidden;
  position: relative;
  margin: 0 1%;
  margin-bottom: 55px;
}
.content1 {
 float: left;
    width: 48%;
    height: 251px;
    font-family: -apple-system,Helvetica,sans-serif;
    position: relative;
    margin: 1% 1%;
    background-color: white;
}
.spjs {
  font-size: 15px;
  margin: 2%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.shangpingimg > img {
  width: 100%;
  height: 176px;
}
.spjg {
  overflow: hidden;
}
.spjg1 {
  float: left;
  color: #f23030;
  font-family: -apple-system;
}
.spjg2 {
  float: right;
  font-size: 0.8rem
}
</style>
