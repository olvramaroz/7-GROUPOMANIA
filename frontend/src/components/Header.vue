<template>
  <nav class="navbar nav flex-center fixed-top">
        <a class="nav-link">
            <router-link to="/api/users/posts">
                <img class="nav-logo" src="../assets/logo.png" alt="mur des publications"/>
            </router-link>
        </a>

        <ul class="nav flex-space-between">
          <li class="nav-item"> <!-- userPosts -->
            <a class="nav-link">
              <router-link :to="{ name: 'user', params: { userId: user.id } }">
                  <p class="nav-p">Mes publications</p>
                <!-- <img v-bind:src="user.userpicture" alt="photo de profil utilisateyr" class="userPosts" @click="refresh"/> -->
              </router-link>
            </a>
          </li>
          <li class="nav-item"> <!-- editUser -->
            <a class="nav-link">
              <router-link to="/api/users/about">
                <p class="nav-p">Mon compte</p>
              </router-link>
            </a>
          </li>
          <li class="nav-item"> <!-- logout -->
            <a class="nav-link">
              <router-link to="/api/users/login">
                <p class="nav-p">Me déconnecter</p>
              </router-link>
            </a>
          </li>
        </ul>
  </nav>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Header',
    data() {
      return {
        user: ''
      }
    },
  async created () {
    const response = await axios.get('user');
    this.user = response.data;
  }
}
</script>

<style>
.navbar{
  background-color: seagreen;
}
.nav{
    padding-bottom: 30px;
}
.flex-center {
    display: flex;
    justify-content: center;
}
.fixed-top {

}
.nav-link {

}
.nav-logo {
    width: 200px;
}
.nav-item {

}
.nav-p {
    font-weight: bold;
    color: #2c3e50;
}
.userPosts {
  object-fit: cover;
  height: 40px;
  width: 40px;
  margin: 0 40px 0 0;
  border-radius: 100%;
}
.router-link-active {
    color: #d1515a;
}
</style>