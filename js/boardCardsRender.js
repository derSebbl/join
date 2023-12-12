/**
 * Generates HTML for a Todo card based on the passed card data.
 *
 * @param {Object} cardData - An object containing the data for the Todo card.
 * @param {string} cardData.id - The unique ID of the card.
 * @param {string} cardData.cardlabel - The label of the card.
 * @param {string} cardData.title - The title of the card.
 * @param {string} cardData.description - The description of the card.
 * @param {string} cardData.priority - The priority of the card.
 * @returns {string} A string representing the HTML for the Todo card.
 */
function generateTodoCardHTML(cardData) {
    return `<div class="cardFrame" id="cardFrame${cardData['id']}" draggable="true" ondragstart="startDragging(${cardData['id']})" onClick="openCardDatas(${cardData['id']})">
                <div class="cardContent" id="cardContent${cardData['id']}">
                    <div class="cardLabelContainer">
                        <div class="boardCardLabel${cardData['cardlabel']}">${cardlabel[cardData['cardlabel']]}</div>
                        <div id="arrowSwitchColumns" onclick="showSwitches(${cardData['id']}, event)"><img src="../assets/icons/arrow_drop_downaa.svg"></div>
                    </div>
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
                <div class="switchColumns" id="switchColumns${cardData['id']}" style="display:none">
                    <div class="switchColumnsInner">
                        <div class="cardLabelContainer">
                            <div class="switchColumnsInnerTitle">Move to:</div>
                            <div id="arrowSwitchColumns" onclick="showSwitches(${cardData['id']}, event)"><img src="../assets/icons/arrow_drop_downaa.svg"></div>
                        </div>
                        <div class="switchColumnsInnerButtons">
                            <div class="switchColumnsInnerButtonsButton" onclick="switchColumn(${cardData['id']}, 'boardColumnToDo', event)">To do</div>
                            <div class="switchColumnsInnerButtonsButton" onclick="switchColumn(${cardData['id']}, 'boardColumnInProgress', event)">In Progress</div>
                            <div class="switchColumnsInnerButtonsButton" onclick="switchColumn(${cardData['id']}, 'boardColumnAwaitFeedback', event)">Await Feedback</div>
                            <div class="switchColumnsInnerButtonsButton" onclick="switchColumn(${cardData['id']}, 'boardColumnDone', event)">Done</div>
                        </div>
                    </div>
                </div>
            </div>`;
};

/**
 * Renders the subtasks data for a card.
 *
 * @param {Object} cardData - An object containing the data for the card.
 * @param {string} cardData.subtasks - A string of subtasks separated by newlines.
 * @param {string} cardData.subtasksToChecked - A string representing which subtasks are checked.
 * @returns {string} A string representing the rendered subtasks.
 */
function renderCardDataSubtasks(cardData) {
    let subtasks = cardData['subtasks'].split("\n");
    let subtaskcheck = cardData['subtasksToChecked'];
    let subtaskDone = checkCountOfDoneSubtasks(subtaskcheck);
    let renderedSubtasks = renderSubtasks(subtasks, subtaskDone);
    return renderedSubtasks;
};

/**
 * Renders the subtasks progress bar for a card.
 *
 * @param {Array} subtasks - An array of subtasks.
 * @param {number} subtaskDone - The number of completed subtasks.
 * @returns {string} A string representing the rendered subtasks progress bar.
 */
function renderSubtasks(subtasks, subtaskDone) {
    return `            <div class="cardProgress">
                            <div class="cardProgressBar">
                                <div class="cardProgressBarFiller" style="width: ${100 / subtasks.length * subtaskDone}%;"></div>
                            </div>
                            <div class="cardProgressText">${subtaskDone}/${subtasks.length} Subtasks</div>
                        </div>`;
};

/**
 * Renders the design profile badge for assigned users on a card.
 *
 * @param {Object} cardData - An object containing the data for the card.
 * @param {string} cardData.assignedTo - A string of assigned user IDs separated by commas.
 * @returns {string} A string representing the rendered design profile badges.
 */
function renderdesignProfileBadge(cardData) {
    let output = '';
    let assignedUsers = cardData['assignedTo'].split(",");
    for (let i = 0; i < assignedUsers.length; i++) {
        let user = arrayOfRegisteredUsers[assignedUsers[i]];
        if (user && user.username) {
            output += `
                        <div class="designProfileBadge">
                            <div id="designProfileBadgeInner-${assignedUsers[i]}" class="designProfileBadgeInner">
                                <div class="designProfileBadgeInnerText">${renderUserProfileInitials(user.username)}</div>
                            </div>    
                        </div>`;
        }
    }
    return output;
};

/**
 * Generates HTML for a message indicating no tasks in a specific category.
 *
 * @param {string} toDoCardsCategory - The category of the tasks.
 * @returns {string} A string representing the HTML for the no tasks message.
 */
