<template>
    <!-- Create Post -->
    <div id="create-post" class="card">
        <div class="form ">
            <form v-on:submit.prevent>
                <img v-bind:src="user.userpicture" class="userpicture_post" alt="photo de profil utilisateur">
                <input id="message" v-model="contentPost.message" type="text" class="message_bloc" v-bind:placeholder="`Quoi de neuf ${user.firstname} ?`">
            
                <div class="justify-content-between">
                    <label for="File">Ajouter un fichier</label>
                    <input id="file" @change="uploadfile" type="file" name="file" accept=".jpg, .jpeg, .gif, .png, .webp"/>
                    <button @click="addPost()" class="btn publish">Publier</button>
                </div>
            </form>
        </div>
    </div> <!-- End Create Post -->
</template>

<style >
.form {
    background-color: rosybrown;
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

<script>
import authUser from "@/services/authUser"
import axios from 'axios'

export default {
    name: "CreatePost",
    data() {
        return {
            contentPost: {
                message: null,
                attachment: null,
            },
        };
    },
    methods : {
        uploadfile(event) {
            this.attachment = event.target.files[0];
        },
        addPost() {
            const fd = new FormData();
            fd.append("message", this.contentPost.message);
            fd.append("attachment", this.attachment);

            console.log("On a récupéré le contenu du message", fd.get("message"));

        axios
          .post("api/posts", fd, {
            headers: {
              "Content-Type": "multipart/form-data",
              headers: { Authorization: authUser() },
            },
          })
          .then(function (response) {
            console.log(response);
            document.querySelector("#message").value = null;
            self.PostsList();
          })
          .catch(function (error) {
            console.log(error);
          });
        }
    },
}

</script>