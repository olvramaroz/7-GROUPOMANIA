import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
}

createApp(App).use(store).use(router).mount('#app');