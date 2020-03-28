<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @srcoll="contentSrcoll"
      :pull-up-load="true"
    >
      <!-- @pullingUp="loadMore" -->
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="homeTabClick"></tab-control>
      <goods-list :goods="returnControl"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-if="imgShow" />
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from '../home/childComps/RecommendView';
import FeatureView from './childComps/FeatureView';

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList';
import Scroll from 'components/common/scroll/Scroll';
import BackTop from 'components/content/backTop/BackTop';


import { getHomeMultiData, getHomeGoods } from 'network/home';

export default {

  /**
   * 组件注册
   */
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop

  },

  /**
   * 组件数据
   */

  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      },
      currentType: 'pop',
      imgShow: false
    };
  },

  /**
   * 生命周期 创建组件时运行
   */

  created () {
    // 数据请求的封装
    this.MgetHomeMultiData();

    // 商品数据请求
    this.MgetHomeGoods('pop');
    this.MgetHomeGoods('new');
    this.MgetHomeGoods('sell');

    this.$bus.$on('itemImgLoad', () => {
      // console.log(this);
      this.$refs.scroll.refresh();
    });
  },

  /**
   * 组件方法
   */

  methods: {
    /**
     * 事件监听相关方法
     */
    homeTabClick (index) {
      console.log(index);
      if (index === 0) {
        this.currentType = 'pop';
      } else if (index === 1) {
        this.currentType = 'new';
      } else if (index === 2) {
        this.currentType = "sell";
      }    },

    backClick () { this.$refs.scroll.scrollTo(); },
    contentSrcoll (position) {
      // console.log(position);
      this.imgShow = (-position.y) > 1000;
    },
    // loadMore () {
    //   this.MgetHomeGoods(this.currentType);
    // },



    /**
     * 网络请求相关方法
     */

    // 数据请求的方法
    MgetHomeMultiData () {
      return getHomeMultiData().then(res => {
        let { data } = res;
        this.banners = data.data.banner.list;
        this.recommends = data.data.recommend.list;
        // console.log(this.banners);
      });
    },
    // 请求商品数据
    MgetHomeGoods (type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
        // console.log(this.goods[type].list);

        // this.$refs.scroll.finishPullUp();
      });
    },
    // tabClick () {
    //   console.log(this);
    // }
  },

  /**
   * 组件计算属性
   */

  computed: {
    returnControl () {
      return this.goods[this.currentType].list;
    }
  },
}
</script>

<style scoped>
#home {
  padding-top: 44px;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 3;
}

.content {
  /* height: 400px; */
  /* background-color: red; */

  overflow: hidden;
  position: absolute;
  top: 44px;
  right: 0;
  left: 0;
  bottom: 49px;
}
</style>