<template>
<header id="navigation">
  <nav class="navbar flex-evenly fixed-top">
    <div>
      <router-link to="/home" class="">
        <img class="nav-logo" src="../assets/logo.png" alt="logo Groupomania"/>
      </router-link>
    </div>
    <div>
      <router-link to="/compte">
        <img src="../assets/images/profile.png" alt="Image de profile" height="40" class="my-0"/>
      </router-link>
    </div>
    <div>
      <router-link to="/connexion" @click="logout()" class="nav-link">
        <img src="../assets/images/logout.png" alt="Image de profile" height="40" class="my-0"/>
      </router-link>
    </div>
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
        willClose: () => { window.location.href = "http://localhost:8085/connexion";}
    });
    }
  }
};
</script>