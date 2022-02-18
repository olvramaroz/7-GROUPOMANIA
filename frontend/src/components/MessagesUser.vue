<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8" id="allMessages">
                   
                    <div v-for="message in userMessages" :key="message.id" class="border card_post">
                        <div class="card-header bg-light d-flex align-items-center justify-content-between m-0 p-1">
                            <div class="header-post">
                                <div>
                                    <img :src="message.avatar" alt="image de profil" class="userpicture_post"/>
                                    <span class="small text-dark m-0 p-1" >
                                        Posté par {{message.userName}} 
                                    <span v-if="!message.isActive" class="small text-danger">(supprimé)</span>, 
                                        le {{message.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + message.createdAt.slice(11,16)}}
                                    </span>
                                </div>                                
                                <div>
                                    <a :href="'/message/edit/' + message.id"><img v-if="message.UserId == currentUserId || isAdmin == 'true'" src="/images/edit.png" class="delete-icon m-1 p-0" alt="Modifier le message" title="modifier le message"/></a>
                                    <a :href="'/message/drop/' + message.id"><img v-if="message.UserId == currentUserId || isAdmin == 'true'" src="/images/delete.png" class="delete-icon m-1 p-0" alt="Supprimer le message" title="Supprimer le message"/></a>
                                </div>
                            </div>
                              
                        </div>
                        <div class="card-body text-dark text-left">
                            <p class="small" v-if="message.message !== ''"> {{message.message}} </p>
                            <img class="w-100" :src="message.messageUrl" v-if="message.messageUrl !== ''">
                        </div>
                        <div class="card-footer bg-light text-dark text-left m-0">
                            <a :href="'/commentaires/' + message.id" class="h6 small">Voir les commentaires</a>
                        </div>
                    </div>
                    
                    <div v-if="noUserMessage">
                        <h4 class="text-center">🙄 Désolé, il n'y a aucune publication pour le moment</h4>
                        <h5 class="text-center">ça vous laisse le temps d'apprécier cette image 🙃</h5>
                        <img alt="Aucune publication" src="../assets/paysage.jpg" class="cover">
                        <p>Crédit : <a href="https://www.flickr.com/photos/umarhashmi/" class="credit">Umar HASHMI </a> </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import Swal from "sweetalert2"

export default {
    name: "Messages User",
    components: { 
    },
    data() {
        return {
            noUserMessage: false,
            newImage: "",
            currentUserId: "", 
            newMessage: "",
            file: null,
            userMessages: []
        }
    },
    created: function() {
        if (localStorage.getItem("refresh")===null) {
            localStorage.setItem("refresh", 0)
            location.reload()
        }
        axios.get("http://localhost:3000/api/messages/users/" + localStorage.getItem("userId") ,{ headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {
            const rep = res.data.ListeMessages
            if (rep.length === 0) { this.noUserMessage = true } else { this.noUserMessage = false }
            this.userMessages = rep
        })
        .catch((error)=>{
            const codeError = error.message.split("code ")[1]
            let messageError = ""
            switch (codeError){
                case "400": messageError = "La liste des messages n'a pas été récupérer !"; break
            }
            Swal.fire({
                title: "Une erreur est survenue",
                text: messageError || error.message,
                icon: "error",
                timer: 3500,
                showConfirmButton: false,
                timerProgressBar: true
            }) 
        })
    }
}
</script>

<style>

</style>