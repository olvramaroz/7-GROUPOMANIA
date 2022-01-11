import axios from 'axios'

const commonConfig = {                      
    baseURL: 'http://localhost:5000/',
}

const userNotLogged = axios.create({...commonConfig }) 
const userLogged = axios.create({...commonConfig }) 

userLogged.interceptors.request.use(function(config) {        
    const token = JSON.parse(localStorage.user).token
    config.headers = { Authorization: `Bearer ${token}` }
    return config;
});

export {
    userLogged,
    userNotLogged
}