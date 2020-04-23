import { debounce } from 'common/utils.js';
import BackTop from 'components/content/backTop/BackTop';

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

export const backTop = {
  components: {
    BackTop
  },
  data () {
    return {
      imgShow: false
    };
  },
  methods: {
    backClick () {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  },
};