<template>
  <div class="shop-item">
    <!-- 按钮 -->
    <div class="item-selector">
      <check-button :activeColor="product.check" @click.native="checkClick" />
    </div>
    <!-- 图片 -->
    <div class="img-item">
      <img :src="product.image" alt="商品详情" />
    </div>
    <!-- 内容 -->
    <div class="content-item">
      <div class="item-title" style="text-overflow:ellipsis;">{{product.titile}}</div>
      <div class="item-desc">{{product.desc}}</div>
      <div class="list-count">
        <div class="item-price">¥{{product.price}}</div>
        <div class="item-count">x{{product.count}}</div>
      </div>
    </div>
  </div>

  <!-- {{product}} -->
</template>
<script>


import CheckButton from 'components/content/checkButton/CheckButton.vue';


export default {
  name: 'CartListItem',
  components: {
    CheckButton
  },
  props: {
    product: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  methods: {
    checkClick () {
      this.product.check = !this.product.check;
    }
  }
}
</script>

<style scoped>
.shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.img-item {
  padding: 5px;
}

.img-item img {
  width: 60px;
  height: 90px;
  display: block;
  border-radius: 5px;
}

.item-title {
  font-size: 15px;
  color: black;
}

.item-desc {
  font-size: 12px;
  color: #55871d;
  margin: 12px 0;
}

.content-item {
  margin: 10px 10px 0 10px;
  width: 70%;
}

.list-count {
  padding-top: 10px;
  font-size: 18px;
  overflow: hidden;
}

.item-count {
  float: right;
}

.item-price {
  float: left;
  color: chocolate;
  font-weight: 600;
}
</style>