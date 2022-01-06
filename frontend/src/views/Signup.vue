<template>
  <img id="logo" alt="Groupomania logo" src="../assets/logo.png">
  <p id="intro">Partagez et restez en contact avec vos collègues.</p>
  
  <div class="card">
    <h1 class="card_title">Créer un compte</h1>
    <p class="card_sub">Tu as déjà créé ton profil ? 🥰 <router-link to="/" class="card_action" @click="switchToLogin()">Se connecter</router-link></p>
    <div class="form-row">
      <input v-model="lastname" class="form-row_input" type="text" placeholder="Nom"/>
      <input v-model="firstname" class="form-row_input" type="text" placeholder="Prénom"/>
    </div>
    <div class="form-row">
      <input v-model="email" class="form-row_input" type="text" placeholder="Adresse email"/>
    </div>
    <div class="form-row">
      <input v-model="password" class="form-row_input" type="password" placeholder="Mot de passe"/>
    </div>
    <div class="form-row">
      <button @click="signup" class="button">Inscription</button>
    </div>
  </div>
    <router-view />
</template>

<script>
import axios from "axios";
const CryptoJS = require("crypto-js");

export default {
    name: "signup",
    data: function () {
        return {
      sameEmail: false,
      mode: "signup",
      email: "",
      errorEmail: false,
      password: "",
      errorMdp: false,
      lastname: "",
      errorLastName: false,
      firstname: "",
      errorFirstName: false,
      incorrect: false,
    };
    },
  methods: {
    switchToLogin() {
      this.mode = "login";
    },
    validation() {
          // contrôle lastname
        function controllastname() {
        const validName = this.lastname;
        if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validName)) {
        return true;
        } else {
        let lastnameErrorMsg = document.getElementById('lastnameErrorMsg');
        lastnameErrorMsg.innerText = "Merci de vérifier le lastname, 3 caractères minimum, avec des lettres uniquement";
        }
        }

          //contrôle prélastname, test : Martin-Luther Jr. ou 陳大文 ou ñÑâê ou ации ou John D'Largy
        function controlFirstName() {
        const validFirstName = this.firstname;
        if (/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,20}$/.test(validFirstName)) {
        return true;
        } else {
        let firstnameErrorMsg = document.getElementById('firstnameErrorMsg');
        firstnameErrorMsg.innerText = "Merci de vérifier le prélastname, 3 caractères minimum";
        }
        }

          // contrôle email
        function controlEmail() {
        const validEmail = this.email;
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(validEmail)) {
        return true;
        } else {
        let emailErrorMsg = document.getElementById('emailErrorMsg');
        emailErrorMsg.innerText = "Erreur ! Email non valide";
        }
        }

          // contrôle password
          function controlPassword () {
            const validPassword = this.password;
            if (/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,32})/.test(validPassword)) {
              return true;
            } else {
              let passwordErrorMsg = document.getElementById('emailErrorMsg');
              passwordErrorMsg.innerText = "Erreur ! Mot de passe non valide => entre 8 et 32 caractères + 1 minuscule min + 1 maj min + 1 caractère spécial";
            }
          }

          if (controlFirstName() && controllastname() && controlEmail() && controlPassword()) {
            return true
          } else {
            return false
            }
    },
    signup() {
      this.lastname = document.querySelector("#lastname").value;
      this.firstname = document.querySelector("#firstname").value;
      this.password = document.querySelector("#password").value;
      this.email = document.querySelector("#email").value;
      if (this.validation()) {
        const self = this;
        axios
          .post("http://localhost:5000/api/users/signup", {
            lastname: this.lastname,
            firstname: this.firstname,
            email: this.email,
            password: this.password,
          })
          .then(function (response) {
            console.log(response);
            axios
              .post("http://localhost:5000/api/users/login", {
                email: self.email,
                password: self.password,
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
          })
          .catch(function (error) {
            console.log(error);
            self.sameEmail = true;
          });
      }
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
        this.$router.push("/api/users/signup");
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
