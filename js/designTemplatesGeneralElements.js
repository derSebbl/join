/**
 * Sets the active button for the priority.
 *
 * @param {number} setPriority - The priority to be set.
 */
function setActiveButtonForPriorityTo(setPriority) {
    let setClassForButton = `priorityButton${cardPriority[setPriority]}`;
    let setClassForButtonIcon = `priorityButton${cardPriority[setPriority]}Icon`;

    document.getElementById(setClassForButton).classList.remove(`buttonForPriority`);
    document.getElementById(setClassForButtonIcon).classList.remove(`buttonForPriorityIcon${cardPriority[setPriority]}`);
    document.getElementById(setClassForButtonIcon).classList.remove(`OverlayPriorityIcon`);
    document.getElementById(setClassForButton).classList.add(`buttonActiveForPriority${cardPriority[setPriority]}`);
    document.getElementById(setClassForButtonIcon).classList.add(`OverlayPriorityIcon${cardPriority[setPriority]}White`);
    document.getElementById(setClassForButtonIcon).classList.add(`buttonForPriorityIcon`);
};

/**
 * Toggles the visibility of switches based on their current state.
 *
 * @param {number} x - The unique ID of the element.
 * @param {Event} event - The triggered event.
 */
function showSwitches(x, event) {
    event.stopPropagation();
    let contentContainer = document.getElementById(`cardContent${x}`);
    let switchContainer = document.getElementById(`switchColumns${x}`);
    if (switchContainer.style.display === `none`) {
        switchContainer.style.display = `flex`;
        contentContainer.style.display = `none`;       
    } else {
        showCard(x);
    }
};

/**
 * Displays the card by showing the content container and hiding the switch container.
 *
 * @param {number} x - The unique ID of the element.
 */
function showCard(x) {
    let contentContainer = document.getElementById(`cardContent${x}`);
    let switchContainer = document.getElementById(`switchColumns${x}`);
    switchContainer.style.display = `none`;
    contentContainer.style.display = `flex`;
};

/**
 * Moves a card to a different column and updates the card's category in the data.
 *
 * @param {number} cardId - The unique ID of the card.
 * @param {string} columnTitle - The title of the column to which the card is moved.
 * @param {Event} event - The triggered event.
 */
function switchColumn(cardId, columnTitle, event) {
    event.stopPropagation();
    let card = document.getElementById(`cardFrame${cardId}`);
    let column = document.getElementById(columnTitle);
    card.parentNode.removeChild(card);
    column.appendChild(card);
    showCard(cardId);
    for (let i = 0; i < boardTodos.length; i++) {
        if (boardTodos[i].id == cardId) {
            boardTodos[i].columnCategory = columnTitle;
            break;
        }
    }
    setTasksData();
};