<template>
  <img id="logo" alt="Groupomania logo" src="../assets/logo.png">
  <p id="intro">Partagez et restez en contact avec vos collègues.</p>
  
  <div class="card">
    <h1 class="card_title">Se connecter</h1>
    <p class="card_sub"> Pas de compte ? Inscris-toi 😉 <router-link to="/api/users/signup" class="card_action" @click="switchToSignup()">Créer un compte</router-link></p>
    <div class="form-row">
      <input v-model="email" class="form-row_input" type="text" placeholder="Adresse email"/>
    </div>
    <div class="form-row">
      <input v-model="password" class="form-row_input" type="password" placeholder="Mot de passe"/>
    </div>
    <div class="form-row">
      <button @click="login" class="button">Connexion</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const CryptoJS = require("crypto-js");

export default {
    name: "login",
    data: function () {
        return {
      sameEmail: false,
      mode: "login",
      email: "",
      errorEmail: false,
      password: "",
      errorMdp: false,
      incorrect: false,
    };
    },
  methods: {
    switchToSignup() {
      this.mode = "signup";
    },
    login() {
      this.password = document.querySelector("#passwordCheck").value;
      this.email = document.querySelector("#emailCheck").value;
      const self = this;
      axios
        .post("http://localhost:5000/api/users/login", {
          email: this.email,
          password: this.password,
        })
        .then(function (response) {
          const token = response.data.token;
          const num = response.data.userId;
          const userId = CryptoJS.AES.encrypt(
            num.toString(),
            self.$store.state.CryptoKey
          ).toString();
          document.cookie = `user-token=${token}; SameSite=Lax; Secure; max-age=86400;`;
          document.cookie = `userId=${userId}; SameSite=Lax; Secure; max-age=86400;`;
          self.$router.push("/api/users/posts");
          self.$router.go();
        })
        .catch(function (error) {
          if (error) {
            self.incorrect = true;
          }
        });
    },
  },
  mounted() {
    if (document.cookie) {
      const userIdCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userId="))
        .split("=")[1];
      console.log(userIdCookie);
      if (userIdCookie) {
        this.$router.push("/");
      }
    }
  },
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
