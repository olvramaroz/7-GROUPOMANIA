<template>
<!-- Create Post -->
  <div class="card block-auto">
    <div>
      <p class="card_sub"> 👋 Quoi de neuf aujourd'hui ? </p>
      <form v-on:submit.prevent>
        <div class="form-row">
          <!-- <img v-bind:src="users.userpicture" class="userpicture_post" alt="photo de profil utilisateur"> -->
          <textarea id="description" v-model="newPost.description" type="text" class="form-row_input textarea"></textarea>
        </div>

        <div class="flex-row flex-space-between">
          <!-- <label for="file">Ajouter un fichier</label> -->
          <input id="file" name="file" @change="uploadfile" type="file" accept=".jpg, .jpeg, .gif, .png, .webp"/>
          <button @click="createPost()" class="createPost-btn">Publier 📣</button>
        </div>
      </form>
    </div>
  </div>
<!-- End Create Post -->

<!-- Show Posts -->
  <div class="card flex-center width100 m-auto">
      <div v-for="post in posts" :key="post.postId" class="card flex-center">
        <div class="bg-white posts">
          
          <!-- header du post : image profil, date de publication, suppr svg -->
          <div>
            <div class="flex-row flex-space-between align-items-center infopost">
              <div class="flex-row align-items-center">
                <!-- <router-link :to="{ name: 'user', params: { userId: post.authorId } }"> -->
                  <!-- <img class="rounded-circle userpicture" v-bind:src="post.userpicture" width="45"/> -->
                <!-- </router-link> -->

                <div class="flex-column">
                  <span class="font-weight-bold username">{{ post.firstname }} {{ post.lastname }}</span>
                  <span class="postdate">Posté le {{ formatDate(post.creation_date) }}</span>
                </div>

                <img class="deletePost" src="../../image/times-solid.svg" alt="supprimer" v-if="post.authorId == userId" @click="deletePost(post.postId, post.authorId)"/>
              </div>
            </div>
          </div>


          <!-- si la publication contient du texte et une image -->
          <div v-if="post.description != ' '">
            <span class="description">{{ post.description }}</span>
          </div>

          <div v-if="post.imageUrl" class="margin-bottom-2">
            <img v-bind:src="post.imageUrl"/>
          </div>


          <!-- INPUT LIKE ET COMMENT  -->
          <div class="react">
            <div class="like" @click="liked"> <!-- les like face à la publication  -->

              <!-- si le poste a des likes  -->
              <svg @click="like(post.postId)" v-if="likedPost.includes(post.postId)" aria-label="Je n’aime plus" class="_8-yf5 heart" color="#ed4956" fill="#ed4956" height="30" role="img" viewBox="0 0 48 48" width="24">
                <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
              </svg>

              <!-- si le post n'a pas de like  -->
              <svg @click="like(post.postId)" v-else aria-label="J’aime" class="_8-yf5 svg-react" color="#262626" fill="#262626" height="30" role="img" viewBox="0 0 48 48" width="24">
                <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
              </svg>
              <span class="nbr">{{ post.like }}</span>
            </div>

            <!-- les comments face à la publication  -->
            <div class="comment"> 
              <svg @click="showComment" aria-label="Commenter" class="_8-yf5 svg-react" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24">
                <path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path>
              </svg>
              <span class="nbr">{{ post.comment }}</span>
            </div>
          </div> 
          <!-- END INPUT LIKE ET COMMENT  -->

          <!-- SHOW LIKE ET COMMENT  -->
          <div class="disp">
            <div class="comments" v-for="comment in comments" :key="comment.idComment">
              <div class="userpicture" v-if="post.postId === comment.postId">
                <!-- <router-link :to="{ name: 'user', params: { userId: comment.authorId } }">
                  <img class="userpicture2" v-bind:src="comment.userpicture" alt="utilisateur" srcset=""/>
                </router-link> -->
              </div>
              <div v-if="post.postId === comment.postId" class="commentaire">
                <span class="commentAuthor">{{ comment.firstname }} {{ comment.lastname }}</span>
                <p class="commentText">{{ comment.comment }}</p>
                <img class="delete" src="../../image/times-solid.svg" alt="supprimer" v-if="comment.id == userId" @click=" deleteComment( comment.idComment, comment.authorId, post.postId)"/>
              </div>
            </div>
          </div>
          <div class="flex-center comment">
            <input v-on:keyup.enter="comment($event, post.postId)" @change="upload" type="text" class="form-control mt-3 mb-3" id="comment" aria-describedby="comment" placeholder="Ajoutez un commentaire ..."/>
          </div>

        </div> <!--end bloc post -->
      </div>
  </div>
<!-- End Show Posts -->

</template>

<script>
import axios from "axios";
import authHeader from "../main";
// import authHeader from "../services/authHeader";
// import Header from '@/components/Header.vue';
// import Footer from '@/components/Footer.vue';

