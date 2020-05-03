<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">首页</div>
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


import { getHomeMultiData, getHomeGoods } from 'network/home';
import { itemListenerMixin, backTop } from 'common/mixin';

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
      tabOffsetTop: 0,
      saveY: 0,
      isTabFixed: false,
    };
  },
  mixins: [itemListenerMixin, backTop],

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
    console.log('created');

  },
  // 防止多次数据请求的内存泄漏
  activated () {
    this.$refs.scroll.scrollTo(0, this.saveY, 300);
    this.$refs.scroll.refresh();
    // console.log('点回来');

  },
  deactivated () {
    this.saveY = this.$refs.scroll.getScrollY();
    // this.$bus.$off('itemImgLoad', this.itemImgListener);
    // console.log('点进来');
    // console.log(this.saveY);
  },


  /**
   * 组件方法
   */

  methods: {
    /**
     * 生命周期使用封装
     */

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

    contentSrcoll (position) {
      // console.log(position);
      this.imgShow = (-position.y) > 1000;
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },
    // 传入首页page
    loadMore () {
      this.MgetHomeGoods(this.currentType);
      // console.log(2);
    },
    // 获取组件距离顶部的距离
    swiperImge () {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.$refs.tabControl2.$el);

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
  font-size: 12px;
}

.tab-control {
  position: relative;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  right: 0;
  left: 0;
  bottom: 49px;
}
</style>