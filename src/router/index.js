import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/styles',
    name: 'Styles',
    component: () => import('../views/Styles.vue')
  },
  // {
  //   path: '/error',
  //   name: 'Error',
  //   component: () => import('../views/Error.vue')
  // },
  {
    path: '/success',
    name: 'Success',
    component: () => import('../views/Success.vue')
  },
  {  path: '/view/:activity',
    name: 'View Activities',
    component: () => import('../views/ViewActivities.vue')
  },


  {
    path: '/interest',
    name: 'Register_Interest',
    component: () => import('../views/Register_Interest.vue')
  },

  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/profile/interests',
    name: 'myInterest',
    component: () => import('../views/myInterest.vue')
  },
  {
    path: '/create-activity/:step',
    name: 'Create_Activities',
    component: () => import('../views/CreateActivities.vue')
  },


]

const router = new VueRouter({
  routes:routes,
  mode:"history",
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      // BEFORE:
      // return { selector: to.hash }

      return { el: to.hash }
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }


  }
  
})


export default router
