<template>

    <Header />
    <CreatePost />
    <Posts />
    
    <router-view />
</template>

<style></style>

<script>
 
import Header from "@/components/Header.vue"
import CreatePost from "@/components/CreatePost.vue"
import Posts from "@/components/Posts.vue"

export default {
  name: "Posts",
  components: {
    Header,
    CreatePost,
    Posts
  }
};
</script>