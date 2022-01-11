<template>
<div id="navigation">
  <nav class="navbar flex-evenly fixed-top">
    <router-link to="/api/users/posts">
      <img class="nav-logo" src="../assets/logo.png" alt="mur des publications"/>
      <!-- <br><span class="p-small">Partagez et restez en contact avec vos collègues</span> -->
    </router-link>

        <ul class="flex-evenly width100">
          <li class="nav-item"> <!-- userPosts -->
            <a class="nav-link">
              <p class="nav-p" src="" alt="Mes publications">Mes publications</p>
              <!-- <router-link 
                :to="{ name: 'groupomaniaUser', params: { userId: groupomaniaUser.id }}"
              ><img v-bind:src="groupomaniaUser.userpicture" alt="photo de profil utilisateyr" class="userPosts"/>
              </router-link> -->
            </a>
          </li>
          <li class="nav-item"> <!-- editUser -->
            <a class="nav-link">
              <router-link to="/api/users/about">
                <p class="nav-p">Mon profil</p>
              </router-link>
            </a>
          </li>
          <li class="nav-item"> <!-- logout -->
            <a class="nav-link">
              <router-link to="/api/users/login" v-on:click="logout()">
                <p class="nav-p">Me déconnecter</p>
              </router-link>
            </a>
          </li>
        </ul>
  </nav>
</div>
</template>

<script>
// import { userLogged } from "@/store/index"

export default {
    name: 'Header',
    data() {
      return {
        
      }
    },
  logout () {
    localStorage.removeItem('groupomaniaUser');
    location.href = '/';
  }
}
</script>

<style>


</style>