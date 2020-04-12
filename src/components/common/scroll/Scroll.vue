<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';


export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: null,
    };
  },
  mounted () {
    // 1.创建srcoll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    //2.监听滚动

    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        // console.log(position);   
        this.$emit('srcoll', position);
      });
    }
    // 3.监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // console.log(this.pullUpLoad);

        this.$emit('pullingUp');
      });
    }
  },
  methods: {
    scrollTo (x = 0, y = 0, timer = 400) {
      this.scroll && this.scroll.scrollTo(x, y, timer);
    },
    finishPullUp () {
      this.scroll.finishPullUp();
    },
    refresh () {
      this.scroll && this.scroll.refresh();
    },
    getScrollY () {
      return this.scroll ? this.scroll.y : 0;
    }
  },
}
</script>

<style>
</style>