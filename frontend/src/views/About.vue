<template>
  <div class="posts">
    <div class="container">
      <Header />
      <About />
      <Footer />
    </div>
  </div>
</template>

<style scoped>
#about-page {
  background-color: whitesmoke;
}
</style>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import About from "@/components/About.vue";
import Footer from "@/components/Footer.vue";


export default {
  name: "about",
  components: {
    Header,
    About,
    Footer
  },
};
</script>