const STORAGE_TOKEN = '3I8KXR7TQP8EZFBKWR28HJJ175ALF0H6VIMGW3PY';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
};

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
};

let boardTodos = [];
let arrayOfRegisteredUsers = [];
let currentUser = [];
let contacts = [];
const tasks = [];
const randomProfilBadges = [];

async function init() {
    await loadTasksData();
    await includeHTML();
    await initRender();
    await loadUser();
    await loadRegisteredUsers();
    initUserProfileInitials();
};

/**
 * Initializes the rendering process. Waits for the 'content' element to be available in the DOM, 
 * then initializes the profile badges for the user.
 *
 * @async
 */
async function initRender() {
    let awaitIncludeHTML = setInterval(() => {
        if (document.getElementById('content')) {
            initProfileBadgesUser();
            clearInterval(awaitIncludeHTML);
        }
    }, 100);
};

/**
 * Initializes the user profile initials. It takes the first two letters of the user's username
 * and sets them as the user's profile initials. If the username is a single word, it takes the first two letters of that word.
 * The initials are then inserted into the 'userProfileInitials' element in the DOM.
 * 
 */
function initUserProfileInitials() {
    let userProfileInitials = document.getElementById('userProfileInitials');
    let initials;
    const words = currentUser.username.split(' ');
    if (words.length > 1) {
        const firstLetter = words[0].charAt(0);
        const secondLetter = words[1].charAt(0); 
        const resultString = firstLetter + secondLetter; 
        initials = resultString.toUpperCase();
    } else {
        initials = words[0].charAt(0).toUpperCase() + words[0].charAt(1).toUpperCase();
    }
    if (userProfileInitials) {
        userProfileInitials.innerHTML = `<span>${initials}</span>`;
    }
};

/**
 * Renders the user profile initials. It takes the first two letters of the user's username
 * and sets them as the user's profile initials. If the username is a single word, it takes the first two letters of that word.
 * 
 * @param {string} usernameForInitials - The username to be used for generating initials.
 * @returns {string} The initials derived from the username.
 */
function renderUserProfileInitials(usernameForInitials) {
    let initials;
    const words = usernameForInitials.split(' ');
    if (words.length > 1) {
        const firstLetter = words[0].charAt(0);  
        const secondLetter = words[1].charAt(0); 
        const resultString = firstLetter + secondLetter; 
        initials = resultString.toUpperCase();
    } else {
        initials = words[0].charAt(0).toUpperCase() + words[0].charAt(1).toUpperCase();
    }
    return initials;
};

/**
 * Asynchronously loads tasks data from local storage. 
 * The data is parsed from JSON and stored in the 'boardTodos' variable.
 * If an error occurs during loading, it is caught and logged to the console.
 *
 * @async
 */
async function loadTasksData() {
    try {
        boardTodos = JSON.parse(await getItem('boardtasks'));
    } catch (e) {
        console.log('Loading error:', e);
    }
};

/**
 * Asynchronously sets tasks data to local storage. 
 * The 'boardTodos' variable is stringified to JSON and stored.
 * If an error occurs during the process, it is caught and logged to the console.
 *
 * @async
 */
async function setTasksData() {
    try {
        await setItem('boardtasks', JSON.stringify(boardTodos));
    } catch (e) {
        console.log('Loading error:', e);
    }
};

/**
 * Pushes a new task into the tasks data array and updates the local storage.
 * 
 * @param {Object} newTask - The new task to be added. It should have properties for 'cardlabel', 'title', 'description', 'assignedTo', 'priority', 'duedate', and 'subtasks'.
 */
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
};

/**
 * Inserts users into the assigned-to list for a given card.
 * 
 * @param {Object} cardDatas - The data for the card. It should have a property 'assignedTo' which is a comma-separated string of user indices.
 */
function assignedToListInsertUser(cardDatas) {
    let container = document.getElementById("checkbox");
    let assignedToInput = document.getElementById("assignedToInput");

    if (!container || !assignedToInput || !arrayOfRegisteredUsers || arrayOfRegisteredUsers.length === 0) {
        return;
    }
    let assignedUsers = assignedToInput.value = cardDatas['assignedTo'].split(",");
    arrayOfRegisteredUsers.forEach((contact, i) => {
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "contact";
        checkbox.value = i;
        checkbox.addEventListener("change", function () {
            assignedToInput.value = cleanJSONString(Array.from(document.querySelectorAll('input[name="contact"]:checked')).map((contact) => contact.value));
        });
        let label = document.createElement("label");
        label.appendChild(document.createTextNode(contact.username));
        label.appendChild(checkbox);
        assignedUsers.forEach((user) => {
            if (arrayOfRegisteredUsers[user] && contact.username == arrayOfRegisteredUsers[user].username) {
                label.children[0].checked = true;
            }
        });
        container.appendChild(label);
    });
};

