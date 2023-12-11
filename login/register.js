async function register() {
    if (policyChecked()) {
        if(passwordMatch()){
            await signUser();
            resetForm();
            showToast("Erfolgreich registriert");
            setTimeout(() => {
                window.location.href = "../login/login.html";
            }, 700);
            return; 
        }else{
            showToast('Passwort stimmt nicht überein');
            return;
        }
    }
    showToast('Bitte Privacy Policy bestätigen');
    registerBtn.disabled = true;
}

function policyChecked() {
    let checkbox = document.getElementById('policyCheckbox')
    if(checkbox.checked){
        return true;
    }
    return false;
}

function passwordMatch() {
    if (password.value == confirmPassword.value){
        return true;
    }
    return false;
}

//pushes inputvalues to user array
async function signUser() {
    users.push({
        username: username.value,
        email: email.value,
        password: password.value,
    });
    await setItem('users', users);
}

// reset userslist after testing :D
async function deleteUsers(){
    users = [];
    await setItem('users', JSON.stringify(users));
}

function resetForm() {
    username.value=''
    email.value = '';
    password.value = '';
    confirmPassword.value ='';
    registerBtn.disabled = false;
}