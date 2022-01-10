<template>
  <img id="logo" alt="Groupomania logo" src="../assets/logo.png">
  <p id="intro">Partagez et restez en contact avec vos collègues.</p>
  
  <div class="card">
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
// import '@/services/authUser'

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    switchToSignup() {
      this.mode = "signup";
    },
    async login() {
      const response = await axios.post("/api/users/login", {
          email: this.email,
          password: this.password
      });

      localStorage.setItem('token', response.data.token);
      this.$router.push("/api/users/posts");
    },
  }
};
</script>

<style>
#logo {
  width: 100%;
  border-radius: 8px;
}
#intro {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}
.form-row {
  display: flex;
  justify-content: center;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}
.form-row_input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
}
.form-row_input::placeholder {
  color: #202020;
}
.card {
  max-width: 100%;
  width: 540px;
  background: #fff;
  border-radius: 16px;
  padding:32px;
}
.card_title {
  text-align:center;
  font-weight: 800;
}
.card_sub {
  text-align: center;
  color:#666;
  font-weight: 500;
}
.button {
  background: #FD2D01;
  color: #000;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1.2rem;
  width: 50%;
  padding: .8rem;
  margin-top: 1.5rem;
  transition: .4s background-color;
  }
.card_action {
  color: #265beb;
  text-decoration: underline;
}
.card_action:hover {
  cursor:pointer;
}
.button:hover {
  cursor: pointer;
  background: #FFD7D7;
  color: #000;
}
</style>