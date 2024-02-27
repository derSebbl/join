async function checkMail() {
    let users = JSON.parse(await getItem('users'));
    let email = document.getElementById('email').value;
    let passwordBtn = document.getElementById('passwordBtn');
    let checkBtn = document.getElementById('registerBtn');
    let passwordField = document.getElementById('password');
    let passwordContainer = document.getElementById('passwordContainer');
    let mailError = document.getElementById('errorMail');
    let passwordChanged = document.getElementById('passwordChanged');

    if (users) {
        let user = users.find(user => user.email === email);

        if (user) {
            passwordContainer.style.display = 'block';
            passwordField.placeholder = 'Enter new Password';
            passwordBtn.style.display = 'block';
            checkBtn.style.display = 'none'; 
            mailError.style.display = 'none'; 
        } else {
            mailError.style.display = 'block'; 
        }
    }
};

passwordBtn.addEventListener('click', async function() {
    let email = document.getElementById('email').value;
    let newPassword = document.getElementById('password').value;
    if (newPassword) {
        await changePassword(email, newPassword);
    } 
});

async function changePassword(email, newPassword) {
    let users = JSON.parse(await getItem('users'));

    let user = users.find(user => user.email === email);

    if (user) {
        user.password = newPassword;
        await setItem('users', JSON.stringify(users));
        passwordChanged.style.display = 'block';
        setTimeout(() => {
            window.location.href = "../login/login.html";
        }, 2000);
    } 
};