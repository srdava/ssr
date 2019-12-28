<template>
  <div>
    <div class="toubu">
      <div class="toubuimg">
        <img src="../assets/zuo.png" />
      </div>
      <div style="font-size: 1.2rem;">确认订单</div>
    </div>

    <div class="content">
      <div class="content1" v-for="x in content1list">
        <div class="content1input">
          <input type="checkbox" checked="checked" />
        </div>
        <div class="content1img">
          <img :src="x.content1imglist" />
        </div>
        <div class="spxx" v-for="y in x.spxxlist">
          <div class="spjj">{{y.spjjlist}}</div>
          <div class="djsl" v-for="z in y.djsllist">
            <div class="dj">{{z.djlist}}</div>
            <div class="sl" v-for="a in z.sllist">
              <div class="sl1">
                <img :src="a.sl1list" />
              </div>
              <div class="sl2">
                <input type="1" />
              </div>
              <div class="sl3">
                <img :src="a.sl3list" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="jiesuan">
      <div class="heji">
        合计：
        <span>￥177.00</span>
      </div>
      <div class="quanxuan">共三件商品</div>
    </div> -->

    <div class="tijiaodingdan">提交订单</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  border-bottom: 0.1rem solid gray;
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
.content {
  margin-top: 1.5rem;
}
.content1 {
  overflow: hidden;
  border-bottom: 0.2rem solid #f2f2f2;
  height: 6rem;
  padding: 1rem 0;
  background: white;
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
.jiesuan {
  height: 2.5rem;
  line-height: 2.5rem;
  border-bottom: 0.2rem solid #f2f2f2;
  width: 100%;
  background: white;
  overflow: hidden;
  text-align: center;
  margin-bottom: 6rem;
}
.jiesuan > div {
  float: right;
}
.heji {
  width: 45%;
}
.tijiaodingdan{
  background-color: red;
  border: none;
  color: white;
  width: 100%;
  text-align: center;
  font-size: 1rem;
  padding: 0.8rem 0;
  position: fixed;
  bottom: 0;
}
</style>
