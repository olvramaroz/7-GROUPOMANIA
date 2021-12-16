<template>
  <img id="logo" alt="Groupomania logo" src="./assets/logo.png">
  <p id="intro">Partagez et restez en contact avec vos collègues.</p>
  <router-view></router-view>
</template>


<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');


* {
  font-family: 'Poppins', sans-serif;
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  max-width: 100%;
}
body {
  background-color: #F0F2F5;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding:32px;
}
#logo {
  width: 100%;
  border-radius: 8px;
}
#intro {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}
.card {
  max-width: 100%;
  width: 540px;
  background: #fff;
  border-radius: 16px;
  padding:32px;
}
.card_title {
  text-align:center;
  font-weight: 800;
}
.card_sub {
  text-align: center;
  color:#666;
  font-weight: 500;
}
  .button {
    background: #FD2D01;
    color: #000;
    /* border: solid 5px #FD2D01; */
    border-radius: 8px;
    font-weight: 500;
    font-size: 1.2rem;
    width: 50%;
    padding: .8rem;
    margin-top: 1.5rem;
    transition: .4s background-color;
  }
  .card_action {
    color: #265beb;
    text-decoration: underline;
  }
  .card_action:hover {
    cursor:pointer;
  }
  .button:hover {
    cursor: pointer;
    background: #FFD7D7;
    color: #000;
  }
</style>