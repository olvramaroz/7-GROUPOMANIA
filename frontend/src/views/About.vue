<template>
    <div id="about-page">
      <Header />
      <About />
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

export default {
  name: "About",
  components: {
    Header,
    About,
  },
};
</script>