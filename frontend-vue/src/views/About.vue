<template>
  <div class="about">
    <Header />
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h1>This is my about page</h1>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    Header,
    HelloWorld
  }
}
</script>