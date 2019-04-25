import Vue from 'vue'
import Router from 'vue-router'

import App from './App.vue'
import Home from './views/Home.vue'
import City from './views/City.vue'
import Msite from './views/Msite.vue'
import Food from './views/Food.vue'
import Search from './views/Search.vue'
import Order from './views/Order.vue'

import Test from './test/test.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: App,
      children: [
        {
          path: '',
          redirect: '/home'
        },
        {
          path: '/home',
          component: Home,
          props: true // 解耦
        },
        {
          path: '/city/:id',
          component: City,
          props: true
        },
        {
          path: '/msite',
          component: Msite,
          props: true
        },
        {
          path: '/food',
          component: Food,
          props: true
        },
        {
          path: '/search/:geohash',
          component: Search,
          props: true
        },
        {
          path: '/order',
          component: Order,
        },
        {
          path: '/test',
          component: Test
        }
      ]
    }
  ]
})
