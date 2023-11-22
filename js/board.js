// let boardTodos = [];

// let boardTodos = [{
//     'id': 0,
//     'cardlabel': 0,
//     'title': 'Titel ID 0',
//     'description': 'Content ID 0',
//     'assignedTo': '0',
//     'priority': 0,
//     'duedate': 1697102700,
//     'columnCategory': 'boardColumnInProgress'
// }, {
//     'id': 1,
//     'cardlabel': 1,
//     'title': 'Titel ID 1',
//     'description': 'Content ID 1',
//     'assignedTo': '1,2',
//     'priority': 1,
//     'duedate': 1705051500,
//     'subtasks': '1Das ist der 1. Subtask,0Das ist der 2. Subtask',
//     'columnCategory': 'boardColumnInProgress'
// }, {
//     'id': 2,
//     'cardlabel': 1,
//     'title': 'Titel ID 2',
//     'description': 'Content ID 2',
//     'assignedTo': '1',
//     'priority': 2,
//     'duedate': 1703330400,
//     'columnCategory': 'boardColumnAwaitFeedback'
// }, {
//     'id': 3,
//     'cardlabel': 0,
//     'title': 'Titel ID 3',
//     'description': 'Content ID 3',
//     'assignedTo': '3',
//     'priority': 0,
//     'duedate': 1700727899,
//     'subtasks': '0Implement Recipe Recommendation,1Start Page Layout',
//     'columnCategory': 'boardColumnInProgress'
// }, {
//     'id': 4,
//     'cardlabel': 0,
//     'title': 'Titel ID 4',
//     'description': 'Content ID 4',
//     'assignedTo': '2,3',
//     'priority': 2,
//     'duedate': 1701354299,
//     'columnCategory': 'boardColumnDone'
// }];

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


function renderBoardColumnTitleContainer() {
    let outputColumnTitle = '';
    let columnTitle;
    let plusButtonIcons = '';
    for (let i = 0; i < boardColumn.length; i++) {
        plusButtonIcons = renderPlusButtonIcons(i);
        switch (i) {
            case 0:
                columnTitle = 'To do';
                break;

            case 1:
                columnTitle = 'In progress';
                break;

            case 2:
                columnTitle = 'Await feedback';
                break;

            case 3:
                columnTitle = 'Done';
                plusButtonIcons = '';
                break;

            default:
                break;
        }
        outputColumnTitle += `
                                <div class="boardColumnTitleOneColumn">
                                    <div>${columnTitle}</div>
                                    ${plusButtonIcons}
                                </div>
                            `;
    }
    document.getElementById('boardColumnTitleContainer').innerHTML = outputColumnTitle;
}


function renderPlusButtonIcons(i) {
    return `
                <div class="plusButtonIcons" onclick="createNewTaskInColumn(${i})">
                    <div class="plusButtonIconDefault"><img class="plusButtonIconDefaultImage"
                            src="../assets/icons/plusButtonIconDefault.svg" alt="Add"></div>
                    <div class="plusButtonIconHover"><img class="plusButtonIconHoverImage"
                            src="../assets/icons/plusButtonIconHover.svg" alt="Add"></div>
                    <div class="plusButtonIconWhileClick"><img class="plusButtonIconWhileClickImage"
                            src="../assets/icons/plusButtonIconWhileClick.svg" alt="Add"></div>
                </div>

            `;
}


