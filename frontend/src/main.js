import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log("voici le super utilisateur", user);
    if (user && user.token) {
        return user.token;
    } else {
        return {};
    }
}

createApp(App).use(store).use(router).mount('#app');