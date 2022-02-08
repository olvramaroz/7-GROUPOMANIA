// import axios from 'axios';

// const authHeader = (token) => {
//     if(token) {
//         axios.defaults.headers = {
//             Authorization: "Bearer " + token,
//         };
//     } else {
//         delete axios.defaults.headers.Authorization;
//     }

// }

// export default authHeader;
//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

/*
Methods for retrieving data from server.
In the case we access protected resources,
the HTTP request needs Authorization header.

It checks Local Storage for user item.
If there is a logged in user with accessToken (JWT),
return HTTP Authorization header.
Otherwise, return an empty object.
*/

export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      return { Authorization: 'Bearer ' + user.token };
    } else {
      return {};
    }
}