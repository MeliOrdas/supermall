import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import toast from './components/common/toast/index';

import store from './store/index';
import FastClick from "fastclick";
import VueLazyLoad from 'vue-lazyload';


Vue.config.productionTip = false;
// 添加时间总线
Vue.prototype.$bus = new Vue();
// 安装toast
Vue.use(toast);
//安装vue懒加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
});

FastClick.attach(document.body);

new Vue({
  router, store,
  render: h => h(App),
}).$mount('#app');


