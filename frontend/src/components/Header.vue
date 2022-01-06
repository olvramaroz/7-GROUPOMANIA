<template>
  <header>
      <nav class="navbar fixed-top nav flex-center">
        <!--logo nav -->
        <router-link to="/api/users/posts/" class="nav-link">
          <img class="homeLinkLil" src="../assets/logo.png" alt="Acceuil vers le fil dactualités de Groupomania"/>
        </router-link>

        <!-- other elements nav  -->
        <ul class="nav justify-content-center">
          <li class="nav-item" v-if="user">
            <a class="nav-link"> <!--Mes posts -->
              <router-link :to="{ name: 'user', params: { userId: user.id } }">
                <img v-bind:src="user.pp" alt="pp" class="userPageLink"/>
              </router-link>
            </a>
          </li>
          <li class="nav-item" v-if="user">
            <a class="nav-link"> <!--Mon compte : intro, btn edit profile, btn close the account -->
              <router-link to="/api/users/about">
                <p>mon compte</p>
              </router-link>
            </a>
          </li>
          <li class="nav-item" v-if="user">
            <a class="nav-link"> <!--Déconnexion -->
                <router-link to="/">
                  <p @click="deconnexion()" class="logout">Déconnexion</p>
                </router-link>
            </a>
          </li>
        </ul>
      </nav>
  </header>
  <router-view :key="$route.fullPath" />
</template>

<script>
import axios from "axios";
const CryptoJS = require("crypto-js");

export default {
  data () {
    return {
      user: null,
      token: document.cookie
        ? document.cookie
            .split("; ")
            .find((row) => row.startsWith("user-token="))
            .split("=")[1]
        : null,
      userId: document.cookie
        ? CryptoJS.AES.decrypt(
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("userId="))
              .split("=")[1],
            this.$store.state.CryptoKey
          ).toString(CryptoJS.enc.Utf8)
        : null,
    };
  },
  methods: {
    deconnexion() {
      document.cookie = "userId=";
      document.cookie = "user-token=";
      this.$router.go();
    },
    getCurrentUser() {
      const self = this;
      axios
        .post(
          "http://localhost:5000/api/users",
          { userId: self.userId },
          {
            headers: {
              Authorization: `Bearer ${self.token}`,
            },
          }
        )
        .then((response) => (self.user = response.data[0]))
        .catch(function (error) {
          if (error.response && error.response.status === 400) {
            document.cookie = "userId=";
            document.cookie = "user-token=";
            self.$router.push("/");
          }
        });
    },
  },
  mounted () {
    this.getCurrentUser();
  },
};
</script>

<style scoped>
/* navbar style */

/* .navigation {
    padding-bottom: 30px;
} */
a{
    font-weight: bold;
    color: #2c3e50;
}
a:hover {
  transition: 0.3s;
  transform: scale(1.1);
}
.homeLinkLil {
  height: 53px;
  margin-right: 20px;
}
.logout {
    height: 30px;
    width: 80px;
}
.navbar {
    border-bottom: 1px solid #dbdbdb;
    height: 55px;
}
/* .nav {
    background-color: #091f43;
} */
.router-link-exact-active {
    color: #d1515a;
}
.fixed-top {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
}
.nav-item {

}
.nav-link {
   padding: .5rem 1rem;
}
.justify-content-center {
    justify-content: center!important;
}
/* #nav_groupomania {
    width: 200px;
} */
.userPageLink {
    object-fit: cover;
    height: 40px;
    width: 40px;
    margin: 0 40px 0 0;
    border-radius: 100%;
}

</style>