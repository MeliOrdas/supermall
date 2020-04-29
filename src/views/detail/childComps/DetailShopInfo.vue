<template>
  <!-- 根 -->
  <div v-if="Object.keys(shop).length !== 0" class="shop-info">
    <!-- 组件头部 -->
    <div class="shop-top">
      <img :src="shop.logo" alt />
      <span class="shop-name">{{shop.name}}</span>
    </div>
    <!-- 组件中间主体 -->
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-salse">
          <div class="salse-counter">{{(shop.sells/100000).toFixed(1)}}万</div>
          <div class="salse-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-counter">{{shop.goodsCount}}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>

      <div class="shop-middle-right">
        <table class="shop-table">
          <tr class="shop-score" v-for="(item,index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more':item.isBetter}">{{item.isBetter ? '高':'低'}}</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="shop-bottom">
      <button>进店逛逛</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props: {
    shop: {
      type: Object,
      default () {
        return {};
      }
    }
  },
}
</script>

<style scoped>
.shop-info {
  overflow: hidden;
  border-bottom: 10px solid #ededed;
}
.shop-top {
  height: 100px;
  width: 100%;
  line-height: 74px;
  display: flex;
}
.shop-top img {
  height: 50px;
  display: inline-block;
  vertical-align: middle;
  margin: 10px;
  border: 2px solid #dbd7d7;
  border-radius: 25px;
}
.shop-middle-right {
  /* width: 50%; */
  margin-left: 10%;
  text-align: center;
}
.salse-counter,
.goods-counter {
  font-size: 20px;
  color: black;
  margin-bottom: 10px;
  text-align: center;
}
.salse-text,
.goods-text {
  font-size: 12px;
  text-align: center;
}
.info-salse,
.info-goods {
  width: 100%;
  margin: auto 0;
}
.shop-middle-item {
  display: flex;
  width: 50%;
}
.info-goods {
  margin-right: 0;
  border-right: 1px solid #dbd7d7;
}
.shop-score td {
  height: 23px;
  padding-left: 10px;
}
.shop-score .score {
  color: #5ea732;
}
.shop-score .score-better {
  color: #f13e3a;
}
.shop-score .better {
  color: #5ea732;
}
.shop-score .better-more {
  color: #f13e3a;
}
.shop-table {
  font-size: 12px;
}
.shop-bottom {
  width: 100%;
  margin: 10px 0;
  text-align: center;
}
.shop-bottom button {
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border: 0;
  outline: none;
  background-color: #ededed;
  color: #000;
}
.shop-middle {
  width: 100%;
  display: flex;
}
</style>