function renderBoardColumns() {
    let outputColumns = '';
    for (let i = 0; i < boardColumn.length; i++) {
        outputColumns += `<div id="${boardColumn[i]}" class="boardTaskColumn" ondrop="moveTo('${boardColumn[i]}'); setTasksData()" ondrag="highlight(${i})" ondragleave="removeHighlight(${i})" ondragover="allowDrop(event)"></div>`;
    }
    document.getElementById('boardColumnContainer').innerHTML = outputColumns;
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


function generateTodoCardHTML(cardData) {
    // console.log(`cardData ${cardData['id']}: `, cardData);
    return `<div class="cardFrame" draggable="true" ondragstart="startDragging(${cardData['id']})" onClick="openCardDatas(${cardData['id']})">
                <div class="cardContent">
                    <div class="boardCardLabel${cardData['cardlabel']}">${cardlabel[cardData['cardlabel']]}</div>
                    <div class="boardCardContentInner">
                        <h3 class="cardContentTitle">${cardData['title']}</h3>
                        <p class="cardContentText">${cardData['description']}</p>
                    </div>
                    ${checkAndRenderCardProgress(cardData)}
                    <div class="boardCardFooterContent">
                        <div class="boardCardFooterContentProfileBadgeIcons">
                            ${renderdesignProfileBadge(cardData)}

                        </div>
                        <div class="boardCardFooterContentPrioritySymbols">
                            <div class="prioritySymbols">
                                <div class="prioritySymbolsIcons">
                                    <img class="prioritySymbolProperty${cardPriority[cardData['priority']]}" src="../assets/icons/prioritySymbolProperty${cardPriority[cardData['priority']]}.svg" alt="Prio ${cardPriority[cardData['priority']]}">
                                </div>    
                            </div>    
                        </div>    
                    </div>    
                </div>
            </div>`;
}


function checkAndRenderCardProgress(cardData) {
    let output = '';
    if (cardData['subtasks']) {
        output = renderCardDataSubtasks(cardData);
    }
    return output;
}


function renderCardDataSubtasks(cardData) {
    let subtasks = cardData['subtasks'].split("\n");
    let subtaskDone = checkCountOfDoneSubtasks(subtasks);
    let renderedSubtasks = renderSubtasks(subtasks, subtaskDone);
    return renderedSubtasks;
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


function renderSubtasks(subtasks, subtaskDone) {
    return `
                        <div class="cardProgress">
                            <div class="cardProgressBar">
                                <div class="cardProgressBarFiller" style="width: ${100 / subtasks.length * subtaskDone}%;"></div>
                            </div>
                            <div class="cardProgressText">${subtaskDone}/${subtasks.length} Subtasks</div>
                        </div>
                    `;
}


function renderdesignProfileBadge(cardData) {
    let output = '';
    let assignedUsers = cardData['assignedTo'].split(",");
    // console.log('assignedUsers2: ', arrayOfRegisteredUsers);
    for (let i = 0; i < assignedUsers.length; i++) {
        output += `
                    <div class="designProfileBadge">
                        <div id="designProfileBadgeInner-${assignedUsers[i]}" class="designProfileBadgeInner">
                            <div class="designProfileBadgeInnerText">${renderUserProfileInitials(arrayOfRegisteredUsers[assignedUsers[i]]['username'])}</div>
                        </div>    
                    </div>
                        `;
    }
    return output;

}
function generateNoTasksInCategoryHTML(toDoCardsCategory) {
    switch (toDoCardsCategory) {
        case boardColumn[0]:
            return `<div id="${toDoCardsCategory}NoTasks" class="boardColumnHasNoTasks dFlex">No tasks To do</div>`;

            break;

        case boardColumn[1]:
            return `<div id="${toDoCardsCategory}NoTasks" class="boardColumnHasNoTasks dFlex">No tasks In Progress</div>`;

            break;

        case boardColumn[2]:
            return `<div id="${toDoCardsCategory}NoTasks" class="boardColumnHasNoTasks dFlex">No tasks Await Feedback</div>`;

            break;

        case boardColumn[3]:
            return `<div id="${toDoCardsCategory}NoTasks" class="boardColumnHasNoTasks dFlex">No tasks Done</div>`;

            break;

        default:
            break;
    }
}


function generateHighlightCardFrameHTML(toDoCardsCategory) {
    return `<div id="${toDoCardsCategory}HighlightCardFrame" class=""></div>`;
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

function renderCardDatasOverlay(cardId) {
    console.log('boardTodos bei Overlayaufruf: ', boardTodos);

    const cardDatas = boardTodos[cardId];
    let timeString = timestampToDateOrTimeofday(cardDatas['duedate'], 'date', '.');
    document.getElementById('cardOverlayContainer').innerHTML = `
                                            <div class="cardFrameTaskOverlay">
                                                <div class="cardTaskOverlayContent">

                                                    <div class="taskOverlaytemplateCard">
                                                        <div class="boardCardLabel${cardDatas['cardlabel']}">
                                                            ${cardlabel[cardDatas['cardlabel']]}
                                                        </div>
                                                        <div class="subtasksIconsIcon subtasksIconsClose" onClick="closeOverlayBackground()"></div>
                                                    </div>



                                                    <div class="cardTaskOverlayContentInner">

                                                        <div class="cardTaskOverlayContentTitle">${cardDatas['title']}</div>
                                                        <div class="cardTaskOverlayContentText">${cardDatas['description']}</div>

                                                        <div class="cardTaskOverlayDueDate">
                                                            <div class="cardTaskOverlayDueDateText">Due Date:</div>
                                                            <div class="cardTaskOverlayDueDateData">${timeString}</div>
                                                        </div>

                                                        <div class="cardTaskOverlayPriority">
                                                            <div class="cardTaskOverlayPriorityText">Priority:</div>
                                                            <div class="buttonForOverlayPriority">
                                                                <div class="OverlayPriorityText">${cardPriority[cardDatas['priority']]}</div>
                                                                <div class="OverlayPriorityIcon OverlayPriorityIcon${cardPriority[cardDatas['priority']]}"></div>
                                                            </div>
                                                        </div>

                                                        <div class="cardTaskOverlayAssignedTo">
                                                            <div class="cardTaskOverlayAssignedToText">Assigned To:</div>

                                                            <div class="cardTaskOverlayAssignedToBadges">
                                                                ${renderCardTaskOverlayAssignedToBadges(cardDatas)}
                                                            </div>
                                                        </div>

                                                        ${renderCardTaskOverlaySubtasksDatasSubtask(cardDatas)}
                                                    
                                                    </div>

                                                    <div class="cardTaskOverlayDeleteOrEdit">
                                                        <!-- <div class="cardTaskOverlayDelete"> -->
                                                        <div class="subtasksIconsIcon subtasksIconsDelete" onClick="deleteCard(${cardId})"><span class="subtasksIconsText">Delete</span></div>
                                                        <!-- </div> -->
                                                        <img class="searchLineVertical" src="../assets/icons/searchLineVertical.svg">

                                                        <div class="subtasksIconsIcon subtasksIconsEdit" onClick="editCardDatas(${cardId})"><span class="subtasksIconsText">Edit</span></div>
                                                    </div>

                                                </div>
                                            </div>
                                            `;
    // document.getElementById('cardOverlayContainer').onClick = closeOverlayBackground();

}


function editCardDatas(cardId) {
    const cardDatas = boardTodos[cardId];
    document.getElementById('cardOverlayContainer').innerHTML = `
                                            <div class="cardFrameTaskOverlay">
                                                <div class="cardTaskOverlayContent">

                                                        <div class="subtasksIconsIcon subtasksIconsClose" onClick="closeOverlayBackground()"></div>


                                                    <div class="cardTaskOverlayContentInner">
                                                        <form onsubmit="pushChangesIntoTasksData(${cardId}); return false" id="formContainer"> <!--Container for the Formular-->
                                                        

                                                            <div class="cardTaskOverlayContentInnerTop">

                                                                    <div class="cardTaskOverlayContentTitleEdit">
                                                                        <label class="cardTaskOverlayContentTitleLabel">Title</label>
                                                                        <input type="text" id="titleInput" value="${cardDatas['title']}" name="cardTaskOverlayContentTitleInput" required>
                                                                        <div class="cardTaskOverlayContentFieldIsRequired">This field is required</div>
                                                                    </div>
                    
                                                                    <div class="cardTaskOverlayContentDescriptionEdit">
                                                                        <label class="cardTaskOverlayContentDescriptionLabel">Description</label>
                                                                        <textarea id="descriptionInput" name="cardTaskOverlayContentDescriptionInput" rows="4" required>${cardDatas['description']}</textarea>
                                                                        <div class="cardTaskOverlayContentFieldIsRequired">This field is required</div>
                                                                    </div>
                
                                                                    <div class="cardTaskOverlayContentDateEdit">
                                                                        <label class="cardTaskOverlayContentDateLabel">Due date</label>
                                                                        <input type="date" id="dateInput" value="${timestampToDateOrTimeofday(cardDatas['duedate'], 'date4input', '-')}" name="cardTaskOverlayContentDateInput" required>
                                                                    </div>
                                                            </div>

                                                            <div class="cardTaskOverlayContentInnerBottom">

                                                                <div id="prio" class="prio">
                                                                    <div class="prioText">Priority:</div>
                                                                    <div class="prioField">
                                                                        <div class="urgent" id="urgent" onclick="selectPriority('urgent')">Urgent<img src="/addTask/img/Prio alta.svg"></div>
                                                                        <div class="medium" id="medium" onclick="selectPriority('medium')">Medium<img src="/addTask/img/Prio media.svg"></div>
                                                                        <div class="low" id="low" onclick="selectPriority('low')">Low<img src="/addTask/img/Prio baja.svg"></div>
                                                                        <input type="hidden" id="selectedPriority" name="selectedPriority" value="">
                                                                    </div>
                                                                </div>

                                                                <div class="cardTaskOverlayAssignedTo">
                                                                    <div class="cardTaskOverlayAssignedToText">Assigned To:</div>

                                                                    <div class="assignedField">
                                                                        <div class="assignedContainer"><input autocomplete="off" oninput="filterContacts()" onclick="openNameList()" id="assignedTo" class="assignedInput" placeholder="Select contacts to assign"><img class="assignedArrow" onclick="showNameList()" src="/addTask/img/arrow_drop_downaa.svg"></div>
                                                                        <div style="display: none;" id="checkbox"></div>
                                                                        <input type="hidden" id="assignedToInput">
                                                                    </div>
                                                

                                                                    <div class="cardTaskOverlayAssignedToBadgesEdit">
                                                                        ${renderCardTaskOverlayAssignedToBadgesEdit(cardDatas)}
                                                                    </div>
                                                                </div>


                                                                <div class="subtask"> <!--subtask for the Task-->
                                                                    <div  id="subtask">
                                                                        ${renderCardTaskOverlaySubtasksDatasSubtask(cardDatas, 1)}
                                                                    </div>
                                                                </div> <!--Need functions and alternative pics to add or delete Subtask's-->
                                            
                                                            </div>
                                                        
                                                        </form>


                                                    </div>



                                                    <div class="cardTaskOverlayDeleteOrEdit">
                                                    ${renderCardTaskOverlayEditSaveButton(cardDatas)}
                                                        <!-- <div class="cardTaskOverlayDelete"> -->
                                                        <!--<div class="subtasksIconsIcon subtasksIconsDelete" onClick="deleteCard(${cardId})"><span class="subtasksIconsText">Delete</span></div> -->
                                                        <!-- </div> -->
                                                        <!--<img class="searchLineVertical" src="../assets/icons/searchLineVertical.svg"> -->

                                                        <!--<div class="subtasksIconsIcon subtasksIconsEdit" onClick="editCardDatas(${cardId})"><span class="subtasksIconsText">Edit</span></div> -->
                                                    </div>

                                                </div>
                                            </div>
                                            `;
    setActivePrioButtonEdit(cardDatas);
    assignedToListInsertUser(cardDatas);
}


function setActivePrioButtonEdit(cardDatas) {
    let priorityName = getPriorityName(cardDatas['priority']);
    console.log('priorityName: ', priorityName);
    document.getElementById(priorityName).classList.add('selected');
    document.getElementById('selectedPriority').value = priorityName;
}


function createNewTaskInColumn(columnId) {
    console.log('columnId', columnId);


}


function renderCardTaskOverlayAssignedToBadges(cardDatas) {
    let output = '';
    let assignedUsers = cardDatas['assignedTo'].split(",");
    console.log('assignedUsers: ', assignedUsers);
    for (let i = 0; i < assignedUsers.length; i++) {
        output += `
                <div class="designProfileBadgeContact">
                    <div class="designProfileBadgeContactBanner">
                        <div class="designProfileBadge">
                            <div id="designProfileBadgeInner-${assignedUsers[i]}" class="designProfileBadgeInner">
                                <div class="designProfileBadgeInnerText">${renderUserProfileInitials(arrayOfRegisteredUsers[assignedUsers[i]]['username'])}</div>
                            </div>
                        </div>
                        <div class="designProfileBadgeContactData">${arrayOfRegisteredUsers[assignedUsers[i]]['username']}</div>
                    </div>
                </div>
    
        `;
    }
    return output;

}


function renderCardTaskOverlayAssignedToBadgesEdit(cardDatas) {
    let output = '';
    let assignedUsers = cardDatas['assignedTo'].split(",");
    console.log('assignedUsers: ', assignedUsers);
    for (let i = 0; i < assignedUsers.length; i++) {
        output += `
                <div class="designProfileBadgeContact">
                    <div class="designProfileBadgeContactBanner">
                        <div class="designProfileBadge">
                            <div id="designProfileBadgeInner-${assignedUsers[i]}" class="designProfileBadgeInner">
                                <div class="designProfileBadgeInnerText">${renderUserProfileInitials(arrayOfRegisteredUsers[assignedUsers[i]]['username'])}</div>
                            </div>
                        </div>
                    </div>
                </div>
    
        `;
    }
    return output;

}


function renderCardTaskOverlayEditSaveButton(cardDatas) {
    let output = '<button form="formContainer" id="create"><span class="createText">Ok</span><img src="../addTask/img/check.svg"></button>';
    //     output += `
    //             <div class="designProfileBadgeContact">
    //                 <div class="designProfileBadgeContactBanner">
    //                     <div class="designProfileBadge">
    //                         <div id="designProfileBadgeInner-${assignedUsers[i]}" class="designProfileBadgeInner">
    //                             <div class="designProfileBadgeInnerText">${renderUserProfileInitials(arrayOfRegisteredUsers[assignedUsers[i]]['username'])}</div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>

    //     `;
    // }
    return output;

}


function renderCardTaskOverlaySubtasksDatasSubtask(cardDatas, editSubtasks = 0) {
    let output = '';
    if (cardDatas['subtasks']) {
        let cardSubtasks = cardDatas['subtasks'].split("\n");
        console.log('cardSubtasks: ', cardSubtasks);

        output += `
                    <div class="cardTaskOverlaySubtasks">
                        <div class="cardTaskOverlaySubtasksTitle">Subtasks</div>
                        <div id="cardTaskOverlaySubtasksDatas" class="cardTaskOverlaySubtasksDatas">
                `;
        if (editSubtasks == 1) {
            output += `
                        <div class="subtaskField">
                            <input autocomplete="off" minlength="1" id="subtaskInput" type="text" class="subtaskInput" placeholder="Add new subtask">
                            <img aria-disabled="true" onclick="addSubtask()" src="/addTask/img/Subtasks icons11.svg" alt="">
                        </div>
                        <ul id="subtaskList">
                    `;
            for (let i = 0; i < cardSubtasks.length; i++) {
                output += `
                        <li>${cardSubtasks[i]}</li>
            
                    `;
            }
            output += `
                        </ul>
                    `;


        } else {
            for (let i = 0; i < cardSubtasks.length; i++) {
                output += `
                    <div class="cardTaskOverlaySubtasksDatasSubtask">
                        <label class="subtasksCheckField">
                            <input id="subtasksCheckField${i}" class="subtasksCheckFieldImage" type="checkbox" onclick="switchSubtaskCheck(${cardDatas['id']}, ${i})">
                            <img class="checkButtonUnchecked" src="../assets/icons/checkButtonUnchecked.svg"
                                alt="unchecked">
                            <img class="checkButtonUncheckedHover" src="../assets/icons/checkButtonUncheckedHover.svg"
                                alt="unchecked">
                            <img class="checkButtonChecked" src="../assets/icons/checkButtonChecked.svg" alt="checked">
                            <div class="checkButtonCheckedHoverGroup"><img class="checkButtonCheckedHover"
                                    src="../assets/icons/checkButtonCheckedHover.svg" alt="checked"></div>
                            <div class="subtasksCheckFieldText">${cardSubtasks[i]}</div>
                        </label>
                    </div>
        
                `;
            }
        }
        output += `
                    </div>
                        </div>
                `;
    } else {
        if (editSubtasks == 1) {
            output += `
                        <div class="subtaskField">
                            <input autocomplete="off" minlength="1" id="subtaskInput" type="text" class="subtaskInput" placeholder="Add new subtask">
                            <img aria-disabled="true" onclick="addSubtask()" src="/addTask/img/Subtasks icons11.svg" alt="">
                        </div>
                        `
            if (cardDatas['subtasks']) {
                output += `
                            <ul id="subtaskList">
                        `;
                for (let i = 0; i < cardSubtasks.length; i++) {
                    output += `
                        <li>${cardSubtasks[i]}</li>
            
                    `;
                }
                output += `
                </ul>
                `;
            }

        }

    }
    return output;

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
}


