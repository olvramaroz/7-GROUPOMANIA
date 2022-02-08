<template>
<header>
<div id="navigation">
  <nav class="navbar flex-evenly fixed-top">
    <a class="width100">
      <router-link to="/api/posts">
        <img class="nav-logo" src="../assets/logo.png" alt="logo Groupomania"/>
      </router-link>
    </a>
    <ul class="flex-evenly width100 m-0">
      <li class="nav-item"> <!-- About -->
        <a class="nav-link">
          <router-link to="/about">
            <p class="nav-p">Mon profil</p>
          </router-link>
        </a>
      </li>
      <li class="nav-item"> <!-- logout -->
        <a class="nav-link">
          <router-link to="/api/users/login" @click="logout()" >
            <p class="nav-p">Me déconnecter</p>
          </router-link>
        </a>
      </li>
    </ul>
  </nav>
</div>
</header>
<router-view :key="$route.fullPath"/>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      user: null,
    }
  },
  methods: {
    logout(){
      localStorage.removeItem('user');
      location.href = '/api/users/login';
    }
  }
};
</script>