/*async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }*/ //dieser Code muss in jede script Datei selbst eingebunden werden 

function toSummary(){
    window.location.href = '/summary/summary.html';
};

function toAddTask(){
    window.location.href = '/addTask/addTask.html';
};

function toBoard(){
    window.location.href = '/board/board.html';
};

function toContact(){
    window.location.href = '/contact/contact.html';
};

function toPrivacyPolicy() {
    window.location.href = '../privacyPolicy.html'
};

function toLegalNotice() {
    window.location.href = '../legalNotice.html'
};

function openMiniMenu() {
    let miniMenu = document.getElementById("minimenu");
    if (miniMenu.style.display === "none") {
        miniMenu.style.display = "inline-flex";
    } else {
        miniMenu.style.display = "none";
    }
};


