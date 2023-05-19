class User {
    constructor(username, password, email, sdt) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.sdt = sdt;
    }

}

async function checkUser(username, password) {
    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    const requestOptions = {
        method: 'POST',
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

function loginSucess() {
    const loginForm = document.getElementById('login-form')
    loginForm.style.display = "none";
    const viewBtn = document.getElementsByClassName("view-btn")[0];
    const addBtnBook = document.getElementsByClassName("add-book-btn")[0];
    const deleteBtnBook =document.getElementsByClassName("delete-btn")[0];
    const loginBtn = document.getElementById("login-btn");
    const signUpBtn = document.getElementById("sign-up-btn");
    loginBtn.style.display = "none";
    signUpBtn.style.display = "none";
    viewBtn.style.display = "block";
    deleteBtnBook.style.display = "block";
    addBtnBook.style.display = "block";
}

async function getBook() {
    var listBook
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const response = await fetch("http://localhost:8080/books", requestOptions)
    .then(response => response.text())
    .then(result => {
        listBook = JSON.parse(result);
        return listBook;
    }).catch(error => {
        console.log('error', error);
        return null;
    });
    return response;
}

async function displayBook() {
    var listBook = await getBook();
    console.log(listBook);
}

function postBook(title, author, genre, releaseDate, image) {
    const formdata = new FormData();
    formdata.append("tieuDe", title);
    formdata.append("tacGia", author);
    formdata.append("theLoai", genre);
    formdata.append("ngayPhatHanh", releaseDate);
    formdata.append("image", image);
    
}

function submitBook(event) {
    event.preventDefault();
    let title = document.getElementById('title');
    let author = document.getElementById('author');
    let genre = document.getElementById('genre');
    let releaseDate = document.getElementById('releaseDate');
    let image = document.getElementById('image');
    
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

