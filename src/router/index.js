import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/store'
import Home from '../components/Home.vue'

import SignIn from '@/components/SignIn'
import LogIn from '@/components/LogIn'
import EditJob from '@/components/EditJob'
import Report from '@/components/Report'
import Paycheck from '@/components/Paycheck'
import AddJob from '@/views/AddJob'
import Profile from '@/views/Profile'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/addjob',
    name: 'addjob',
    component: AddJob,
    meta:{
      loggedin: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta:{
      loggedin: true
    }
  },
  {
    path: '/editjob',
    name: 'editjob',
    component: EditJob,
    meta:{
      loggedin: true
    }
  },
  {
    path: '/report',
    name: 'report',
    component: Report,
    meta:{
      loggedin: true
    }
  },
  {
    path: '/paycheck',
    name: 'paycheck',
    component: Paycheck,
    meta:{
      loggedin: true
    }
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  
  if(to.meta.loggedin){

    if(store.state.email){
      next()
    }else{
      next('login')
    }
  }else{
    next()
  }
}) 

export default router