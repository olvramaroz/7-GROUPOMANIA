<template>
  <img id="logo" alt="Groupomania logo" src="../assets/logo.png">
  <p id="intro">Partagez et restez en contact avec vos collègues.</p>
  
  <div class="card">
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
import { userNotLogged } from "@/services/authUser.js"


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
    userNotLogged.post("/api/users/signup", {
          lastname: this.lastname,
          firstname: this.firstname,
          email: this.email,
          password: this.password
        })

        .then((res) => {
          if(res.status === 201) {
              const groupomaniaUser = { token: res.data.token }
              localStorage.setItem('groupomaniaUser', JSON.stringify(groupomaniaUser));
              this.$router.push("/api/users/login")
          }
        })

        .catch((error) => { this.message = error.response.data.error; })
      }
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