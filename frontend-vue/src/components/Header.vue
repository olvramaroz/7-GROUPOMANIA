<template>
<header id="navigation">
  <nav class="navbar flex-evenly fixed-top">

    <router-link to="/home" class="width100">
      <img class="nav-logo" src="../assets/logo.png" alt="logo Groupomania"/>
    </router-link>

    <ul class="flex-evenly width100 m-0">
      <li class="nav-item"> <!-- About -->
        <router-link to="/about" class="nav-link">
          <p class="nav-p">Mon profil</p>
        </router-link>
      </li>
      <li class="nav-item"> <!-- logout -->
        <router-link to="/login" @click="logout()" class="nav-link">
          <p class="nav-p">Me déconnecter</p>
        </router-link>
      </li>
    </ul>

  </nav>
</header>
<!-- <router-view :key="$route.fullPath"/>  -->
</template>

<script>
// import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Header",
  data() {
    return {
      
    }
  },
  methods: {
    logout(){
      localStorage.removeItem('userId');
      localStorage.clear();
      // location.href = '/login';
      Swal.fire({
        text: "Vous avez été déconnecté !",
        footer: "Déconnexion en cours...",
        icon: "success",
        timer: 2500,
        showConfirmButton: false,
        timerProgressBar: true,
        willClose: () => { location.href = '/login'}
    });
    }
  }
};
</script>