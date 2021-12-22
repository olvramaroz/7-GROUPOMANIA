// Les VIEWS représentent les différentes pages qu'on a sur le site 

<template>
  <div class="card">
    <h1 class="card_title" v-if="mode == 'login'">Se connecter</h1>
    <h1 class="card_title" v-else>Créer un compte</h1>
    <p class="card_sub" v-if="mode == 'login'"> Pas de compte ? Inscris-toi 😉 <span class="card_action" @click="switchToCreateAccount()">Créer un compte</span></p>
    <p class="card_sub" v-else>Tu as déjà créé ton profil ? 🥰 <span class="card_action" @click="switchToLogin()">Se connecter</span></p>
    <div class="form-row">
      <!-- <label for="email">Adresse email : </label> -->
      <input v-model="email" class="form-row_input" type="text" placeholder="Adresse email"/>
    </div>
    <div class="form-row" v-if="mode == 'create'">
      <input v-model="nom" class="form-row_input" type="text" placeholder="Nom"/>
      <input v-model="prenom" class="form-row_input" type="text" placeholder="Prénom"/>
    </div>
    <div class="form-row">
      <input v-model="password" class="form-row_input" type="password" placeholder="Mot de passe"/>
    </div>
    <div class="form-row">
      <button class="button" v-if="mode == 'login'">Connexion</button>
      <button @click="createAccount" class="button" v-else>Inscription</button>
    </div>
  </div>
</template>

<script>
export default {
    data: function () {
        return {
            mode: "login",
            email: "",
            password: "",
            nom: "",
            prenom: "",
        }
    },
        methods: {
        switchToCreateAccount() {
            this.mode = "create";
        },
        switchToLogin() {
            this.mode = "login";
        },
        createAccount() {
          this.$store.dispatch("createAccount",{
            email: this.email,
            password: this.password,
            nom: this.nom,
            prenom: this.prenom,
            })
            console.log(this.email, this.nom, this.prenom, this.password);
        },
    },
    computed: { // ?

    }
}

</script>


<style>
    .form-row {
    display: flex;
    justify-content: center;
    margin: 16px 0px;
    gap:16px;
    flex-wrap: wrap;
  }
  .form-row_input {
    padding:8px;
    border: none;
    border-radius: 8px;
    background:#f2f2f2;
    font-weight: 500;
    font-size: 16px;
    flex:1;
    min-width: 100px;
    color: black;
  }
  .form-row_input::placeholder {
    color:#202020;
  }

</style>