<template>

  <router-view />
</template>

<script>

export default {
  name: 'App'
}

</script>


<style>

/* GLOBAL VIEW */

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  margin:0;
  padding: 0;
  box-sizing: border-box;
  background-color: #F0F2F5;
}
#app {
  max-width: 100%;
}
.home, .container {
  margin-top: 50px;
}
li{
    list-style: none;
}
a:link {
  text-decoration: none;
}
.router-link-active {
    color: #d1515a;
}

.block-auto {
  display: block;
  margin: auto;
}
.flex-column{
  display: flex;
  flex-direction: column;
}
.flex-center {
  display: flex;
  justify-content: center;
}
.flex-evenly {
    display: flex;
    justify-content: space-evenly;
}
.flex-space-between {
    display: flex;
    justify-content: space-between;
}

.width100 {
  width: 100%;
}
.p-small {
  font-size: 13px;
  color: #2c3e50;
}

/* HEADER NAVBAR */
#navigation {
  background-color: !important#fff;
}
.navbar{
  background-color: #fff;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  border-bottom: 1px solid #dbdbdb;
}
.nav-logo {
    width: 300px;
    padding-top: 15px;
}
.nav-item {
  border-bottom: 5px solid #FD5B39;
  /* border-width: 5px; */
  border-radius: 50% 20% / 10% 40%;
}
.nav-link {

}
.nav-p {
    font-size: 1rem;
    font-weight: 500;
    color: #2c3e50;
    padding: 0 20px;
}
.userPosts {
  object-fit: cover;
  height: 40px;
  width: 40px;
  margin: 0 40px 0 0;
  border-radius: 100%;
}

/* WELCOME FORM LOGIN */
#logo {
  margin: auto;
}
#intro {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}
.form-row {
  display: flex;
  justify-content: center;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}
.form-row_input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
}
.form-row_input::placeholder {
  color: #202020;
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
  border: none;
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