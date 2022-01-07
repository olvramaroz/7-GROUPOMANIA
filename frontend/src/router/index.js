import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
// import store from '../store/index'

const routes = [
  {
     // page d'accueil login, "localhost:8080"
    path: "/", // test d'affichage ok
    name: "Login",
    component: Login,
    meta: {
      title: " Connexion | Groupomania",
      description: "Connexion Réseau social d'entreprise Groupomania"
    },
  },
  { // page du fil d'actualités
    path: "/api/users/posts", // test d'affichage ok, remplir les tables mysql
    name: "Posts",
    component: () => import("../views/Posts.vue"),
    meta: {
      title: "Publications | Groupomania",
      description: "discussion entre les membres Groupomania"
    },
  },
  {
    // page d'accueil switch signup
    name: "Signup", // test d'affichage ok
    path: "/api/users/signup",
    component: () => import("../views/Signup.vue"),
    meta: {
      title: "Inscription | Groupomania",
      description: "Inscription Réseau social d'entreprise Groupomania"
    },
  },
  {
    // page des posts du user
    name: "userPosts",
    path: "/api/users/:userId",
    component: () => import("../views/Users.vue"),
    meta: {
      title: "Profil | Groupomania",
      description: "page profil de l'utilisateur Groupomania"
    },
  },
  {
    // page de profil, mon compte
    name: "About", // test d'affichage ok, remplir
    path: "/api/users/about",
    component: () => import("../views/About.vue"),
    meta: {
      title: "Profil | Groupomania",
      description: "page profil de l'utilisateur Groupomania"
    },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;