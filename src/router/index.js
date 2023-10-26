import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/pessoas',
    name: 'pessoas',
    component: () => import( '../views/Pessoas.vue')
  },
  {
    path: '/portaria',
    name: 'portaria',
    component: () => import( '../views/Portaria.vue')
  },
  {
    path: '/registro',
    name: 'registro',
    component: () => import( '../views/Registro.vue')

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
