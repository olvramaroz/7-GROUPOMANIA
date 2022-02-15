import Vue from 'vue'
import VueRouter from 'vue-router'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// except for the welcoming page where he can signup and login,
// the user has to be logged-in with an userId, and have a valid token to access the rest of the routes
// so before each route, we need to get his userId and Token first

router.beforeEach((to, from, next) => {
  const publicPages = ["/", "/signup", "/login"]
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem("userId")
  const loggedToken = localStorage.getItem("token")
  if (authRequired && !loggedIn && !loggedToken) {
      return next("/signup")
  }
  next()
})



export default router