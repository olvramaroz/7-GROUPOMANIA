<template>
    <div>
        <Header />
    </div>
    <h1>page profile : à propos, edit profil et supprimer compte</h1>
      
    <div v-on:submit.prevent class="deleteUser">
        <button @click="deleteUser()">suprrimer mon compte</button>
    </div>
</template>

<script>
import { userLogged } from "@/services/authUser.js" 

export default {
    name: 'About',

    methods: {
    deleteUser(){
      if(window.confirm("ATTENTION : La suppression de votre compte est définitive ! Voulez-vous vraiment supprimer votre compte ?")){
        const userId = this.sessionUserId;
        userLogged.delete(`/users/${userId}`)
        .then((res) => {
          if(res.status === 200) {
            this.succesMessage = res.data.message;
            localStorage.removeItem('groupomaniaUser');
            setTimeout(function() {location.href = '/';}, 2000)
          }
        })
        .catch((error) => {
            this.errorMessage = error.response.data.error;
            setTimeout(function() {location.reload()}, 2000)
        })
      }
    }
    }
}
</script>

<style>
 h1 {
     color: red;
 }
 .deleteUser {
     background-color: violet;
 }
</style>