import Vue from 'vue'
import Router from 'vue-router'

import App from './App.vue'
import Home from './views/Home.vue'
import City from './views/City.vue'
import Msite from './views/Msite.vue'
import Test from './test.vue'

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
          component: Msite
        },
        {
          path: '/test',
          component: Test
        }
      ]
    }
  ]
})
