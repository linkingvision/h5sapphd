// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import ElementUI from 'element-ui';
import App from './App'
import store from './store'
import router from './router'
import Ionic from '@ionic/vue';
import 'lib-flexible/flexible'
import $ from 'jquery'
import '@ionic/core/css/ionic.bundle.css';

Vue.use(Vuex);
Vue.use(Ionic);
// const bus = new Vue()
Vue.config.productionTip = false
Vue.prototype.$ = $;
window.jQuery=$;
window.$=$
Vue.prototype.$http = axios
const bus = new Vue()
Vue.use(ElementUI);
/* eslint-disable no-new */
// designSize:设计图尺寸(传@1x倍图尺寸,例如设计图是750px,2倍图,那么传375),rootValue:比例,默认100
function sethtml(designSize, rootValue){
  let rootV = 100;
  if (rootValue) {
      rootV = rootValue;
  }
  // 窗口宽度
  const winWidth = window.document.documentElement.clientWidth;
  // 如果窗口宽度超过1.5倍设计图了,则不再调整
  if (winWidth > 1.5 * designSize) { return; }
  // window.console.log(winWidth);
  const htmlFontSize = winWidth * rootV / designSize;
  window.document.documentElement.style.fontSize = htmlFontSize + 'px';
  } sethtml(375)
new Vue({
  el: '#app',
  router,
  store,
  data:{
    bus
  },
  components: { App },
  template: '<App/>'
})
