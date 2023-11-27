

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

function renderCardDataSubtasks(cardData) {
    let subtasks = cardData['subtasks'].split("\n");
    let subtaskDone = checkCountOfDoneSubtasks(subtasks);
    let renderedSubtasks = renderSubtasks(subtasks, subtaskDone);
    return renderedSubtasks;
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
    for (let i = 0; i < assignedUsers.length; i++) {
        let user = arrayOfRegisteredUsers[assignedUsers[i]];
        if (user && user.username) {
            output += `
                        <div class="designProfileBadge">
                            <div id="designProfileBadgeInner-${assignedUsers[i]}" class="designProfileBadgeInner">
                                <div class="designProfileBadgeInnerText">${renderUserProfileInitials(user.username)}</div>
                            </div>    
                        </div>
                            `;
        } else {
            console.log('Benutzer oder Benutzername ist undefiniert');
        }
    }
    return output;
};

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