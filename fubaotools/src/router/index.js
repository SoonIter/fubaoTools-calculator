import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import math from '@/components/calculator/child-comps/Calculator-math'
import finance from '@/components/calculator/child-comps/Calculator-finance'
import science from '@/components/calculator/child-comps/Calculator-science'
import terminal from '@/components/calculator/child-comps/Calculator-terminal'


const routes = [{
  path: '/',
  name: 'simple',
  component: Home,
  children: [{
    path: 'math', // /Home/math
    name: 'math',
    component: math,
  }, {
    path: 'science',
    name: 'science',
    component: science
  }, {
    path: 'finance',
    name: 'finance',
    component: finance
  }, {
    path: 'terminal',
    name: 'terminal',
    component: terminal
  }, ]
}]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router