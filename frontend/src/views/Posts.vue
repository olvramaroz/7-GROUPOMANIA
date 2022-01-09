<template>
<div>
    <Header />
    <Posts />
</div>
</template>

<style></style>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Posts from "@/components/Posts.vue";

export default {
  name: "Posts",
  components: {
    Header,
    Posts,
  },
};
</script>