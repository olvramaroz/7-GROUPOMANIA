<template>
  <div class="home">
    <div class="container">
      <Header />
      <Posts />
    </div>
  </div>
</template>


<script>
import Header from "@/components/Header.vue";
import Posts from "@/components/Posts.vue";

export default {
  name: "posts",

  components: {
    Header,
    Posts
  }
};
</script>