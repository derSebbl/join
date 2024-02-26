async function checkMail() {
    await loadRegisteredUsers();
    let email = document.getElementById('email').value;

    if (arrayOfRegisteredUsers) {
        let user = arrayOfRegisteredUsers.find(user => user.email === email);

        if (user) {
            console.log('Die E-Mail ist in der Liste der registrierten Benutzer vorhanden.');
            document.getElementById('password').value = user.password; // Passwort anzeigen
        } else {
            console.log('Die E-Mail ist nicht in der Liste der registrierten Benutzer vorhanden.');
        }
    } else {
        console.log('Es konnten keine Benutzer geladen werden.');
    }
};