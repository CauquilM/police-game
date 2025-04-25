import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import TrafficControlView from '../views/TrafficControlView.vue'
import InvestigationsView from '../views/InvestigationsView.vue'
import InvestigationsDetailsComponent from '../views/InvestigationsDetailsComponent.vue'
import OfficeView from '../views/OfficeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: DashboardView
  },
  {
    path: '/traffic-control',
    name: 'traffic-control',
    component: TrafficControlView
  },
  {
    path: '/investigations',
    name: 'investigations',
    component: InvestigationsView
  },
  {
    path: '/investigations-details/',
    name: 'InvestigationsDetailsComponent',
    component: InvestigationsDetailsComponent,
    props: true
  },
  {
    path: '/office',
    name: 'office',
    component: OfficeView
  },
]

const router = new VueRouter({
  routes
})

export default router
