// Initialise connection to server
////////////////////////////
const STORAGE_TOKEN = 'BFGA2839RXJ228BO5J181H5QX8PREY153637G14W';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}


// Initialise variables
////////////////////////////
let boardTodos = [];
let arrayOfRegisteredUsers = [];
let currentUser = [];
const randomProfilBadges = [];

// Initialise Site
////////////////////////////
async function init() {
    await loadTasksData();
    await includeHTML();
    await initRender();
    await loadUser();
    await loadRegisteredUsers();
    initUserProfileInitials();
    // console.log('arrayOfRegisteredUsers: ', arrayOfRegisteredUsers)
}


async function initRender() {
    let awaitIncludeHTML = setInterval(() => {
        if (document.getElementById('content')) {
            initProfileBadgesUser();
            clearInterval(awaitIncludeHTML);
        }
    }, 100);
}


function initUserProfileInitials() {
    let userProfileInitials = document.getElementById('userProfileInitials');
    let initials;
    const words = currentUser.username.split(' ');
    if (words.length > 1) {
        const firstLetter = words[0].charAt(0);  // Erster Buchstabe des ersten Wortes
        const secondLetter = words[1].charAt(0); // Erster Buchstabe des zweiten Wortes
        const resultString = firstLetter + secondLetter; // Neuer String mit den beiden Buchstaben
        // console.log(resultString.toUpperCase());
        initials = resultString.toUpperCase();
    } else {
        initials = words[0].charAt(0).toUpperCase() + words[0].charAt(1).toUpperCase();
    }
    if (userProfileInitials) {
        userProfileInitials.innerHTML = `<span>${initials}</span>`;
    }

}


function renderUserProfileInitials(usernameForInitials) {
    let initials;
    const words = usernameForInitials.split(' ');
    if (words.length > 1) {
        const firstLetter = words[0].charAt(0);  // Erster Buchstabe des ersten Wortes
        const secondLetter = words[1].charAt(0); // Erster Buchstabe des zweiten Wortes
        const resultString = firstLetter + secondLetter; // Neuer String mit den beiden Buchstaben
        // console.log(resultString.toUpperCase());
        initials = resultString.toUpperCase();
    } else {
        initials = words[0].charAt(0).toUpperCase() + words[0].charAt(1).toUpperCase();
    }
    return initials;
}


// load tasks from remote in array named 'boardtasks'
async function loadTasksData() {
    try {
        boardTodos = JSON.parse(await getItem('boardtasks'));
    } catch (e) {
        console.log('Loading error:', e);
    }
}


async function setTasksData() {
    try {
        await setItem('boardtasks', JSON.stringify(boardTodos));
    } catch (e) {
        console.log('Loading error:', e);
    }
}

function pushIntoTasksData(newTask) {
    let newBoardTodo = {
        id: boardTodos.length,
        cardlabel: parseInt(newTask['cardlabel']),
        title: newTask['title'],
        description: newTask['description'],
        assignedTo: newTask['assignedTo'],
        priority: getPriorityNumber(newTask['priority']),
        duedate: getTimestampFromDate(newTask['duedate']),
        subtasks: newTask['subtasks'],
        subtasksToChecked: initSubtasksChecked(newTask['subtasks']),
        columnCategory: 'boardColumnToDo'
    };
    boardTodos.push(newBoardTodo);
    setTasksData();
}


//Function to add the Contacts in the Dropdown Menu
function assignedToListInsertUser(cardDatas) {
    let container = document.getElementById("checkbox");
    let assignedToInput = document.getElementById("assignedToInput");

    if (!container || !assignedToInput) {
        console.error('Die benötigten Elemente konnten nicht gefunden werden.');
        return;
    }

    let assignedUsers = document.getElementById("assignedToInput").value = cardDatas['assignedTo'].split(",");

    if (!arrayOfRegisteredUsers || arrayOfRegisteredUsers.length === 0) {
        console.error('Keine registrierten Benutzer gefunden.');
        return;
    }

    for (let i = 0; i < arrayOfRegisteredUsers.length; i++) {
        let contact = arrayOfRegisteredUsers[i];
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "contact";
        checkbox.value = i;

        checkbox.addEventListener("change", function () {
            let selectedContacts = document.querySelectorAll(
                'input[name="contact"]:checked'
            );
            let selectedNames = Array.from(selectedContacts).map(
                (contact) => contact.value
            );
            assignedToInput.value = cleanJSONString(selectedNames);
        });

        let label = document.createElement("label");
        label.appendChild(document.createTextNode(contact.username));
        label.appendChild(checkbox);
        for (let z = 0; z < assignedUsers.length; z++) {
            if (arrayOfRegisteredUsers[assignedUsers[z]] && arrayOfRegisteredUsers[i]['username'] == arrayOfRegisteredUsers[assignedUsers[z]]['username']) {
                label.children[0].checked = true;
            }
        }

        container.appendChild(label);
    }
}

