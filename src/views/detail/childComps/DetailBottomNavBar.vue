<template>
  <div class="bottom-bar">
    <div class="bottom-left-bar">
      <div>
        <!-- <img src="~../../../assets/img/detail/detail_bottom.png" class="icon server" /> -->
        <i class="icon server"></i>
        <span class="text">客服</span>
      </div>
      <div class="bottom-center">
        <!-- <img src="~assets/img/detail/detail_bottom.png" class="icon shop" /> -->
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <!-- <img src="~assets/img/detail/detail_bottom.png" class="icon select" /> -->
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bottom-right-bar">
      <div class="shoppingCar" @click="addToCart">加入购物车</div>
      <div class="shoppingBuy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottonNavBar",
  methods: {
    addToCart () {
      this.$emit('addCart');
    }
  }
}
</script>

<style scoped>
.bottom-left-bar {
  height: 49px;
  width: 50%;
  display: flex;
  font-size: 12px;
  float: left;
}
.bottom-left-bar div {
  width: 33%;
  margin-top: 2px;
  text-align: center;
}
.bottom-left-bar div i {
  margin: 0 26%;
}
.icon {
  display: block;
  background-image: url(../../../assets/img/detail/detail_bottom.png);
  background-repeat: no-repeat;
  background-size: 70%;
  height: 30px;
  width: 40px;
}
.icon.server {
  background-position: 0px -67px;
  text-align: center;
}
.icon.shop {
  background-position: 0px -125px;
}
.icon.select {
  background-position: 0px 0px;
}

.bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: #f2f2f2;
  width: 100%;
  overflow: hidden;
  bottom: 0;
}
.bottom-right-bar {
  float: right;
  display: flex;
  width: 50%;
  height: 49px;
  line-height: 49px;
  text-align: center;
  font-size: 12px;
}

.shoppingCar {
  width: 100%;
  background-color: skyblue;
}

.shoppingBuy {
  width: 100%;
  background-color: #ff5777;
  color: #fff;
}

.icon.text {
}
</style>