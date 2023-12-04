let cardlabel = ['User Story', 'Technical Task'];
let boardColumn = ['boardColumnToDo', 'boardColumnInProgress', 'boardColumnAwaitFeedback', 'boardColumnDone'];
let cardPriority = ['Low', 'Medium', 'Urgent'];
let currentDraggedElement;
let boardOverlayIsOpen = false;

async function initBoard() {
    await loadUsersData();
    await loadRegisteredUsers();
    await loadTasksData();
    renderBoardColumnTitleContainer();
    renderBoardColumns();
    updateBoardHTML();
    ChangeParentsResp();
}

/**
 * Loads user data from remote into an array named 'users'.
 * 
 * @async
 * @throws {Error} If an error occurs while loading the data.
 */
async function loadUsersData() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.log('Loading error:', e);
    }
    // console.log('users: ', users);
};

/**
 * Updates the HTML of the board by rendering ToDo cards for each column. Skips columns where boardTodos is null or 'undefined'.
 * 
 */
function updateBoardHTML() {
    for (let i = 0; i < boardColumn.length; i++) {
        if (boardTodos[i] === null || boardTodos[i] === 'undefined') {
        } else {
            renderToDoCards(i);
        }
    }
};

/**
 * Renders ToDo cards for a given column.
 * 
 * @param {number} i - The index of the column.
 */
function renderToDoCards(i) {
    let columnCategory = boardTodos.filter(t => t['columnCategory'] == boardColumn[i]);

    document.getElementById(boardColumn[i]).innerHTML = '';

    if (columnCategory.length > 0) {
        for (let index = 0; index < columnCategory.length; index++) {
            document.getElementById(boardColumn[i]).innerHTML += generateTodoCardHTML(columnCategory[index]);
        }
        document.getElementById(boardColumn[i]).innerHTML += generateHighlightCardFrameHTML(boardColumn[i]);
    } else {
        document.getElementById(boardColumn[i]).innerHTML += generateNoTasksInCategoryHTML(boardColumn[i]);
        document.getElementById(boardColumn[i]).innerHTML += generateHighlightCardFrameHTML(boardColumn[i]);
    }
};

/**
 * Checks and renders the progress of a card.
 * 
 * @param {Object} cardData - The data of the card.
 * @returns {string} The rendered output.
 */
function checkAndRenderCardProgress(cardData) {
    let output = '';
    if (cardData['subtasks']) {
        output = renderCardDataSubtasks(cardData);
    }
    return output;
};

/**
 * Counts the number of done subtasks.
 * 
 * @param {Array} subtaskcheck - The array of subtasks.
 * @returns {number} The number of done subtasks.
 */
function checkCountOfDoneSubtasks(subtaskcheck) {
    let subtaskDone = 0;
    for (let i = 0; i < subtaskcheck.length; i++) {
        const element = subtaskcheck[i];
        if (element === true) {
            subtaskDone += 1;
        }
    }
    return subtaskDone;
};

/**
 * Starts dragging a card.
 * 
 * @param {string} cardId - The ID of the card.
 */
function startDragging(cardId) {
    currentDraggedcardId = cardId;
};

/**
 * Allows dropping a card.
 * 
 * @param {Event} ev - The event object.
 */
function allowDrop(ev) {
    ev.preventDefault();
};

/**
 * Moves a card to a different column.
 * 
 * @param {string} columnCategory - The category of the column.
 */
function moveTo(columnCategory) {
    boardTodos[currentDraggedcardId]['columnCategory'] = columnCategory;
    updateBoardHTML();
};

/**
 * Opens the card data.
 * 
 * @param {string} cardId - The ID of the card.
 */
function openCardDatas(cardId) {
    openOverlayBackground();
    if (checkCardlabelIfPresent(cardId)) {
        renderCardDatasOverlay(cardId);
        loadTasksData();
    } else {
        console.log('Error: Cardlabel not found');
    }
};

/**
 * Opens the overlay background.
 * 
 */
function openOverlayBackground() {
    cardOverlayContainer = document.getElementById('cardOverlayContainer');
    cardOverlayContainer.classList.add('dimBoardContainer');
    cardOverlayContainer.classList.add('zindex1000');
    boardOverlayIsOpen = true;
};

/**
 * Closes the overlay background.
 * 
 */
function closeOverlayBackground() {
    cardOverlayContainer = document.getElementById('cardOverlayContainer');
    cardOverlayContainer.classList.remove('dimBoardContainer');
    cardOverlayContainer.classList.remove('zindex1000');
    cardOverlayContainer.innerHTML = ``;
    boardOverlayIsOpen = false;
};

/**
 * Checks if a card label is present.
 * 
 * @param {string} cardId - The ID of the card.
 * @returns {boolean} True if the card label is present, false otherwise.
 */
function checkCardlabelIfPresent(cardId) {
    if (boardTodos[cardId]['cardlabel'] == 0 || boardTodos[cardId]['cardlabel'] == 1) {
        return true;
    } else {
        return false;
    }
};

/**
 * Sets the active priority button for editing.
 * 
 * @param {Object} cardDatas - The data of the card.
 */
function setActivePrioButtonEdit(cardDatas) {
    if (cardDatas && cardDatas['priority']) {
        let priorityName = getPriorityName(cardDatas['priority']);
        if (priorityName) {
            let priorityElement = document.getElementById(priorityName);
            if (priorityElement) {
                priorityElement.classList.add('selected');
                document.getElementById('selectedPriority').value = priorityName;
            }
        }
    }
};

/**
 * Creates a new task in a column.
 * 
 * @param {string} columnId - The ID of the column.
 */
function createNewTaskInColumn(columnId) {
    openAddTaskBoard();
};