function generateNoTasksInCategoryHTML(toDoCardsCategory) {
    switch (toDoCardsCategory) {
        case boardColumn[0]:
            return `<div id="${toDoCardsCategory}NoTasks" class="boardColumnHasNoTasks dFlex">No tasks To do</div>`;
        case boardColumn[1]:
            return `<div id="${toDoCardsCategory}NoTasks" class="boardColumnHasNoTasks dFlex">No tasks In Progress</div>`;
        case boardColumn[2]:
            return `<div id="${toDoCardsCategory}NoTasks" class="boardColumnHasNoTasks dFlex">No tasks Await Feedback</div>`;
        case boardColumn[3]:
            return `<div id="${toDoCardsCategory}NoTasks" class="boardColumnHasNoTasks dFlex">No tasks Done</div>`;
        default:
            break;
    }
};

/**
 * Generates HTML for a highlighted card frame in a specific category.
 *
 * @param {string} toDoCardsCategory - The category of the tasks.
 * @returns {string} A string representing the HTML for the highlighted card frame.
 */
function generateHighlightCardFrameHTML(toDoCardsCategory) {
    return `<div id="${toDoCardsCategory}HighlightCardFrame" class=""></div>`;
};

/**
 * Renders the overlay for a card's data.
 *
 * @param {string} cardId - The unique ID of the card.
 */
function renderCardDatasOverlay(cardId) {
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
                                                        <div class="subtasksIconsIcon subtasksIconsDelete" onClick="deleteCard(${cardId})"><span class="subtasksIconsText">Delete</span></div>
                                                        <img class="searchLineVertical" src="../assets/icons/searchLineVertical.svg">
                                                        <div class="subtasksIconsIcon subtasksIconsEdit" onClick="editCardDatas(${cardId})"><span class="subtasksIconsText">Edit</span></div>
                                                    </div>
                                                </div>
                                            </div>`;
};

/**
 * Edits the data of a card if you click on the edit button.
 *
 * @param {string} cardId - The unique ID of the card.
 */
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
                                                                        <div class="urgent" id="urgent" onclick="selectPriority('urgent')">Urgent<img src="../addTask/img/Prio alta.svg"></div>
                                                                        <div class="medium" id="medium" onclick="selectPriority('medium')">Medium<img src="../addTask/img/Prio media.svg"></div>
                                                                        <div class="low" id="low" onclick="selectPriority('low')">Low<img src="../addTask/img/Prio baja.svg"></div>
                                                                        <input type="hidden" id="selectedPriority" name="selectedPriority" value="">
                                                                    </div>
                                                                </div>
                                                                <div class="cardTaskOverlayAssignedTo">
                                                                    <div class="cardTaskOverlayAssignedToText">Assigned To:</div>
                                                                    <div class="assignedField">
                                                                        <div class="assignedContainer"><input autocomplete="off" oninput="filterContacts()" onclick="openNameList()" id="assignedTo" class="assignedInput" placeholder="Select contacts to assign"><img class="assignedArrow" onclick="showNameList()" src="../addTask/img/arrow_drop_downaa.svg"></div>
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
                                                    </div>
                                                </div>
                                            </div>`;
    setActivePrioButtonEdit(cardDatas);
    assignedToListInsertUser(cardDatas);
};

/**
 * Renders the assigned user badges for a card's task overlay.
 *
 * @param {Object} cardDatas - An object containing the data for the card.
 * @param {string} cardDatas.assignedTo - A string of assigned user IDs separated by commas.
 * @returns {string} A string representing the rendered assigned user badges.
 */
function renderCardTaskOverlayAssignedToBadges(cardDatas) {
    let output = '';
    if (cardDatas['assignedTo']) {
        let assignedUsers = cardDatas['assignedTo'].split(",");
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
                    </div>`;
        }
    }
    return output;
};

/**
 * Renders the assigned user badges for a card's task overlay in edit mode.
 *
 * @param {Object} cardDatas - An object containing the data for the card.
 * @param {string} cardDatas.assignedTo - A string of assigned user IDs separated by commas.
 * @returns {string} A string representing the rendered assigned user badges in edit mode.
 */
function renderCardTaskOverlayAssignedToBadgesEdit(cardDatas) {
    let output = '';
    let assignedUsers = cardDatas['assignedTo'].split(",");
    for (let i = 0; i < assignedUsers.length; i++) {
        if (arrayOfRegisteredUsers[assignedUsers[i]]) {
            output += `<div class="designProfileBadgeContact">
                        <div class="designProfileBadgeContactBanner">
                            <div class="designProfileBadge">
                                <div id="designProfileBadgeInner-${assignedUsers[i]}" class="designProfileBadgeInner">
                                    <div class="designProfileBadgeInnerText">${renderUserProfileInitials(arrayOfRegisteredUsers[assignedUsers[i]]['username'])}</div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        }
    }
    return output;
};

/**
 * Renders the save button for a card's task overlay in edit mode.
 *
 * @param {Object} cardDatas - An object containing the data for the card.
 * @returns {string} A string representing the rendered save button.
 */
