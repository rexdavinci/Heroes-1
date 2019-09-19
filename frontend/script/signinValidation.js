const email = document.getElementById('email');
const password = document.getElementById('password');
const loginBtn = document.getElementById('login');


const emailError = document.getElementById('email_error');
const passwordError = document.getElementById('password_error');
var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var validEmail = false;
var validPassword = false;

//function to check that a valid email is entered  
function validateEmail() {
    if (email.value.length < 1) {
        emailError.style.visibility = 'visible';
        emailError.innerHTML = "<p>Enter a valid email! Email field cannot be empty</p>";
        email.classList.add('wrong-input');
        email.classList.remove('valid-input');
        validEmail = false;

    } else if (!(re.test(email.value))) {
        emailError.style.visibility = 'visible';
        emailError.innerHTML = "<p>Enter a valid email! Example yourname@domain.com </p>";
        email.classList.add('wrong-input');
        email.classList.remove('valid-input');
        validEmail = false;
    } else {
        emailError.style.visibility = 'hidden';
        email.classList.add('valid-input');
        validEmail = true;
    }
    validate()
}

function validatePassword() {
    if (password.value.length < 6) {
        passwordError.style.visibility = 'visible';
        passwordError.innerHTML = "<p> Password must be at least 6 characters</p>";
        password.classList.add('wrong-input');
        password.classList.remove('valid-input');

    } else {
        passwordError.style.visibility = 'hidden';
        password.classList.add('valid-input');
        validPassword = true;

    }
    validate()
}

function validate() {
    if (validEmail == true && validPassword == true) {
        loginBtn.removeAttribute('disabled');
    } else {
        loginBtn.setAttribute('disabled', 'disabled');
    }
}