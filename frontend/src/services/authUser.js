export default function authUser() {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if (user && user.token) {
        return user.token;
    } else {
        return {};
    }
}