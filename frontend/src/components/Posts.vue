<template>
    <!-- Create Post -->
    <div id="create-post" class="card">
        <div class="form ">
            <form v-on:submit.prevent>
                <img v-bind:src="user.userpicture" class="userpicture_post" alt="photo de profil utilisateur">
                <input id="text" v-model="contentPost.text" type="text" class="message_bloc" v-bind:placeholder="`Quoi de neuf ${user.firstname} ?`">
            
                <div class="justify-content-between">
                    <label for="File">Ajouter un fichier</label>
                    <input id="file" @change="uploadfile" type="file" name="file" accept=".jpg, .jpeg, .gif, .png, .webp"/>
                    <button @click="addPost()" class="btn publish">Publier</button>
                </div>
            </form>
        </div>
    </div> <!-- End Create Post -->

    <!-- Get All Posts -->
    
    <!-- End Get All Posts -->

</template>

<script>
import { userLogged } from "@/services/authUser.js" 

export default {
    name: "PostsList",

    data(){
        return {
            posts: [],
            contentPost: {
                text: null,
                attachment: null,
            }          
        }
    },

    mounted() { 
        this.getAllPosts();
    },

    methods: {
        getAllPosts() {
            userLogged.get(`/posts`) 
            .then(res => { this.posts = res.data[0]; })
        },
        uploadfile(event) {
            this.attachment = event.target.files[0];
        },
        addPost() {
            const fd = new FormData();
            fd.append("text", this.contentPost.text);
            fd.append("attachment", this.file);

            console.log("On a récupéré le contenu du message", fd.get("text"));

            userLogged.post("/posts", fd)
            .then(function (response) {
                console.log(response);
                document.querySelector("#text").value = null;
                self.getAllPosts();
            })
          .catch(function (error) {
            console.log(error);
          });
        }
    }
}
</script>

<style >
#create-post {
    background-color: salmon;
}
.userpicture_post {
  height: 45px;
  width: 45px;
  margin-right: 10px;
  border-radius: 100%;
  object-fit: cover;
}
.message_bloc {
  display: block;
  padding-top: 15px;
  padding-bottom: 10px;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  color: #091f43;
}
#message {
  border-radius: 20px;
  background-color: #f0f2f5;
  color: #091f43;
}
.justify-content-between {
    display: flex;
    justify-content: space-between;
}


</style>