function renderCardTaskOverlayEditSaveButton(cardDatas) {
    let output = '<button form="formContainer" id="create"><span class="createText">Ok</span><img src="../addTask/img/check.svg"></button>';
    return output;
};

/**
 * Renders the subtasks data for a card's task overlay.
 *
 * @param {Object} cardDatas - An object containing the data for the card.
 * @param {string} cardDatas.subtasks - A string of subtasks separated by newlines.
 * @param {number} editSubtasks - A flag indicating whether the subtasks are in edit mode. 0 for view mode, 1 for edit mode.
 * @returns {string} A string representing the rendered subtasks data.
 */
function renderCardTaskOverlaySubtasksDatasSubtask(cardDatas, editSubtasks = 0) {
    let output = '';
    let cardSubtasks = cardDatas['subtasks'].split("\n");
    output += ` <div class="cardTaskOverlaySubtasks">
                <div class="cardTaskOverlaySubtasksTitle">Subtasks</div>
                <div id="cardTaskOverlaySubtasksDatas" class="cardTaskOverlaySubtasksDatas">`;
    if (editSubtasks == 1) {
        output += createSubtaskField();
    }
    output += `<ul id="subtaskList">`;
    for (let i = 0; i < cardSubtasks.length; i++) {
        if (cardSubtasks[i].trim() !== '') { 
            if (editSubtasks == 0) {
                output += createSubtaskCheckField(cardDatas, cardSubtasks, i);
            } else if (editSubtasks == 1) {
                output += createSubtaskItem(cardSubtasks, i);
            }
        }
    }
    output += `</ul>`;
    output += `</div></div>`;
    return output;
};

/**
 * Creates a new subtask field.
 *
 * @returns {string} A string representing the HTML for the new subtask field.
 */
function createSubtaskField() {
    return `
        <div class="subtaskField">
            <input autocomplete="off" minlength="1" id="subtaskInput" type="text" class="subtaskInput" placeholder="Add new subtask">
            <img aria-disabled="true" onclick="addSubtask()" src="../addTask/img/Subtasks icons11.svg" alt="">
        </div>
    `;
};

/**
 * Creates a subtask item.
 *
 * @param {Array} cardSubtasks - An array of subtasks.
 * @param {number} i - The index of the subtask.
 * @returns {string} A string representing the HTML for the subtask item.
 */
function createSubtaskItem(cardSubtasks, i) {
    return `
        <div id="Subtask${i}" class="subtaskItem">
            <div id="contentSubtask${i}" class="contentSubtask">
                ${cardSubtasks[i]}
            </div>
            <div class="subtaskItemImg" id="subtaskItemImg${i}">
                <img id="subtaskEdit" onclick="editSubtask(${i})"  src="../addTask/img/Subtask edit.svg">
                <img src="../addTask/img/Subtask Vect.svg">
                <img id="subtaskDelete" onclick="deleteSubtask(${i})" src="../addTask/img/subtask delete.svg">
            </div>
            <div class="editSubtaskContainer" id="editSubtaskContainer${i}" style="display: none;">
                <input type="text" class="subtaskItemEdit" id="subtaskEdit${i}" value="${cardSubtasks[i]}">
                <img class ="editItemImg" src="../addTask/img/subtask delete.svg" onclick="deleteSubtask(${i})">
                <img src="../addTask/img/Subtask Vect.svg">
                <img class="editItemImg" src="../addTask/img/Subtasks icon accept.svg" onclick="changeSubtaskItem(${i})">
            </div>
        </div>
    `;
};

/**
 * Creates a subtask check field.
 *
 * @param {Object} cardDatas - An object containing the data for the card.
 * @param {Array} cardSubtasks - An array of subtasks.
 * @param {number} i - The index of the subtask.
 * @returns {string} A string representing the HTML for the subtask check field.
 */
function createSubtaskCheckField(cardDatas, cardSubtasks, i) {
    return `
        <li>
            <label class="subtasksCheckField">
                <input id="subtasksCheckField${i}" class="subtasksCheckFieldImage" type="checkbox" onchange="switchSubtaskCheck(${cardDatas['id']}, ${i}); updateSubtaskImage(${cardDatas['id']}, ${i})" ${cardDatas['subtasksToChecked'][i] ? 'checked' : ''}>
                <img class="checkButtonUnchecked" src="../assets/icons/checkButtonUnchecked.svg" alt="unchecked">
                <img class="checkButtonUncheckedHover" src="../assets/icons/checkButtonUncheckedHover.svg" alt="unchecked">
                <img class="checkButtonChecked" src="${cardDatas['subtasksToChecked'][i] ? '../assets/icons/checkButtonChecked.svg' : '../assets/icons/checkButtonUnchecked.svg'}" alt="checked">
                <div class="checkButtonCheckedHoverGroup"><img class="checkButtonCheckedHover" src="../assets/icons/checkButtonCheckedHover.svg" alt="checked"></div>
                <div class="subtasksCheckFieldText">${cardSubtasks[i]}</div>
            </label>
        </li>
    `;
};