export default {
  name: 'posts',
  data() {
    return {
      newPost: {
        description: null,
        file: null,
      },
      posts: [],
      users: null,
      likedPost: [],
      userId: JSON.parse(localStorage.user).userId,
      token: JSON.parse(localStorage.user).token,
    }
  },
  components: {
    // Header,
    // Footer
  },
  methods: {
    uploadfile(event) {
      this.file = event.target.files[0];
    },
    createPost() {
      const fd = new FormData();
      fd.append("description", this.newPost.description);
      fd.append("file", this.file);
      
      console.log("description", fd.get("description"));
      console.log("file", fd.get("file"));

      const self = this;
      axios.post("http://localhost:5000/api/posts", fd, { headers: { Authorization: authHeader() }, })
      .then(function (res) { console.log(res); self.getPost(); alert("Publication ajoutée !") })
      .catch(function (error) { console.log(error); });
    },
    getPost() {
      const self = this;
      axios.get("http://localhost:5000/api/posts", { headers: { Authorization: authHeader() },})
      .then((res) => res.json())
      .then((data) => (this.posts = data))
      .catch((error) => { if (error.res && error.res.status === 401) { self.$router.push("/"); } });
      axios.get("http://localhost:5000/api/comments", { headers: { Authorization: authHeader() }, })
        .then((res) => (this.comments = res.data))
        .catch((error) => { if (error.res && error.res.status === 401) { self.$router.push("/"); } });
    },
    formatDate(input) {
      var datePart = input.match(/\d+/g),
        year = datePart[0].substring(4),
        month = datePart[1],
        day = datePart[2];
      return day + "/" + month + "/" + year;
    },
    deletePost(postId, authorId) {
      const self = this;
      if (this.userId == authorId) {
        axios.delete(`http://localhost:5000/api/posts/${postId}`, {
          headers: { headers: { Authorization: authHeader() } },
          data: { userId: self.userId },
        })
        .then((res) => { console.log(res); self.getPost(); })
        .catch((error) => { console.log(error); });
      }
    },
    liked() {
      const self = this;
      axios.post("http://localhost:(5000/api/likes/liked", { userId: this.userId })
        .then(function (res) {
          const ObjlikedPosts = res.data;
          self.likedPost = [];
          for (const ObjlikedPost of ObjlikedPosts) {
            self.likedPost.push(ObjlikedPost.postId);
          }
        })
        .catch(function (error) { console.log(error); });
    },
    like(currentPostId) {
      const self = this;
      axios.post("http://localhost:5000/api/likes", { userId: this.userId, postId: currentPostId })
      .then(function (res) { console.log(res); self.liked(); self.getPost(); })
      .catch(function (error) { console.log(error); });
    },
    showComment(event) {
      let path;
      if (event.path[3].children[3].matches(".react")) {
        path = event.path[3].children[4];
      } else {
        path = event.path[3].children[3];
      }
      if (path.matches(".disp")) {
        path.classList.remove("disp");
      } else {
        path.classList.add("disp");
      }
    },
    deleteComment(id, authorId, currentPostId) {
      const self = this;
      if (this.userId == authorId) {
        axios.delete(`http://localhost:5000/api/comments/${id}/${currentPostId}`, { headers: { Authorization: authHeader() }, data: { userId: self.userId } })
        .then((res) => { console.log(res); self.getPost(); })
        .catch((error) => { console.log(error); });
      }
    },
    comment(event, id) {
      if (this.newComment) {
        const self = this;
        axios.post( "http://localhost:5000/api/comments", { comment: this.newComment, authorId: this.userId, postId: id }, { headers: { Authorization: authHeader() } } )
        .then((res) => {
            console.log(res);
            let pathClass, pathInput;
            if (event.path[2].children[3].matches(".react")) {
              pathClass = event.path[2].children[4];
              pathInput = event.path[2].children[5].children[0];
            } else {
              pathClass = event.path[2].children[3];
              pathInput = event.path[2].children[4].children[0];
            }
            pathClass.classList.remove("disp");
            pathInput.value = null;
            self.getPost();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    upload(event) {
      this.newComment = event.target.value;
    }
  },
  mounted() {
    this.userId = JSON.parse(localStorage.user).userId;
    this.token = JSON.parse(localStorage.user).token;
    const self = this;
    axios.post(
        "http://localhost:5000/api/users",
        { userId: self.userId },
        { headers: { Authorization: authHeader() },}
      )
      .then((response) => {
        self.user = response.data[0];
      })
      .catch(function (error) {
        if (error.response && error.response.status === 400) {
          self.$router.push("/");
        }
      });

    this.getPost();
    this.liked();
    if (!this.userId) {
      this.$router.push("/");
    }
  },
};
</script>