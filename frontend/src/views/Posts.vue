<template>

    <Header />
    <Posts />
    
    <router-view />
</template>

<style></style>

<script>
// import { userNotLogged } from "@/store/index"
import Header from "@/components/Header.vue"
import Posts from "@/components/Posts.vue"

export default {
  name: "Posts",
  components: {
    Header,
    Posts
  }
};
</script>