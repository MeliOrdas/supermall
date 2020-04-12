import { debounce } from 'common/utils.js';

export const itemListenerMixin = {
  data () {
    return {
      itemImgListener: null
    };
  },
  mounted () {
    // 防抖动函数
    const refresh = debounce(this.$refs.scroll.refresh);
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImgLoad", this.itemImgListener);
  },
  destroyed () {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
};