/**
 * Adds an edited subtask to the subtask list of a card.
 * The subtask is taken from the 'subtaskInput' element, and added to the 'subtaskList' element in the DOM.
 * If the 'subtaskInput' is empty, the function returns without adding anything.
 * 
 */
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

/**
 * Pushes changes into the tasks data for a given card.
 * 
 * @param {number} cardId - The ID of the card to be updated.
 */
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
};

/**
 * Initializes an array of boolean values representing the checked state of each subtask.
 * 
 * @param {string} inputSubtasksTo - A string of subtasks, separated by newline characters.
 * @returns {boolean[]} An array of boolean values, all initially set to false.
 */
function initSubtasksChecked(inputSubtasksTo) {
    let cardSubtasks = inputSubtasksTo.split("\n");
    let arraySubtasksToCheck = [];
    for (let i = 0; i < cardSubtasks.length; i++) {
        arraySubtasksToCheck[i] = false;
    }
    return arraySubtasksToCheck;
};

/**
 * Converts a priority name into a corresponding numerical value.
 * 
 * @param {string} priorityName - The name of the priority. Should be 'low', 'medium', or 'urgent'.
 * @returns {number} The numerical value of the priority. Returns 0 for 'low', 1 for 'medium', and 2 for 'urgent'.
 */
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
};

/**
 * Converts a priority number into a corresponding name.
 * 
 * @param {number} priorityNumber - The number of the priority. Should be 0, 1, or 2.
 * @returns {string} The name of the priority. Returns 'low' for 0, 'medium' for 1, and 'urgent' for 2.
 */
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
};

/**
 * Gets the current timestamp.
 * 
 * @returns {number} The current timestamp, in milliseconds since the Unix epoch.
 */
function getCurrentTimestamp() {
    return new Date().valueOf();
};

/**
 * Converts a timestamp into a Date object.
 * 
 * @param {number} Timestamp - The timestamp to be converted, in seconds since the Unix epoch.
 * @returns {Date} The Date object representing the given timestamp.
 */
function getDateFromTimestamp(Timestamp) {
    return new Date(Timestamp * 1000);
};

/**
 * Converts a date string into a timestamp.
 * 
 * @param {string} dateForTimestamp - The date string to be converted, in the format 'YYYY-MM-DD'.
 * @returns {number} The timestamp representing the given date, in seconds since the Unix epoch.
 */
function getTimestampFromDate(dateForTimestamp) {
    dateForTimestamp = dateForTimestamp.split("-");
    var newTimestamp = new Date(dateForTimestamp[0], dateForTimestamp[1] - 1, dateForTimestamp[2]);
    return (newTimestamp.getTime() / 1000);
};

/**
 * Converts a timestamp into a date or time of day string.
 * 
 * @param {number} timestamp - The timestamp to be converted, in seconds since the Unix epoch.
 * @param {string} dateOrTimeofday - The format to convert the timestamp into. Should be 'date', 'date4input', or 'timeofday'.
 * @param {string} limiter - The character to use as a separator in the output string.
 * @returns {string} The date or time of day string representing the given timestamp.
 */
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
};

/**
 * Asynchronously includes HTML from external files into the current document.
 * The function looks for elements with the 'w3-include-html' attribute and replaces their content with the content of the file specified by the attribute.
 * If the file cannot be fetched, the element's content is replaced with 'Page not found'.
 *
 * @async
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
};

/**
 * Asynchronously loads the current user data from local storage. 
 * The data is parsed from JSON and stored in the 'currentUser' variable.
 * If an error occurs during loading, it is caught and logged to the console.
 *
 * @async
 */
async function loadUser() {
    try {
        currentUser = JSON.parse(await getItem('currentUser'));
    } catch (e) {
        console.log('Loading error:', e);
    }
};

/**
 * Asynchronously loads the registered users data from local storage. 
 * The data is parsed from JSON and stored in the 'arrayOfRegisteredUsers' variable.
 * If an error occurs during loading, it is caught and logged to the console.
 *
 * @async
 */
async function loadRegisteredUsers() {
    try {
        arrayOfRegisteredUsers = JSON.parse(await getItem('users'));
    } catch (e) {
        console.log('Loading error:', e);
    }
};

/**
 * Logs out the current user.
 * The function removes the 'currentUser' item from local storage and redirects the user to the login page.
 * If an error occurs during the process, it is caught and logged to the console.
 */
function logoutUser() {
    try {
        localStorage.removeItem('currentUser');
        window.location.href = "../login/login.html";
    } catch (e) {
        console.log('Logout error:', e);
    }
};

/**
 * Asynchronously loads contact data from local storage.
 * 
 */
async function loadContactData() {
    try {
        contacts = JSON.parse(await getItem('contact'));
        editInitalsContacts();
        initializeRandomProfilBadges();
    } catch (e) {
        console.log('Loading error:', e);
    }
};

/**
 * Asynchronously sets contact data to local storage.
 * 
 */
async function setContactData() {
    try {
        await setItem('contact', JSON.stringify(contacts));
    } catch (e) {
        console.log('Loading error:', e);
    }
};
