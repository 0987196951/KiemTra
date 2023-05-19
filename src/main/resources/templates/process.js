class User {
    constructor(username, password, email, sdt) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.sdt = sdt;
    }

}

async function checkUser(username, password) {
    console.log(username, password);
    var user
    const headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    headers.append('Accept', 'application/json');
    headers.append('Origin', 'http://localhost:8080');
    headers.append("Accept-Language", "vi-en");
    headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    const requestOptions = {
        method: 'POST',
        //headers: headers,
        body: formdata,
        redirect: 'follow'
    };

    const response = await fetch("http://localhost:8080/user/checkUser", requestOptions)
    .then(response => response.text())
    .then(result => {
        user = JSON.parse(result);
        return user;
    })  
    .catch(error => {
        console.log('error', error);
        return null;
    });
    return response;
}

async function loginUser(event) {
    event.preventDefault();
    let username = document.getElementById('username-login').value;
    let password = document.getElementById('password-login').value;
    var user = await checkUser(username, password);
    if (user != null) {
        alert('login success');
        loginSucess()
    }
    else {
        alert('login failed');
        console.log(user);
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

