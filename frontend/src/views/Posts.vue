<template>
  <div class="posts">
    <div class="container">
      <Header />
      <Posts />
      <Footer />
    </div>
  </div>
</template>


<script>
import Header from "@/components/Header.vue";
import Posts from "@/components/Posts.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "posts",

  components: {
    Header,
    Posts,
    Footer
  }
};
</script>