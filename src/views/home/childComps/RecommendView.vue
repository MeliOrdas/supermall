<template>
  <div id="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div class="title">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props: {
    recommends: {
      type: Array,
      default () {
        return [];
      }
    },
  },
}
</script>

<style>
#recommend {
  width: 100%;
  display: flex;
  text-align: center;
}
.recommend-item {
  padding: 22px 0 20px;
  flex: 1;
  font-size: 12px;
  border-bottom: 10px solid #eee;
}

.recommend-item img {
  width: 63px;
  height: 63px;
}

.recommend-item .title {
  padding-top: 5px;
}
</style>