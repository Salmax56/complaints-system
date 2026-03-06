import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { 
      path: '/dashboard', 
      name: 'dashboard', 
      component: () => import('../views/DashboardView.vue') 
    },
    { 
      path: '/add-complaint', 
      name: 'add-complaint', 
      component: () => import('../views/AddComplaint.vue') 
    },
    { 
      path: '/users', 
      name: 'users', 
      component: () => import('../views/UsersView.vue') 
    },
    { 
      path: '/list', 
      name: 'list', 
      component: () => import('../views/ComplaintsListView.vue') 
    },
    {
  path: '/about',
  name: 'about',
  component: () => import('../views/AboutView.vue')
},

  ]
})

export default router  