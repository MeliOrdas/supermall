<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :active-color="isSelectAll" class="check-buttom" @click.native="checkClick" />
      <span>全选</span>
    </div>
    <div class="collectPrice">合计:{{totalPrice}}</div>

    <div class="caculate">去计算({{checkLength}})</div>
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
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
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
  background-color: skyblue;
  text-align: center;
  font-size: 12px;
}
</style>