/**
 * Switches the check state of a subtask.Push it to the array of checked subtasks, upload the change in the backend and updates the HTML.
 * 
 * @param {string} id - The ID of the task.
 * @param {number} i - The index of the subtask.
 */
function switchSubtaskCheck(id, i) {
    if (boardTodos[id]['subtasksToChecked'][i] === false || boardTodos[id]['subtasksToChecked'][i] === 0) {
        boardTodos[id]['subtasksToChecked'][i] = true;
        document.getElementById(`subtasksCheckField${i}`).checked = true;
    } else if (boardTodos[id]['subtasksToChecked'][i] === true) {
        boardTodos[id]['subtasksToChecked'][i] = false;
        document.getElementById(`subtasksCheckField${i}`).checked = false;
    }
    setTasksData();
    updateBoardHTML();
};

/**
 * Updates the image of a subtask.
 * 
 * @param {string} id - The ID of the task.
 * @param {number} i - The index of the subtask.
 */
function updateSubtaskImage(id, i) {
    let checkbox = document.getElementById(`subtasksCheckField${i}`);
    let label = checkbox.parentElement;
    let image = label.querySelector('.checkButtonChecked');

    if (boardTodos[id]['subtasksToChecked'][i]) {
        image.src = '../assets/icons/checkButtonChecked.svg';
    } else {
        image.src = '../assets/icons/checkButtonUnchecked.svg';
    }
};

/**
 * Deletes a card.
 * 
 * @param {string} cardId - The ID of the card.
 */
async function deleteCard(cardId) {
    boardTodos.splice(cardId, 1);
    removeHighlight(cardId);
    sortBoardToDosArray();
    await setTasksData();
    await loadTasksData();
    renderBoardColumnTitleContainer();
    renderBoardColumns();
    updateBoardHTML();
    closeOverlayBackground();
};

/**
 * Sorts the board ToDos array.
 * 
 */
function sortBoardToDosArray() {
    for (let i = 0; i < boardTodos.length; i++) {
        boardTodos[i]['id'] = i;
    }
};

/**
 * Highlights a card.
 * 
 * @param {number} i - The index of the card.
 */
function highlight(i) {
    if (boardColumn[i - 1]) {
        document.getElementById(boardColumn[i - 1] + 'HighlightCardFrame').classList.add('dragArea');
        document.getElementById(boardColumn[i - 1] + 'HighlightCardFrame').classList.add('dragAreaHighlight');
    }
    if (boardColumn[i + 1]) {
        document.getElementById(boardColumn[i + 1] + 'HighlightCardFrame').classList.add('dragArea');
        document.getElementById(boardColumn[i + 1] + 'HighlightCardFrame').classList.add('dragAreaHighlight');
    }
};

/**
 * Removes the highlight from a card.
 * 
 * @param {number} i - The index of the card.
 */
function removeHighlight(i) {
    if (boardColumn[i - 1]) {
        document.getElementById(boardColumn[i - 1] + 'HighlightCardFrame').classList.remove('dragArea');
        document.getElementById(boardColumn[i - 1] + 'HighlightCardFrame').classList.remove('dragAreaHighlight');
    }
    if (boardColumn[i + 1]) {
        document.getElementById(boardColumn[i + 1] + 'HighlightCardFrame').classList.remove('dragArea');
        document.getElementById(boardColumn[i + 1] + 'HighlightCardFrame').classList.remove('dragAreaHighlight');
    }
};

/**
 * Closes the add task board.
 * 
 */
function closeAddTaskBoard(){
    let addTaskBoard = document.getElementById('mainContainerAddTask');
    let background = document.getElementById('BackgroundAddTaskBoard');
    addTaskBoard.style.display = 'none';
    background.style.display = 'none';
    initBoard();
};

/**
 * Opens the add task board.
 * 
 */
function openAddTaskBoard(){
    if(window.innerWidth > 1300){
    let addTaskBoard = document.getElementById('mainContainerAddTask');
    let background = document.getElementById('BackgroundAddTaskBoard');
    addTaskBoard.style.display = 'flex';
    background.style.display = 'block';
    }
    else {
        window.location.href = '/addTask/addTask.html';
    }
};

/**
 * Filters the cards based on the search term.
 * 
 */
function filterCards() {
    let searchTerm = getSearchTerm();
    let cards = getCards();
    if (searchTerm === "") {
        displayAllCards(cards);
    } else {
        filterAndDisplayCards(cards, searchTerm);
    }
    resetSearchTerm();
};

/**
 * Gets the search term.
 * 
 * @returns {string} The search term.
 */
function getSearchTerm() {
    return document.getElementById('searchTask').value.toLowerCase();
};

/**
 * Gets the cards.
 * 
 * @returns {HTMLCollection} The collection of cards.
 */
function getCards() {
    return document.getElementsByClassName('cardFrame');
};

/**
 * Resets the search term.
 * 
 */
function resetSearchTerm() {
    document.getElementById('searchTask').value = '';
};

/**
 * Displays all cards.
 * 
 * @param {HTMLCollection} cards - The collection of cards.
 */
function displayAllCards(cards) {
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = 'block';
    }
};

/**
 * Filters and displays the cards based on the search term.
 * 
 * @param {HTMLCollection} cards - The collection of cards.
 * @param {string} searchTerm - The search term.
 */
function filterAndDisplayCards(cards, searchTerm) {
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let cardTitle = card.querySelector('.cardContentTitle').innerText.toLowerCase();
        let cardDescription = card.querySelector('.cardContentText').innerText.toLowerCase();

        if (cardTitle.includes(searchTerm) || cardDescription.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    }
};