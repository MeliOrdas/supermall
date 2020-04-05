<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <tab-control
      ref="tabControl1"
      :titles="['流行','新款','精选']"
      @tabClick="homeTabClick"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @srcoll="contentSrcoll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- @pullingUp="loadMore" -->
      <home-swiper :banners="banners" @swiperImgeLoad="swiperImge"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control ref="tabControl2" :titles="['流行','新款','精选']" @tabClick="homeTabClick"></tab-control>
      <goods-list :goods="returnControl"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="imgShow" />
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
import { debounce } from 'common/utils';

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
      imgShow: false,
      tabOffsetTop: 0,
      isTabFixed: false
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
  },
  // 防止多次数据请求的内存泄漏
  mounted () {
    this.debounceSwitch(debounce, this.$refs.scroll.refresh);
  },
  destroyed () {
    console.log('123456');

  },

  /**
   * 组件方法
   */

  methods: {
    /**
     * 生命周期使用封装
     */
    debounceSwitch (debounce, RefreshTree) {
      const refresh = debounce(RefreshTree);
      this.$bus.$on('itemImgLoad', () => {
        refresh();
        // this.$refs.scroll && this.$refs.scroll.refresh();
      });
    },

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
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    backClick () { this.$refs.scroll.scrollTo(); },
    contentSrcoll (position) {
      // console.log(position);
      this.imgShow = (-position.y) > 1000;
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },
    loadMore () {
      this.MgetHomeGoods(this.currentType);
      // console.log(2);
    },
    swiperImge () {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;

    },


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

        this.$refs.scroll.finishPullUp();
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
  position: relative;
  z-index: 9;
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