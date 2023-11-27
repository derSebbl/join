let cardlabel = ['User Story', 'Technical Task'];
let boardColumn = ['boardColumnToDo', 'boardColumnInProgress', 'boardColumnAwaitFeedback', 'boardColumnDone'];
let cardPriority = ['Low', 'Medium', 'Urgent'];
let currentDraggedElement;
let boardOverlayIsOpen = false;

async function initBoard() {
    await loadUsersData();
    await loadRegisteredUsers();
    // await loadTasksData();
    renderBoardColumnTitleContainer();
    renderBoardColumns();
    updateBoardHTML();
    // console.log('boardTodos:', boardTodos);
    // sortBoardToDosArray();
}

// load users from remote in array named 'users'
async function loadUsersData() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.log('Loading error:', e);
    }
    // console.log('users: ', users);
}

function updateBoardHTML() {
    for (let i = 0; i < boardColumn.length; i++) {
        if (boardTodos[i] === null || boardTodos[i] === 'undefined') {
        } else {
            renderToDoCards(i);

        }
    }
}

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
}

function checkAndRenderCardProgress(cardData) {
    let output = '';
    if (cardData['subtasks']) {
        output = renderCardDataSubtasks(cardData);
    }
    return output;
}

function checkCountOfDoneSubtasks(subtasks) {
    let subtaskDone = 0;
    for (let i = 0; i < subtasks.length; i++) {
        const element = subtasks[i];
        if (element.charAt(1) == 'S') {
            subtaskDone += 1;
        }

    }
    return subtaskDone;
}

function startDragging(cardId) {
    currentDraggedcardId = cardId;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(columnCategory) {
    boardTodos[currentDraggedcardId]['columnCategory'] = columnCategory;
    updateBoardHTML();
}

function openCardDatas(cardId) {
    // console.log("boardTodos[cardId]['cardlabel']: ", boardTodos[cardId]['cardlabel']);
    openOverlayBackground();
    if (checkCardlabelIfPresent(cardId)) {
        renderCardDatasOverlay(cardId);
    } else {
        console.log('Error: Cardlabel not found');
    }
}

function openOverlayBackground() {
    cardOverlayContainer = document.getElementById('cardOverlayContainer');
    cardOverlayContainer.classList.add('dimBoardContainer');
    cardOverlayContainer.classList.add('zindex1000');
    boardOverlayIsOpen = true;
}

function closeOverlayBackground() {
    cardOverlayContainer = document.getElementById('cardOverlayContainer');
    cardOverlayContainer.classList.remove('dimBoardContainer');
    cardOverlayContainer.classList.remove('zindex1000');
    cardOverlayContainer.innerHTML = ``;
    boardOverlayIsOpen = false;
}

function checkCardlabelIfPresent(cardId) {
    if (boardTodos[cardId]['cardlabel'] == 0 || boardTodos[cardId]['cardlabel'] == 1) {
        return true;
    } else {
        return false;
    }
}

function setActivePrioButtonEdit(cardDatas) {
    let priorityName = getPriorityName(cardDatas['priority']);
    console.log('priorityName: ', priorityName);
    document.getElementById(priorityName).classList.add('selected');
    document.getElementById('selectedPriority').value = priorityName;
}


function createNewTaskInColumn(columnId) {
    openAddTaskBoard();
    console.log('columnId', columnId);
}

function switchSubtaskCheck(id, i) {
    console.log('switchSubtaskCheck i: ', i);
    // console.log('document.getElementById("cardTaskOverlaySubtasksDatas").innerText: ', document.getElementById("cardTaskOverlaySubtasksDatas").innerText);
    if (boardTodos[id]['subtasksToChecked'][i] == false || boardTodos[id]['subtasksToChecked'][i] == 0) {
        console.log('switch subtasksToChecked from false to true');
        boardTodos[id]['subtasksToChecked'][i] = true;
        document.getElementById(`subtasksCheckField${i}`).checked = true;
    } else if (boardTodos[id]['subtasksToChecked'][i] == true) {
        console.log('switch subtasksToChecked from true to false');
        boardTodos[id]['subtasksToChecked'][i] = false;
        document.getElementById(`subtasksCheckField${i}`).checked = false;
    }
    setTasksData();
}

async function deleteCard(cardId) {
    boardTodos.splice(cardId, 1);
    removeHighlight(cardId);
    sortBoardToDosArray();
    await setTasksData();
    await loadTasksData();
    renderBoardColumnTitleContainer();
    renderBoardColumns();
    updateBoardHTML();
}

function sortBoardToDosArray() {
    let tempBoardToDos = boardTodos;
    // tempBoardToDos.sort();
    for (let i = 0; i < boardTodos.length; i++) {
        // const element = boardTodos[i];
        boardTodos[i]['id'] = i;

    }
    console.log('boardTodos nach sortieren: ', boardTodos);
}

function highlight(i) {
    if (boardColumn[i - 1]) {
        document.getElementById(boardColumn[i - 1] + 'HighlightCardFrame').classList.add('dragArea');
        document.getElementById(boardColumn[i - 1] + 'HighlightCardFrame').classList.add('dragAreaHighlight');
    }
    if (boardColumn[i + 1]) {
        document.getElementById(boardColumn[i + 1] + 'HighlightCardFrame').classList.add('dragArea');
        document.getElementById(boardColumn[i + 1] + 'HighlightCardFrame').classList.add('dragAreaHighlight');
    }
}

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

function closeAddTaskBoard(){
    let addTaskBoard = document.getElementById('mainContainerAddTask');
    let background = document.getElementById('BackgroundAddTaskBoard');
    addTaskBoard.style.display = 'none';
    background.style.display = 'none';
    initBoard();
};

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

function getSearchTerm() {
    return document.getElementById('searchTask').value.toLowerCase();
};

function getCards() {
    return document.getElementsByClassName('cardFrame');
};

function resetSearchTerm() {
    document.getElementById('searchTask').value = '';
};

function displayAllCards(cards) {
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = 'block';
    }
};

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


