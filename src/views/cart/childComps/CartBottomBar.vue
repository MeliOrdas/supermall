<template>
  <div class="bottom-cart-bar">
    <div class="check-content">
      <check-button :active-color="isSelectAll" class="check-buttom" @click.native="checkClick" />
      <span>全选</span>
    </div>
    <div class="collectPrice">合计:{{totalPrice}}</div>

    <div class="caculate" @click="calcClick">去计算({{checkLength}})</div>
  </div>
</template>


<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue';
import { mapGetters } from 'vuex';



export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice () {
      return this.cartList.filter(item => {
        return item.check;
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count;
      }, 0).toFixed(2);
    },
    checkLength () {
      return this.cartList.filter(item => item.check).length;
    },
    isSelectAll () {
      if (this.cartList.length === 0) return false;
      // return !(this.cartList.filter(item => !item.check).length);
      return !(this.cartList.find(item => !item.check));
    }
  },
  methods: {
    checkClick () {
      this.isSelectAll ? this.cartList.forEach(item => item.check = false) : this.cartList.forEach(item => item.check = true);
    },
    calcClick () {
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买商品', 2500);
      }
    }
  }
}
</script>

<style scoped>
.bottom-cart-bar {
  /* position: relative;
  display: flex;
  line-height: 40px;
  background-color: #eee;
  font-size: 12px; */
  font-size: 15px;
  position: fixed;
  right: 0;
  bottom: 45px;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  /* padding: 0 10px; */
}

.check-content {
  display: flex;
  align-items: center;
  width: 70px;
  margin-left: 10px;
}
.check-buttom {
  width: 16px;
  height: 16px;
  line-height: 16px;
  margin-right: 5px;
}

.collectPrice {
  margin-left: 15px;
  flex: 1;
}

.caculate {
  width: 80px;
  height: 50px;
  line-height: 50px;
  background-color: skyblue;
  text-align: center;
  font-size: 15px;
}
</style>