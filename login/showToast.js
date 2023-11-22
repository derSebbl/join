// load users from remote in array named 'users'
async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.log('Loading error:', e);
    }
    console.log(users);
}

function showToast(message) {
    // Erstellen Sie ein div-Element für den Toast
    var toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
  
    // Fügen Sie den Toast dem HTML-Dokument hinzu
    document.body.appendChild(toast);
  
    // Stil und Animation für den Toast
    toast.style.position = "fixed";
    toast.style.top = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.backgroundColor = "#333";
    toast.style.color = "white";
    toast.style.padding = "10px";
    toast.style.borderRadius = "5px";
    toast.style.zIndex = "9999";
  
    // Timer, um den Toast nach 5 Sekunden zu entfernen
    setTimeout(function() {
    //   toast.style.display = "none";
        toast.remove();
    }, 2000);
}


  /**
 * give Password container the eyeClosed.svg when something is written in it and the ability to switch the Visibility of the text
 * @param {*} inputId 
 * @param {*} iconId 
 */
function setupPasswordVisibility(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const passwordIcon = document.getElementById(iconId);

    passwordInput.addEventListener("input", function() {
        if (passwordInput.value === "") {
            passwordIcon.src = "loginSymbols/lock.svg";
        } else {
            passwordIcon.src = "loginSymbols/eyeClosed.svg";
        }
    });

    passwordIcon.addEventListener("click", function() {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            passwordIcon.src = "loginSymbols/eyeOpen.svg";
        } else {
            passwordInput.type = "password";
            passwordIcon.src = "loginSymbols/eyeClosed.svg";
        }
    });
}

setupPasswordVisibility("password", "passwordIcon");
if (document.getElementById('confirmPassword')){
    setupPasswordVisibility("confirmPassword", "confirmPasswordIcon");
}


function getLoginValues() {
    let emailInput = document.getElementById('email').value;
    let passwordInput = document.getElementById('password').value;
    return [emailInput, passwordInput];
}

