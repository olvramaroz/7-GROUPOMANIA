import { createRouter, createWebHistory } from "vue-router";


const routes = [
  {
     // page d'accueil signup, "localhost:8080"
    path: "/", 
    name: "Signup",
    component: () => import("../views/Signup.vue"),
    meta: {
      title: " Inscription | Groupomania",
      description: "Inscription Réseau social d'entreprise Groupomania"
    },
  },
  {
    // page d'accueil login, "localhost:8080"
   path: "/api/users/login", // test d'affichage ok
   name: "Login",
   component: () => import("../views/Login.vue"),
   meta: {
     title: " Connexion | Groupomania",
     description: "Connexion Réseau social d'entreprise Groupomania"
   },
 },
  { // page du fil d'actualités
    path: "/api/users/posts", // test d'affichage ko, remplir les tables mysql
    name: "Posts",
    component: () => import("../views/Posts.vue"),
    meta: {
      title: "Publications | Groupomania",
      description: "discussion entre les membres Groupomania"
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