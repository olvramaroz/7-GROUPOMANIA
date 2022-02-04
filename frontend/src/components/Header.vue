<template>
<div id="navigation">
  <nav class="navbar flex-evenly fixed-top">
    <router-link to="/api/users/posts">
      <img class="nav-logo" src="../assets/logo.png" alt="mur des publications"/>
    </router-link>

        <ul class="flex-evenly width100">
          <li class="nav-item"> <!-- userPosts -->
            <a class="nav-link">
              <router-link to="/api/posts/byAuthor/:userId">
                <p class="nav-p">Mes publications</p>
              </router-link>
            </a>
          </li>
          <li class="nav-item"> <!-- About -->
            <a class="nav-link">
              <router-link to="/api/users/getOneUser">
                <p class="nav-p">Mon profil</p>
              </router-link>
            </a>
          </li>
          <li class="nav-item"> <!-- logout -->
            <a class="nav-link">
              <router-link @click="logout()" >
                <p class="nav-p">Me déconnecter</p>
              </router-link>
            </a>
          </li>
        </ul>
  </nav>
</div>
</template>

<script>

export default {
    name: 'header',
    methods: {
      logout(){
        localStorage.removeItem('user');
        location.href = '/api/users/login';
      }
    }
}
</script>

<style></style>