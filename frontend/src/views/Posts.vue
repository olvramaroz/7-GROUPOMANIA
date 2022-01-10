<template>

    <Header />
    <CreatePost />
    <PostsList />
    
    <router-view />
</template>

<style></style>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue"
import CreatePost from "@/components/CreatePost.vue"
import PostsList from "@/components/PostsList.vue"

export default {
  name: "Posts",
  components: {
    Header,
    CreatePost,
    PostsList
  }
};
</script>