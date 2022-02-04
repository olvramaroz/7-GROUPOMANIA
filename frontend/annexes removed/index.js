import { createStore } from "vuex";
const axios = require('axios');

const commonConfig = {                      
  baseURL: 'http://localhost:5000/',
}

const userNotLogged = axios.create({...commonConfig }) // quand le user n'est pas loggé, voir fonction signup
const userLogged = axios.create({...commonConfig }) // quand le user est loggé, spread la configuration

userLogged.interceptors.request.use(function(config) {        
  const token = JSON.parse(localStorage.User).token
  config.headers = { Authorization: `Bearer ${token}` }
  return config;
});

export {
  userLogged,
  userNotLogged
}

export default createStore({
  state: {
  },
  mutations: {},
  actions: {},
  modules: {},
});
