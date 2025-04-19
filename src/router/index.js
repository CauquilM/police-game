import Vue from 'vue'
import VueRouter from 'vue-router'
import StartScreenView from '../views/StartScreenView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: StartScreenView
  }
]

const router = new VueRouter({
  routes
})

export default router
