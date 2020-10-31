import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080'
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
