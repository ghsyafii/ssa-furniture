//Login pop-up

// var myModal = document.getElementById("myModal");
// var clickLogin = document.getElementById("loginclick");
// var span = document.getElementsByClassName("closetag")[0];
// var userName = document.getElementById("uname");
// var userPass = document.getElementById("upass");

// clickLogin.addEventListener('click', function () {
//     if (myModal.style.display == "none" || myModal.style.display == '') {
//         myModal.style.display = "block";
//     } else
//         myModal.style.display = "none";
// });

span.addEventListener('click', function () {
    if (myModal.style.display == "block")
        myModal.style.display = "none";
})

//close window when click outside of form

window.addEventListener('click', function (event) {
    if (event.target == myModal) {
        myModal.style.display = "none";
    }
})

// adding info to SIGNUP

var inputFirstName = document.getElementById("inputFname");
var inputLastName = document.getElementById("inputLname");
var inputEmail = document.getElementById("inputEmail4");
var inputPassword = document.getElementById("inputPassword4");
var inputAddress = document.getElementById("inputAddress");
var countryCode = document.getElementById("inputState");
var inputPhone = document.getElementById("inputPhone");
var inputPostal = document.getElementById("inputCity");
var enterInfo = document.getElementById("info-enter");
var checkBox = document.getElementById("gridCheck");
var signUpForm = document.getElementById("signupform");
var confirmPassword = document.getElementById("confirmpassword");


addToLocalStorage = (event) => {
    if (inputEmail.value == "" || inputEmail.value == " ") {
        alert("Please fill in your email.")
        event.preventDefault();
    } else if (inputFirstName.value == "" || inputFirstName.value == " ") {
        alert("Please fill in your first name.")
        event.preventDefault();
    } else if (inputLastName.value == "" || inputLastName.value == " ") {
        alert("Please fill in your last name.")
        event.preventDefault();
    } else if (inputPassword.value == "" || inputPassword.value == " ") {
        alert("Please fill in your password.")
        event.preventDefault();
    } else if (confirmPassword.value == "" || confirmPassword.value == " " || confirmPassword.value != inputPassword.value) {
        alert("Reconfirm your password.")
        event.preventDefault();
    } else if (inputAddress.value == "" || inputAddress.value == " ") {
        alert("Please fill in your address.")
    } else if (inputPhone.value == "" || inputPhone.value == " ") {
        alert("Please fill in your contact number.")
        event.preventDefault();
    } else if (inputPostal.value == "" || inputPostal.value == " ") {
        alert("Please fill in your postal code.")
        event.preventDefault();
    } else if (countryCode.value == "" || countryCode.value == " ") {
        alert("Please indicate your country code.")
        event.preventDefault();
    } else {
        reconfirmPass();
        addInfo();
        passUsers();
        window.location.href = "contact.html";
    }
}

enterInfo.addEventListener('click', (event) => {
    event.preventDefault();
    if (checkBox.checked == false) {
        alert("Kindly check the terms and condition.");
    } else {
        addToLocalStorage();
        signUpForm.reset();
    }

});

function addInfo() {
    const addStuff = {
        firstname: inputFirstName.value,
        lastname: inputLastName.value,
        email: inputEmail.value,
        password: inputPassword.value,
        address: inputAddress.value,
        countrycode: countryCode.value,
        phone: inputPhone.value,
        postal: inputPostal.value
    }


    // infoStore.push(addStuff);
    // localStorage.setItem('listInfo', JSON.stringify(infoStore));
    var infoStore = JSON.parse(localStorage.getItem('listInfo')) || []; // a default setting
    infoStore.push(addStuff);
    localStorage.setItem('listInfo', JSON.stringify(infoStore));


}

//end of signup


//login validation with local storage
function passUsers() {
    const userLogin = {
        username: inputEmail.value,
        userpass: inputPassword.value
    }
    var users = JSON.parse(localStorage.getItem('loginInfo')) || [];
    users.push(userLogin);
    localStorage.setItem('loginInfo', JSON.stringify(users));
}

function validUser(event) {
    var tempUsers = localStorage.getItem("loginInfo");
    users = JSON.parse(tempUsers);
    var userName = document.getElementById("uname").value;
    var userPass = document.getElementById("upass").value;
    let checkValid = false;

    if (userName == "" || userPass == "") {
        alert("Kindly input your username or password.");
        event.preventDefault();
    } else {

        for (var i = 0; i < users.length; i++) {
            if (users[i].username === userName && users[i].userpass === userPass) {
                checkValid = true;
                alert("Login successful!");
                window.location.href = "contact.html";
            }
        }

        if (checkValid != true) {
            alert("Wrong username or password. Please try again!");
            // userName = '';
            // userPass = '';
        }

    }
}


reconfirmPass = (event) => {
    var checkPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (inputPassword.value.match(checkPass)) {
        console.log("okay Password.");
    } else {
        alert("Kindly refer to the password requirement.");
        event.preventDefault();
    }
}

// var resetLogin = document.querySelectorAll(".resetlogin");
// resetLogin.addEventListener('click', () =>{
//   var userName = document.getElementById("uname").value;
// var userPass = document.getElementById("upass").value;
//   userName =" ";
//   userPass =" ";
// })

function resetLogin() {
    var userName = document.getElementById("uname");
    var userPass = document.getElementById("upass");

    userName.value = "";
    userPass.value = "";
}

// passRequire = () => {
//   console.log("hello");
//   document.querySelector(".passReq").innerHTML +=
//   `<div class="my-modal-content">
//         <span class="closetag">X</span>
//         <h5>Cart is empty.</h5>
//         <label for = "not-confirmed"><button id="not-confirmed">Close</button></label>
//       </div>

//     </div>`
//     setTimeout(function() {
//       document.querySelector(".passReq").innerHTML = "";
//     }, 1500);
// }






