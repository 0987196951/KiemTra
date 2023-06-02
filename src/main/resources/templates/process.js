class User {
    constructor(username, password, email, sdt) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.sdt = sdt;
    }

}
var listBookGlb
async function signUp(username, password, email, sdt) {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("sdt", sdt);
    const requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    }
    const response = await fetch("http://localhost:8080/user/addUser", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            return result
        })
        .catch(error => {
            console.log('error', error);
            return null;
        });
    return response;
}

async function signUpUser(event) {
    event.preventDefault();
    let username = document.getElementById('username-sign-up').value;
    let password = document.getElementById('password-sign-up').value;
    let email = document.getElementById('email-sign-up').value;
    let sdt = document.getElementById('sdt-sign-up').value;
    response = await signUp(username, password, email, sdt);
    if (response === "Success") {
        alert('sign up success');
        closeForm();
    }
    else if (response === "User is existed") {
        alert('User is existed');
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
            var user = JSON.parse(result);
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
    var loginForm = document.getElementById('login-form');
    loginForm.style.display = "none";
    var viewBtn = document.getElementsByClassName("view-btn");
    var addBtnBook = document.getElementById("add-book-btn");
    var deleteBtnBook = document.getElementsByClassName("delete-btn");
    var loginBtn = document.getElementById("login-btn");
    var signUpBtn = document.getElementById("sign-up-btn");
    loginBtn.style.display = "none";
    signUpBtn.style.display = "none";
    for (let x = 0; x < viewBtn.length; x++) {
        viewBtn[x].style.display = 'block';
    }
    addBtnBook.style.display = 'block';
    for (let i = 0; i < viewBtn.length; i++) {
        deleteBtnBook[i].style.display = 'block';
    }
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

async function displayBooks() {
    const table = document.querySelector(".book-table");
    table.innerHTML = "";
    var listBook = await getBook();
    listBookGlb = listBook
    console.log(listBook)
    for (const i in listBook) {
        const row = document.createElement("tr");

        // Add the book's title to the row
        const titleCell = document.createElement("td");
        titleCell.textContent = listBook[i].tieuDe;
        row.appendChild(titleCell);

        // Add the book's author to the row
        const authorCell = document.createElement("td");
        authorCell.textContent = listBook[i].tacGia;
        row.appendChild(authorCell);

        // Add the book's genre to the row
        const genreCell = document.createElement("td");
        genreCell.textContent = listBook[i].theLoai;
        row.appendChild(genreCell);

        // Add the book's release date to the row
        const releaseDateCell = document.createElement("td");
        releaseDateCell.textContent = listBook[i].ngayPhatHanh;
        row.appendChild(releaseDateCell);

        // Add the book's number of pages to the row
        const numberOfPagesCell = document.createElement("td");
        numberOfPagesCell.textContent = listBook[i].soTrang;
        row.appendChild(numberOfPagesCell);

        const control = document.createElement("td");
        control.innerHTML = `<button class="view-btn" id='${listBook[i].id}' onclick="viewBook(${i})" style="display: none;">View</button>
        <button class="delete-btn" id='${listBook[i].id}' style="display: none;" onclick="submitDeleteBookByPost(event, id)">Delete</button>`
        row.appendChild(control);

        // Add the row to the table
        table.appendChild(row);
    }
}

async function postAddBook(title, author, genre, moTa, releaseDate, numberPage, image) {
    const formdata = new FormData();
    formdata.append("tieuDe", title);
    formdata.append("tacGia", author);
    formdata.append("theLoai", genre);
    formdata.append("moTa", moTa);
    formdata.append("ngayPhatHanh", releaseDate);
    formdata.append("soTrang", numberPage)
    formdata.append("image", image);
    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    const response = await fetch("http://localhost:8080/upLoadBook/addBook", requestOptions)
        .then(response => response.text())
        .then(result => {
            var book = JSON.parse(result);
            return book;
        })
        .catch(error => {
            console.log('error', error);
            return null;
        });
    return response;
}

async function postDeleteBook(id) {
    const formdata = new FormData();
    formdata.append("id", id);
    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    const response = await fetch("http://localhost:8080/deleteBook", requestOptions)
        .then(response => response.text())
        .then(result => result)
        .catch(error => {
            console.log('error', error);
            return null;
        });
    return response;
}

async function submitAddBookByPost(event) {
    event.preventDefault();
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let genre = document.getElementById('genre').value;
    let desciption = document.getElementById('description').value;
    let releaseDate = document.getElementById('releaseDate').value;
    let numberPage = document.getElementById('numberPage').value;
    let image = document.getElementById('image').files[0];
    var response = await postAddBook(title, author, genre, desciption, releaseDate, numberPage, image);
    if (response != null) {
        alert('add book success');
        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('genre').value = "";
        desciption = document.getElementById('description').value = "";
        releaseDate = document.getElementById('releaseDate').value = "";
        document.getElementById('numberPage').value = "";
        document.getElementById('image').value = null;
        closeModal();
    }
    else {
        alert('add failed');
    }
}

async function submitDeleteBookByPost(event, id) {
    event.preventDefault();
    const response = await postDeleteBook(id);
    if (response == 'true') {
        alert("delete book success");
        await displayBooks();
        var viewBtn = document.getElementsByClassName("view-btn");
        var deleteBtnBook = document.getElementsByClassName("delete-btn");
        for (let x = 0; x < viewBtn.length; x++) {
            viewBtn[x].style.display = 'block';
        }
        for (let i = 0; i < viewBtn.length; i++) {
            deleteBtnBook[i].style.display = 'block';
        }
    }
    else {
        alert("delete book failed");
    }
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
function displayBook(book) {
    console.log(book);
    let title = document.getElementById('title');
    let author = document.getElementById('author');
    let genre = document.getElementById('genre');
    let desciption = document.getElementById('description');
    let releaseDate = document.getElementById('releaseDate');
    let numberPage = document.getElementById('numberPage');
    let image = document.getElementById('image-upload');
    title.value = book.tieuDe;
    author.value = book.tacGia;
    genre.value = book.theLoai;
    desciption.value = book.moTa;
    releaseDate.value = book.ngayPhatHanh;
    numberPage.value = book.soTrang;
    image.style.backgroundImage = `url('/Image/${book.image}')`;
    let buttonSubmitBook = document.getElementById('submitBook');
    buttonSubmitBook.value = 'edit';
    openModal();
}

function viewBook(id) {
    console.log(id);
    displayBook(listBookGlb[id]);
}
