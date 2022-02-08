import { createRouter, createWebHistory } from "vue-router";
import posts from "../views/Posts.vue";

const routes = [
  { // page du fil d'actualités http://localhost:8080/api/posts OK - afficher !!
    path: "/api/posts", 
    name: "posts",
    component: posts,
    meta: {
      title: "Publications | Groupomania",
      description: "discussion entre les membres Groupomania"
    }
  },
  {
     // page d'accueil signup, http://localhost:8080 OK ---- affichage OK !!
    path: "/", 
    name: "signup",
    component: () => import("../views/Signup.vue"),
    meta: {
      title: " Inscription | Groupomania",
      description: "Inscription Réseau social d'entreprise Groupomania"
    }
  },
  {
    // page d'accueil login, http://localhost:8080/api/users/login OK ---- affichage OK !!
   path: "/api/users/login",
   name: "login",
   component: () => import("../components/Login.vue"),
   meta: {
     title: " Connexion | Groupomania",
     description: "Connexion Réseau social d'entreprise Groupomania"
   }
 },

  // {
  //   // page des posts du user
  //   name: "userPosts",
  //   path: "/userposts/:userId", //'/user/:userId
  //   component: () => import("../components/UserPosts.vue"),
  //   meta: {
  //     title: "Profil | Groupomania",
  //     description: "page publication de l'utilisateur Groupomania"
  //   },
  // },
  {
    // page de profil,
    name: "about", 
    path: "/about", //'/settings'
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