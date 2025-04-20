import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import InvestigationsView from '../views/InvestigationsView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: DashboardView
  },
  {
    path: '/investigations',
    name: 'investigations',
    component: InvestigationsView
  }
]

const router = new VueRouter({
  routes
})

export default router
