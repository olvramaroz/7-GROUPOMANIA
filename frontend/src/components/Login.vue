<template>
  <div class="flex-column">
    <img id="logo" alt="Groupomania logo" src="../assets/logo.png">
    <p id="intro">Partagez et restez en contact avec vos collègues.</p> 
  </div>

  <div class="card block-auto">
    <h1 class="card_title">Se connecter</h1>
    <p class="card_sub"> Pas de compte ? Inscris-toi 😉 <router-link to="/" class="card_action" @click="switchToSignup()">Créer un compte</router-link></p>
    <form v-on:submit.prevent="login">
    <div class="form-row">
      <input v-model="email" name="email" class="form-row_input" type="text" placeholder="Adresse email"/>
    </div>
    <div class="form-row">
      <input v-model="password" name="password" class="form-row_input" type="password" placeholder="Mot de passe"/>
    </div>
    <div class="form-row">
      <button type="submit" class="button">Connexion</button>
    </div>
    </form>
  </div>
  <router-view />
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    switchToSignup() {
      this.mode = "signup";
    },
    login() {
      axios.post("http://localhost:7070/api/users/login", {
          email: this.email,
          password: this.password
      })

      .then((res) => {
        if(res.status === 200) {
          const user = { token: res.data.token, userId : res.data.userId }
            localStorage.setItem('user', JSON.stringify(user));
            this.$router.push("/api/posts");
            }
        })
      .catch((error) => { this.message = error.response.data.error; })
    }
  }
}
</script>

