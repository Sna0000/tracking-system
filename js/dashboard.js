const userName =
    localStorage.getItem("sctts_user");


const userNameBox =
    document.getElementById("userName");



if (userName) {

    userNameBox.textContent =
        "👤 " + userName;

} else {

    userNameBox.textContent =
        "👤 Guest";
}