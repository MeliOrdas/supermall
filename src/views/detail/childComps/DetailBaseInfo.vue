<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <!-- 标题 -->
    <div class="info-title">{{goods.title}}</div>
    <!-- 价格 -->
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <!-- 销量信息 -->
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <!-- 配送业务 -->
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img v-if="goods.services[index-1].icon" :src="goods.services[index-1].icon" alt />
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default () {
        return {};
      }
    }
  }
}
</script>

<style scoped>
.base-info {
  padding: 10px 10px 0;
  border-bottom: 8px solid rgba(196, 196, 196, 0.3);
}

.info-title {
  font-size: 18px;
}

.info-price {
  padding-top: 8px;
}

.n-price {
  font-size: 24px;
  color: var(--color-high-text);
  border: 1px solid transparent;
}

.o-price {
  margin-left: 5px;
  text-decoration: line-through;
  color: #ccc;
}

.discount {
  position: relative;
  font-size: 12px;
  padding: 2px 5px;
  top: -8px;
  width: 70px;
  background-color: var(--color-high-text);
  color: #fff;
  border-radius: 10px;
}

.info-other {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  padding: 25px 0 8px 0;
  color: #9b9898;
  border-bottom: 1px solid rgba(100, 100, 100, 0.3);
}

.info-service {
  font-size: 1px;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  padding: 20px 0 20px;
}
.info-service span {
  font-size: 13px;
}

.info-service img {
  height: 14px;
  width: 14px;
  display: inline-block;
  vertical-align: middle;
  margin-top: -3px;
}
</style>