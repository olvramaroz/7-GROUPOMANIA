import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')