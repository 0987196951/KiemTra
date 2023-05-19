class User {
    constructor(username, password, email, sdt) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.sdt = sdt;
    }

}
function checkUser(username, password) {
    var user = null;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    headers.append('Accept', 'application/json');
    headers.append('Origin', 'http://localhost:8080');
    headers.append("Accept-Language", "vi-en");
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    console.log(username, password);
    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/user/checkUser", requestOptions)
        .then(response => response.text())
        .then(result => {
            user = JSON.parse(result);
            console.log(user);
            return user;
        })
        .catch(error => {
            console.log('error', error);
            return null;
        });
}

function loginUser() {
    let username = document.getElementById('username-login').value;
    let password = document.getElementById('password-login').value;
    var result = checkUser(username, password);
    if (result === null) {
        console.log('login failed');
    }
    else {
        alert('login success');
        console.log('result', result);
    }
}

function loginFailed() {

}

function loginSucess() {
    var loginForm = document.getElementById('login-form')
    loginForm.style.display = "none";
    var viewBtn = document.getElementsByClassName('view-btn');
    var addBtnBook = document.getElementsByClassName('add-book-btn');
    viewBtn.style.display = 'block';
    addBtnBook.style.display = 'block';
}

function openModal() {
    document.getElementById('addBookModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('addBookModal').style.display = 'none';
}

function closeForm() {
    var registerForm = document.getElementById("register-form");
    registerForm.style.display = "none";
}
function openForm() {
    var registerForm = document.getElementById("register-form");
    registerForm.style.display = "block";
}
function showLoginForm() {
    var loginForm = document.getElementById("login-form");
    loginForm.style.display = "block";
}

