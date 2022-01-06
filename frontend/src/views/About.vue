<template>
  <h1>test page about</h1>
  <Header />
  <About />
  
</template>

<style scoped>
  h1{
    color: royalblue;
  }
</style>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import About from "@/components/About.vue";

export default {
  name: "About",
  components: {
    Header,
    About,
  },
};
</script>