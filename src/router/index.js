import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Hello from '../views/Hello.vue'
import Account from '../views/Account.vue'
import Login from '../views/Login.vue'
import Store from '../store'
import Charts from '../views/Charts/chart.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      hasLogin:true
    }
  },
  {
    path: '/hello',
    name: 'Hello',
    component: Hello,
    meta:{
      hasLogin:true
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta:{
      hasLogin:true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      hasLogin:false
    }
  },
  {
    path: '/Charts',
    name: 'Charts',
    component: Charts,
    meta:{
      hasLogin:true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    meta:{
      hasLogin:true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record=>record.meta.hasLogin) && Store.state.User.token == null){
    next('/Login')
  }else{
    next()
  }
})

export default router
