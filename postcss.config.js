module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 320, //视窗宽度, 对应设计稿的宽度(750),高清屏1个点为两个像素;
      viewportHeight: 667,//视窗宽度, 对应设计稿的宽度(可以不配置)
      unitPrecision: 5,//保留替换后单位的小数 为5 例如 1.22222vm
      viewportUnit: 'vw', // 指定转换成的视窗单位 建议 "vw"
      // selectorBlackList: ['tab-bar',], // 指定不需要转化的类,, 'bottom-cart-bar'
      minPixelValue: 1, // 小于或等于 `1px` 不转换视窗单位
      mediaQuery: false //允许在媒体查询中转换为`px`
    }
  }
}