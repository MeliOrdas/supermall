<template>
  <div class="cart-item">
    <!-- 导航 -->
    <nav-bar class="cart-nav">
      <div slot="center" class="centers">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list class="cart-list"></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar';
import CartList from './childComps/CartList.vue';
import CartBottomBar from './childComps/CartBottomBar.vue';


import { mapGetters } from 'vuex';


export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    /**
     * 用法1:
     *  ...mapGetters(['cartListLength', 'cartList'])
      */
    //用法2
    ...mapGetters({
      length: 'cartListLength'
    })
    // CartLength () {
    //   return this.$store.state.cartList.length;
    // }
  }
}
</script>

<style scoped>
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
  overflow: hidden;
}
.cart-item {
  height: 100%;
  width: 100%;
  font-size: 12px;
}
</style>