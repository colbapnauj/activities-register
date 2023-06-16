import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/activities',
      name: 'activities',
      component: () => import('../views/ActivitiesView.vue')
    },
    {
      path: '/activities/create',
      name: 'activities-create',
      component: () => import('../views/CreateActivityView/index.vue')
    },
    {
      path: '/activities/detail/:activityId',
      name: 'activities-detail',
      component: () => import('../views/ActivityRegisterView.vue')
    },
    {
      path: '/activity-register',
      name: 'activity-register',
      component: () => import('../views/ActivityRegisterView.vue')
    },
    {
      path: '/activity-report/table/:year/:month',
      name: 'activity-report-table',
      component: () => import('../views/ActivityReportTableByDateView.vue')
    },
    {
      path: '/activity-report/table',
      name: 'activity-report-table',
      component: () => import('../views/ActivityReportTableView.vue')
    },
    {
      path: '/me-rendi',
      name: 'me-rendi',
      component: () => import('../views/MeRendiView.vue')
    }
    // {
    //   path: '/',
    //   name: 'not-found',
    //   component: () => import('../views/404.vue')
    // }
  ]
})

export default router
