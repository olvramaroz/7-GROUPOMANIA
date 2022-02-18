import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: 'inscription',
    component: () => import('../views/Inscription.vue')
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: () => import('../views/Connexion.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/compte',
    name: 'compte',
    component: () => import('../views/CompteUser.vue')
  },
  {
    path: "/message/edit/:id",
    name: "MessageEdit",
    component: () => import("../components/MessageEdit")
  },
  {
    path: "/message/drop/:id",
    name: "MessageDrop",
    component: () => import("../components/MessageDrop")
  },
  {
    path: "/commentaires/:id",
    name: "Commentaires",
    component: () => import("../components/Commentaires")
  },
  {
    path: "/compte/messages",
    name: "Messages",
    component: () => import("../components/MessagesUser")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ["/", "/connexion", "/inscription"]
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem("userId")
  const loggedToken = localStorage.getItem("token")
  if (authRequired && !loggedIn && !loggedToken) {
      return next("/connexion")
  }
  next()
})
export default router