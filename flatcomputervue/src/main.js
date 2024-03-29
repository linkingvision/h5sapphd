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
axios.defaults.baseURL = '/apis'
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
  window.onbeforeunload = function () {
    var socket = new WebSocket("this.$store.state.callport/websocket");
    if(socket.readyState != socket.OPEN){
        alert("连接已中断!")
        return false;
     }
    　　websocket.close();
    },
  // 权限
  // document.addEventListener("deviceready", onDeviceReady, false);
  // function onDeviceReady() {
  //      console.log(888)
  //      alert('你好')
        // if (window.broadcaster) {
        //     console.log(window.broadcaster);
        //     alert('你好')
        //     console.log(888)
		    //   var listener = function( e ) {
        //         //接收到广播信息
        //         alert('你好')
        //         console.log(888)
		    //         console.log( "didShow received! userInfo: " + JSON.stringify(e)  );
		    //   }
		    //   window.broadcaster.addEventListener( "didShow", listener);
        // }else {
        //     console.log('window.broadcaster not available');
        // }        
    // }
// new Promise(function (resolve, reject) {
//     var permissions = cordova.plugins.permissions;
//     var list = [
//           permissions.CAMERA,
//           permissions.MICROPHONE,
//           permissions.RECORD_AUDIO,
//           permission.INTERNET,
//           permission.CAMERA,
//           hardware.camera,
//           hardware.camera.autofocus,
//           permission.RECORD_AUDIO,
//           permission.MODIFY_AUDIO_SETTINGS,
//           permission.ACCESS_FINE_LOCATION,
//           permission.WAKE_LOCK,
//           permission.SET_WALLPAPER,
//           permission.WRITE_EXTERNAL_STORAGE,
//           permission.READ_SMS,
//           permission.READ_PHONE_STATE,
//           permission.RECORD_VIDEO,
//           permission.ACCESS_NETWORK_STATE,
//           permission.ACCESS_WIFI_STATE,
//           permission.CAMERA,
//           permission.BLUETOOTH
//           //可以写多个权限
//         ];
//   permissions.requestPermissions(list, function(status) {
//             resolve(status)
//             }, function () {
//                 reject()
//             })
// }).then(function(status){
//     navigator.mediaDevices.getUserMedia({
//         //这里这几配置
//     }).then(function(msg){
//         //这里就可以做你想做的事了
//        alert('请求成功')
//     }).catch(function(err) {
//         /* 处理error */
//         console.log(err);
//     });
// }).catch(function () {
//     //获取权限失败！！！
//     alert('permission request fail')
// })

 // http request 拦截器
axios.interceptors.request.use(
  config => {
    // console.log('http request');
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      if(store.state.token!=null){
        console.log(store.state.token);
        return false
      }
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          // console.log('http auth');
          store.commit(types.LOGOUT)
          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.path !== 'Login' &&
            router.replace({
              path: '/Login',
              query: { redirect: router.currentRoute.path }
            })
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  }
)
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
