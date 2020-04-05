<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li>'hh'</li>
        <li>'hh'</li>
        <li>'hh'</li>
        <li>'hh'</li>
        <li>'hh'</li>
        <li>'hh'</li>
        <li>'hh'</li>
        <li>'hh'</li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from './childComps/DetailSwiper.vue';
import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
import DetailShopInfo from './childComps/DetailShopInfo.vue';
import Scroll from 'components/common/scroll/Scroll.vue';



import { getDetail, Goods, Shop } from 'network/detail.js';



export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll
  },
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {}
    };
  },
  // 生命周期函数,当组件创建完毕时执行此函数
  created () {
    // 保存传入的数据 ,iid
    this.iid = this.$route.params.iid;
    // 获取数据
    getDetail(this.iid).then(res => {
      // console.log(res);

      const data = res.data.result;
      this.topImages = data.itemInfo.topImages;
      // console.log(data);
      // console.log(this.topImages);
      // 通过类来创建需要使用的数据
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      // 获取店铺信息
      this.shop = new Shop(data.shopInfo);
      //获取商品详情数据
      this.detailInfo = data.detailInfo;
      console.log(this.detailInfo);

    });
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>