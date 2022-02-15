<template>
    <div>
        <div class="flex-column">
            <img id="logo" alt="Groupomania logo" src="../assets/logo.png">
            <p id="intro">Partagez et restez en contact avec vos collègues.</p>
        </div>

        <!-- signup form  -->
        <div class="card block-auto">
            <h1 class="card_title">Créer un compte</h1>
            <p class="card_sub">Tu as déjà créé ton profil ? 🥰 <router-link to="/login" class="card_action" @click="switchToLogin()">Se connecter</router-link></p>
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
    </div>
</template>

<script>
import axios from "axios"
import router from "../router"
import Swal from "sweetalert2"

export default {
  name: "Signup",
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
    signup() {
        axios.post("http://localhost:8080/api/users/signup", {
          lastname: this.lastname,
          firstname: this.firstname,
          email: this.email,
          password: this.password
        })
   
        .then(function (response) {
            var statut = response.status;
            if (statut === 201 || statut === 200) {
            Swal.fire({
                text: "Votre compte a bien été créé, veuillez vous connecter.",
                footer: "Connexion en cours...",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => { router.push("/login") }
            })
            }
        })
        .catch(function(error) {
            var erreur = error.status;
            if (erreur === 400 || erreur === 401 || erreur === 500) {
            Swal.fire({
                text: "Une erreur est survenue",
                icon: "error",
                timer: 2000,
                showConfirmButton: false,
                timerProgressBar: true,
            });
            } 
        });
    }
  }
};
</script>
