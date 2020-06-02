import Vue from 'vue'
// import Router from 'vue-router'
import Login from '@/components/login.vue'
import Liveview from '@/components/liveview.vue'
import Device from '@/components/sliderMenu/device.vue'
// import store from '@/store/index'
// import * as types from '@/store/types'
import { IonicVueRouter } from '@ionic/vue'

Vue.use(IonicVueRouter)

export default new IonicVueRouter({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path:'/login',
      component:Login,
    },
    {
      path:'/liveview',
      component:Liveview,
    },
    {
      path:'/Liveview',
      component:Liveview,
    },
  ]
})
