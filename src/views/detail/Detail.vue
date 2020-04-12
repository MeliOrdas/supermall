<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" class="detail-nav" />
    <scroll class="content" ref="scroll" @srcoll="contentScroll" :probe-type="3">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommend" />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from './childComps/DetailSwiper.vue';
import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
import DetailShopInfo from './childComps/DetailShopInfo.vue';
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue';
import DetailParamInfo from './childComps/DetailParamInfo.vue';
import DetailCommentInfo from './childComps/DetailCommentInfo.vue';

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail.js';
// import { debounce } from 'common/utils.js';
import GoodsList from 'components/content/goods/GoodsList.vue';
import { itemListenerMixin } from 'common/mixin.js';



import Scroll from 'components/common/scroll/Scroll.vue';

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList
  },
  mixins: [itemListenerMixin]
  ,
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      saveY: 0,
      themeTopYs: []
    };
  },
  // 生命周期函数,当组件创建完毕时执行此函数
  created () {
    // 保存传入的数据 ,iid
    this.iid = this.$route.params.iid;
    //2.获取详情数据数据
    getDetail(this.iid).then(res => {

      // console.log(res);
      //1.获取评论信息
      const data = res.data.result;
      //2.取出轮播图信息
      this.topImages = data.itemInfo.topImages;

      // console.log(data);
      // console.log(this.topImages);
      // 通过类来创建需要使用的数据
      // 3.创建商品的对象
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      // 4.获取店铺信息
      this.shop = new Shop(data.shopInfo);
      //5.获取商品详情数据
      this.detailInfo = data.detailInfo;
      // console.log(this.detailInfo);
      //6. 商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
      // console.log(this.paramInfo);
      // 7.评论信息
      this.commentInfo = data.rate ? data.rate : '';
      // console.log(this.commentInfo);
    });
    //3.请求推荐数据
    getRecommend().then(res => {
      const recommendList = res.data.data.list;
      this.recommend = recommendList;
      // console.log(this.recommend);

      // this.$nextTick(() => {
      // 根据最新的数据渲染 , DOM渲染完毕 ,
      // 但是图片没有渲染(不包含图片)
      // });
    });
  },
  mounted () {
  },
  updated () {

  },
  methods: {
    imageLoad () {
      this.$refs.scroll.refresh();
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      console.log(this.themeTopYs);
    },
    titleClick (index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 50, 500);

    },
    contentScroll (position) {
      console.log(position);
    }
  },
  destroyed () {

  },

}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  /* position: absolute; */
  height: 100vh;
}
.content {
  height: calc(100vh - 44px);
}
.detail-nav {
  position: relative;
  z-index: 10;
  background-color: #ffffff;
}
</style>