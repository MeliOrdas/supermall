<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <!-- <li v-for="item in cartList" :key="item.a">{{item}}</li> -->
      <cart-list-item v-for="(item,index) in cartList" :product="item" :key="index" />
    </scroll>
  </div>
</template>

<script>

import Scroll from 'components/common/scroll/Scroll';
import CartListItem from './CartListItem.vue';



import { mapGetters } from 'vuex';


export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated () {
    this.$refs.scroll.refresh();
    console.log(this.cartList);

  },
}
</script>

<style scoped>
.cart-list {
  width: 100%;
  height: 100%;
  /* margin-top: 44px; */
  overflow: hidden;
}
.content {
  /* height: calc(100vh - 44px - 49px - 40px); */
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 99px;
  left: 0;
  overflow: hidden;
  width: 100%;
  background-color: #ffffff;
}
</style>