function addEditedSubtask() {
    let subtaskInput = document.getElementById("subtaskInput");
    let subtask;
    if (subtask = document.getElementById("subtaskList")) {
        boardTodos[cardId]['subtasks'] = document.getElementById("subtaskList").innerText;
    }
    if (subtaskInput.value === ``) {
        return;
    } else {
        subtask.innerHTML += /*html*/ `
      <li>${subtaskInput.value}</li>
      `;
        subtaskInput.value = ``;
    }
};


function pushChangesIntoTasksData(cardId) {
    boardTodos[cardId]['title'] = document.getElementById("titleInput").value;
    boardTodos[cardId]['description'] = document.getElementById("descriptionInput").value;
    boardTodos[cardId]['assignedTo'] = document.getElementById("assignedToInput").value;
    boardTodos[cardId]['duedate'] = getTimestampFromDate(document.getElementById("dateInput").value);
    boardTodos[cardId]['priority'] = getPriorityNumber(document.getElementById("selectedPriority").value);

    if (document.getElementById("subtaskList")) {
        boardTodos[cardId]['subtasks'] = document.getElementById("subtaskList").innerText;

        if (!boardTodos[cardId].hasOwnProperty('subtasksToChecked')) {
            boardTodos[cardId]['subtasksToChecked'] = initSubtasksChecked(boardTodos[cardId]['subtasks']);
        } else {
            let newSubtasks = document.getElementById("subtaskList").innerText.split("\n");
            let existingSubtasks = boardTodos[cardId]['subtasksToChecked'];

            for (let i = existingSubtasks.length; i < newSubtasks.length; i++) {
                existingSubtasks[i] = false;
            }
        }
    }

    closeOverlayBackground();
    updateBoardHTML();
    setTasksData();
}

function initSubtasksChecked(inputSubtasksTo) {
    let cardSubtasks = inputSubtasksTo.split("\n");
    let arraySubtasksToCheck = [];
    for (let i = 0; i < cardSubtasks.length; i++) {
        arraySubtasksToCheck[i] = false;
    }
    return arraySubtasksToCheck;
}


function getPriorityNumber(priorityName) {
    switch (priorityName) {
        case 'low':
            return 0;
            break;

        case 'medium':
            return 1;
            break;

        case 'urgent':
            return 2;
            break;

        default:
            break;
    }
}


function getPriorityName(priorityNumber) {
    switch (priorityNumber) {
        case 0:
            return 'low';
            break;

        case 1:
            return 'medium';
            break;

        case 2:
            return 'urgent';
            break;

        default:
            console.log('Error! priorityNumber is not present: ', priorityNumber);
            return '';
            break;
    }
}


function getCurrentTimestamp() {
    return new Date().valueOf();
}


function getDateFromTimestamp(Timestamp) {
    return new Date(Timestamp * 1000);
}


function getTimestampFromDate(dateForTimestamp) {
    dateForTimestamp = dateForTimestamp.split("-");
    var newTimestamp = new Date(dateForTimestamp[0], dateForTimestamp[1] - 1, dateForTimestamp[2]);
    return (newTimestamp.getTime() / 1000);
}


function timestampToDateOrTimeofday(timestamp, dateOrTimeofday, limiter) {
    let timeString;
    let timestampAsString = getDateFromTimestamp(timestamp);
    if (dateOrTimeofday == 'date') {
        timeString = ('0' + timestampAsString.getDate()).slice(-2) + limiter + ('0' + (timestampAsString.getMonth() + 1)).slice(-2) + limiter + timestampAsString.getFullYear();
    } else if (dateOrTimeofday == 'date4input') {
        timeString = timestampAsString.getFullYear() + limiter + ('0' + (timestampAsString.getMonth() + 1)).slice(-2) + limiter + ('0' + timestampAsString.getDate()).slice(-2);
    } else if (dateOrTimeofday == 'timeofday') {
        timeString = ('0' + timestampAsString.getHours()).slice(-2) + limiter + ('0' + timestampAsString.getMinutes()).slice(-2) + limiter + ('0' + timestampAsString.getSeconds()).slice(-2);
    }
    return timeString;
}


async function includeHTML() {
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
    }
}

// Array Contactlist
let contacts = [
    {
        name: "Sebastian Binz",
        mail: "sebastianbinz@mail.de",
        phone: "07821 435 678",
    },
    {
        name: "Christian De Stradis",
        mail: "ChrisDeStradis@mail.de",
        phone: "07867 894 672"
    },
    {
        name: "Mahmut Kalem",
        mail: "m.kalem@mail.de",
        phone: "0736 157 678"
    },
    {
        name: "Wolfram Simon",
        mail: "WolframS@mail.de",
        phone: "0797 643 217"
    },
];

// load currentUser
async function loadUser() {
    try {
        currentUser = JSON.parse(await getItem('currentUser'));
    } catch (e) {
        console.log('Loading error:', e);
    }
}


// load registeredUsers
async function loadRegisteredUsers() {
    try {
        arrayOfRegisteredUsers = JSON.parse(await getItem('users'));
    } catch (e) {
        console.log('Loading error:', e);
    }
}

function logoutUser() {
    try {
        localStorage.removeItem('currentUser');
        window.location.href = "../login/login.html";
    } catch (e) {
        console.log('Logout error:', e);
    }
}

