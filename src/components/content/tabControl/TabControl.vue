<template>
  <div class="tab-control">
    <div class="tabItem" v-for="(item,index) in titles" :key="index" @click="tabClick(index)">
      <span :class="{active:index===currentIndex}">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    };
  },
  methods: {
    tabClick (index) {
      this.currentIndex = index;
    }
  },
}
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  font-size: 14px;
}
.tabItem {
  flex: 1;
}

.active {
  padding: 5px;
  color: var(--color-high-text);
  border-bottom: 2px solid var(--color-high-text);
}
</style>