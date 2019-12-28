import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/helloWorld'
import Car from '@/components/car'
import Center from '@/components/center'
import Home from '@/components/home'
import Kinds from '@/components/kinds'
import Homepage from '@/components/layout/homepage'
import Login from '@/components/login'
import Detail from '@/components/detail'
import Dingdan from '@/components/dingdan'
import Mydingdan from '@/components/mydingdan'
import Registe from '@/components/registe'
import Shezhi from '@/components/shezhi'
import Newpassword from '@/components/newpassword'





Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/helloworld',
      name: 'helloWorld',
      component: HelloWorld
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: Homepage,
      children: [
        {
          path: '/car',
          name: 'car',
          component: Car
        },
        {
          path: '/center',
          name: 'center',
          component: Center
        },
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/kinds',
          name: 'kinds',
          component: Kinds
        },
      ]
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/dingdan',
      name: 'dingdan',
      component: Dingdan
    },
    {
      path: '/mydingdan',
      name: 'mydingdan',
      component: Mydingdan
    },
    {
      path: '/registe',
      name: 'registe',
      component: Registe
    },
    {
      path: '/shezhi',
      name: 'shezhi',
      component: Shezhi
    },
    {
      path: '/newpassword',
      name: 'newpassword',
      component: Newpassword
    },
  ]
})
