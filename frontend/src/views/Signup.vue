<template>

  <div class="flex-column">
    <img id="logo" alt="Groupomania logo" src="../assets/logo.png">
    <!-- <p id="intro">Partagez et restez en contact avec vos collègues.</p> -->
  </div>

  <div class="card block-auto">
    <h1 class="card_title">Créer un compte</h1>
    <p class="card_sub">Tu as déjà créé ton profil ? 🥰 <router-link to="/api/users/login" class="card_action" @click="switchToLogin()">Se connecter</router-link></p>
    <form v-on:submit.prevent="signup">
    <div class="form-row">
      <input id="lastname" v-model="lastname" name="lastname" class="form-row_input" type="text" placeholder="Nom"/>
      <input id="firstname" v-model="firstname" name="firstname" class="form-row_input" type="text" placeholder="Prénom"/>
    </div>
    <div class="form-row">
      <input id="email" v-model="email" name="email" class="form-row_input" type="text" placeholder="Adresse email"/>
    </div>
    <div class="form-row">
      <input id="password" v-model="password" name="password" class="form-row_input" type="password" placeholder="Mot de passe"/>
    </div>
    <div class="form-row">
      <button type="submit" class="button">Inscription</button>
    </div>
    </form>
  </div>

    <router-view />
</template>

<script>
import axios from "axios";


export default {
  name: "signup",
  data() {
    return {
        email: "",
        password: "",
        lastname: "",
        firstname: ""
    }
  },
  methods: {
    switchToLogin() {
      this.mode = "login";
    },
   validation() { // ne gère pas les false -KO
      //contrôle prénom, test : Martin-Luther Jr. ou 陳大文 ou ñÑâê ou ации ou John D'Largy
      function controlFirstName() { 
      let validFirstName = new RegExp
        if(/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validFirstName)) {
          return true;
        } else { return false }
      }

      //contrôle nom
      function controlLastName() {
      let validLastName = new RegExp
        if(/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validLastName)) {
          return true;
        } else { return false }
      }

      //contrôle email
      function controlEmail() {
      let validEmail = new RegExp
        if(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(validEmail)) {
          return true;
        } else { return false }
      }

      //contrôle mot de passe
      function controlPassword() {
      let validPassword = new RegExp
        if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.]).{8,}/.test(validPassword)) {
          return true;
        } else { return false }
      }

      return (
        controlFirstName && controlLastName && controlEmail && controlPassword
      );
    },
    signup() {
    axios.post("http://localhost:5000/api/users/signup", {
          lastname: this.lastname,
          firstname: this.firstname,
          email: this.email,
          password: this.password
        })

        .then((res) => {
          if(res.status === 201) {
              this.$router.push("http://localhost:5000/api/users/login")
              alert("Votre compte a bien été créé, veuillez vous connecter.")
          }
        })

        .catch((error) => { this.message = error.response.data.error; })
      }
  }
};
</script>
